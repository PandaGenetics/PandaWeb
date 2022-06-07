package parseGff3

import (
	"bufio"
	"compress/gzip"
	"encoding/json"
	"github.com/liserjrqlxue/simple-util"
	"log"
	"os"
	"regexp"
	"strconv"
	"strings"
)

// regexp
var (
	isGz      = regexp.MustCompile(`\.gz$`)
	isComment = regexp.MustCompile(`^#`)
)

type GFF3 struct {
	Seqid      string
	Source     string
	Type       string
	Start      uint64
	End        uint64
	Score      string
	Strand     string `+:"positive strand (relative to the landmark)",-:"minus strand",.:"not stranded",?:"unknown"`
	Phase      string
	Attributes map[string]string
}

type GFF3EX struct {
	Seqid string
	Start uint64
	End   uint64
	Name  string
}

func Gff32json(name string) {
	a := File2GFF3array(name)
	a = a.Filter("gene")

	b := Extract(a)

	jsonGFF3, err := json.MarshalIndent(b, "", "")
	if err != nil {
		log.Fatal(err)
	}

	//for _, i := range jsonGFF3 {
	//	fmt.Print(string(i))
	//}

	f2, err := os.Create("data/gff3.json")
	if err != nil {
		log.Fatal(err)
	}
	defer f2.Close()

	_, err = f2.Write(jsonGFF3)
}

type gffw []GFF3EX

func Extract(a GFFSet) gffw {
	var gffFw = make(gffw, 0)
	var haha GFF3EX
	for _, i := range a {
		haha.Seqid = i.Seqid
		haha.Start = i.Start
		haha.End = i.End
		haha.Name = i.Attributes["Name"]
		gffFw = append(gffFw, haha)
	}
	return gffFw
}

type GFFSet []GFF3

//Filter gene and undefined name
func (gs GFFSet) Filter(t string) GFFSet {
	var newGS = make(GFFSet, 0)
	for _, i := range gs {
		if i.Type == t {
			if _, ok := i.Attributes["Name"]; ok {
				newGS = append(newGS, i)
			}
		}
	}
	return newGS
}

func File2GFF3array(fileName string) (gff3Array GFFSet) {
	file, err := os.Open(fileName)
	simple_util.CheckErr(err)
	defer simple_util.DeferClose(file)

	var scanner *bufio.Scanner
	if isGz.MatchString(fileName) {
		gr, err := gzip.NewReader(file)
		simple_util.CheckErr(err)
		defer simple_util.DeferClose(gr)

		scanner = bufio.NewScanner(gr)
	} else {
		scanner = bufio.NewScanner(file)
	}

	for scanner.Scan() {
		line := scanner.Text()
		if isComment.MatchString(line) {
			continue
		}
		array := strings.Split(line, "\t")
		if len(array) != 9 {
			log.Fatalf("GFF3 line not have 9 column:\n[%s]\n", line)
		}
		var item = new(GFF3)
		item.Seqid = array[0]
		item.Source = array[1]
		item.Type = array[2]
		start, err := strconv.Atoi(array[3])
		simple_util.CheckErr(err)
		item.Start = uint64(start)
		end, err := strconv.Atoi(array[4])
		simple_util.CheckErr(err)
		item.End = uint64(end)
		item.Score = array[5]
		item.Strand = array[6]
		item.Phase = array[7]
		attributes := strings.Split(array[8], ";")
		var attributeMap = make(map[string]string)
		for _, kv := range attributes {
			kvs := strings.SplitN(kv, "=", 2)
			if len(kvs) != 2 {
				log.Fatalf(
					"GFF3 item's attributes no have tag=value format\n\t[%s]\n\t[%s]\n",
					item.Attributes, kv,
				)
			}
			attributeMap[kvs[0]] = kvs[1]
		}
		item.Attributes = attributeMap
		gff3Array = append(gff3Array, *item)
	}
	return
}
