package genomeBrowser

import (
	"fmt"
	"testing"
)

func TestLoadBam(t *testing.T) {
	bams := LoadBam("data/Bam_Filename.csv")
	for _, item := range bams {
		fmt.Printf("%v\n", item)
	}
}