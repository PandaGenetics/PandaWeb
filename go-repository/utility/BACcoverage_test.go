package utility

import (
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"strconv"
	"testing"
)

type chr string

func ReadBED(path string) map[chr]*Intervals {
	f, _ := os.Open(path)
	bed := csv.NewReader(f)
	bed.Comma = '\t'

	var collection = make(map[chr]*Intervals, 0)
	for {
		record, err := bed.Read()
		if err == io.EOF {
			break
		}
		name := chr(record[0])
		start, _ := strconv.ParseInt(record[1], 10, 64)
		end, _ := strconv.ParseInt(record[2], 10, 64)
		if value, ok := collection[name]; ok {
			*value = append(*value, [2]int64{start, end})
		} else {
			collection[name] = &Intervals{[2]int64{start, end}}
		}
	}
	return collection
}

func TestIntervalMerge(t *testing.T) {
	var In = Intervals{[2]int64{1, 5}, [2]int64{3, 4}, [2]int64{9, 12}, [2]int64{4, 7}}
	res := IntervalMerge(In)
	fmt.Println(res, res.Coverage())
	all := ReadBED("/Users/apple/Downloads/giantPandaBAC_SP01-SP12.bed")
	//fmt.Println(all)
	var totalLen int64
	for k, v := range all {
		cov := IntervalMerge(*v).Coverage()
		totalLen += cov
		fmt.Printf("%s\t%d\t%d\n", k, v.Len(), cov)
	}
	fmt.Println(totalLen)
}
