package utility

import (
	"encoding/csv"
	"encoding/json"
	"log"
	"os"
)

type BamFormat struct {
	Type      string `json:"type"`
	Format    string `json:"json"`
	Name      string `json:"name"`
	Chr       string `json:"chr"`
	Position  string `json:"position"`
	Option    string `json:"option"`
	Direction string `json:"direction"`
	Url       string `json:"url"`
}

// createBamList is used for convert csv file to json file
func createBamList(data [][]string) []BamFormat {
	var bamList []BamFormat
	for i, line := range data {
		// omit header line
		if i > 0 {
			var record BamFormat
			for j, field := range line {
				switch {
				case j == 0:
					record.Type = field
				case j == 1:
					record.Format = field
				case j == 2:
					record.Name = field
				case j == 3:
					record.Chr = field
				case j == 4:
					record.Position = field
				case j == 5:
					record.Option = field
				case j == 6:
					record.Direction = field
				case j == 7:
					record.Url = field
				}
			}
			bamList = append(bamList, record)
		}
	}
	return bamList
}

func OpenCSV() {
	// open bam_Filename.csv
	file := "data/bam_Filename.csv"
	f1, err := os.Open(file)
	if err != nil {
		log.Fatal(err)
	}
	defer f1.Close()

	// create f2 for save json
	f2, err := os.Create("data/data.json")
	if err != nil {
		log.Fatal(err)
	}
	defer f2.Close()

	// 2. Read CSV file using csv.Reader
	csvReader := csv.NewReader(f1)
	data, err := csvReader.ReadAll()
	if err != nil {
		log.Fatal(err)
	}

	// 3. Assign successive lines of raw CSV data to fields of the created structs
	bamList := createBamList(data)

	// 4. Convert an array of structs to JSON using marshaling functions from the encoding/json package
	jsonData, err := json.MarshalIndent(bamList, "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	_, err = f2.Write(jsonData)
}
