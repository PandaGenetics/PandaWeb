package PandaIndividual

import (
	"fmt"
	"testing"
)

func TestString(t *testing.T) {
	var PP = NewPandaPopulation("../../data/2020-Living-Pedigree.csv")

	fmt.Println(PP)
}
