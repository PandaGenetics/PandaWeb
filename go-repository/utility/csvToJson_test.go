package utility

import (
	"encoding/csv"
	"fmt"
	"github.com/PandaGenetics/PandaWeb/go-repository/PandaIndividual"
	"log"
	"os"
	"strconv"
	"testing"
)

func TestOpenCSV(t *testing.T) {
	OpenCSV()
}

func TestGender(t *testing.T) {
	// open bam_Filename.csv
	file := "../../data/bam_Filename.csv"
	f1, err := os.Open(file)
	if err != nil {
		log.Fatal(err)
	}
	defer f1.Close()

	// 2. Read CSV file using csv.Reader
	csvReader := csv.NewReader(f1)
	data, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal(err)
	}

	// 3. Assign successive lines of raw CSV data to fields of the created structs
	bamList := createBamList(data)
	//fmt.Println(bamList)

	var PP = PandaIndividual.NewPandaPopulation("../../data/2020-Living-Pedigree.csv")

	for _, panda := range bamList {
		id, _ := strconv.ParseUint(panda.Name, 10, 64)
		if pedigree, ok := PP[uint(id)]; ok {
			fmt.Printf("%s\t%s\t%d\n", panda.Url, pedigree.Sex, id)
		}
	}
	//fmt.Println(PP)
}
