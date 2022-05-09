package PandaIndividual

import (
	"encoding/csv"
	"io"
	"log"
	"os"
	"strconv"
)

type Panda struct {
	PID         uint `json:"pedigree_no"`
	Name        string
	ChineseName string
	Birthday    string
	Birthplace  string
	Sex         string
	//Sire, Sam   *Panda
	Sire, Sam uint
}

type PandaPopulation map[uint]Panda

// NewPandaPopulation read recorded pandas from csv-delimited file.
func NewPandaPopulation(path string) PandaPopulation {
	var PP = make(PandaPopulation, 0)
	f, err := os.Open(path)
	if err != nil {
		log.Fatalln(err)
	}
	r := csv.NewReader(f)

	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if len(record) == 8 {
			pID, _ := strconv.ParseUint(record[0], 10, 64)
			Sire, _ := strconv.ParseUint(record[6], 10, 64)
			Dam, _ := strconv.ParseUint(record[7], 10, 64)
			PP[uint(pID)] = Panda{uint(pID), record[1], record[2],
				record[3], record[4], record[5],
				uint(Sire), uint(Dam)}
		}
	}
	return PP
}

type Config struct {
	file       string
	Population PandaPopulation
}

func NewConfig() *Config {
	file := "data/panda/2020-Living-Pedigree.csv"
	return &Config{Population: NewPandaPopulation(file)}
}
