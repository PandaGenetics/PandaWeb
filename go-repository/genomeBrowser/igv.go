package genomeBrowser

import (
	"bufio"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

const igvRootV3 = "http://192.168.38.70:8081/gene/v3"

type track struct {
	TrackType        string `json:"type"`
	Format           string `json:"format"`
	Name             string `json:"name"`
	Url              string `json:"url"`
	IndexURL         string `json:"indexURL"`
	VisibilityWindow int64  `json:"visibilityWindow"`
}

type Sort struct {
	//Chr,position,option,direction
	Chr       string `json:"chr"`
	Position  string `json:"position"`
	Option    string `json:"option"`
	Direction string `json:"direction"`
}
type TrackBam struct {
	track
	Sort Sort `json:"sort"`
}

func NewTrackBam(line string) TrackBam {
	// f refers to the field of each line.
	f := strings.Split(line, ",")
	// #Type,Format,Name,Chr,position,option,direction,URL
	root := ""
	return TrackBam{
		track{f[0], f[1], f[7], root + f[7], root + f[7] + ".tbi", 10000},
		Sort{f[3], f[4], f[5], f[6]}}
}
func LoadBam(path string) map[string]TrackBam {
	var bamTracks = make(map[string]TrackBam, 0)
	file, err := os.Open(path)
	defer file.Close()
	if err != nil {
		log.Println("To Open file encounters a error: ", err)
	}
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		if scanner.Bytes()[0] != '#' {
			line := scanner.Text()
			tb := NewTrackBam(line)
			bamTracks[tb.Name] = tb
		}
	}
	return bamTracks
}

//var mRNA = track{
//	"annotation",
//	"gff3",
//	"mRNA",
//	igvRootV3 + "/annotation/pasa2.longest.filter_sorted.gff3.gz",
//	igvRootV3 + "/annotation/pasa2.longest.filter_sorted.gff3.gz.tbi",
//	500 * 100 * 100}
var mRNA = track{
	"annotation",
	"gff3",
	"mRNA",
	igvRootV3 + "/annotation/pasa2.longest.filter.gff3.addNRfunc_sorted.gff3.gz",
	igvRootV3 + "/annotation/pasa2.longest.filter.gff3.addNRfunc_sorted.gff3.gz.tbi",
	500 * 100 * 100}
var gap = track{
	"annotation",
	"bed",
	"GAP",
	igvRootV3 + "/annotation/panda_gap.bed.gz",
	igvRootV3 + "/annotation/panda_gap.bed.gz.tbi",
	1000 * 100 * 100 * 100}

//var BAC = track{
//	"annotation",
//	"bed",
//	"BAColder",
//	igvRootV3 + "/BAC/GiantPanda_SP01-BAC_location_sorted.bed.gz",
//	igvRootV3 + "/BAC/GiantPanda_SP01-BAC_location_sorted.bed.gz.tbi",
//	1000000}

var BAClatest = track{
	"annotation",
	"bed",
	"BAClatest",
	igvRootV3 + "/BAC/giantPandaBAC_SP01-SP08_sorted.bed.gz",
	igvRootV3 + "/BAC/giantPandaBAC_SP01-SP08_sorted.bed.gz.tbi",
	100000000}
var RNApi = track{
	"alignment",
	"bam",
	"RNA profile of spleen",
	igvRootV3 + "/RNAseq/pi_sorted.bam",
	igvRootV3 + "/RNAseq/pi_sorted.bam.bai",
	10000,
}

var Microhaps = track{
	"alignment",
	"bam",
	"Microhaps",
	igvRootV3 + "/resequencing/microHaplotype-Range-20220415_sorted.bam",
	igvRootV3 + "/resequencing/microHaplotype-Range-20220415_sorted.bam.bai",
	10000,
}

//var igvTracks = gin.H{"mRNA": mRNA, "gap": gap, "BAC": BAC}

func PandaGenomeV2(c *gin.Context) {
	c.HTML(http.StatusOK, "geneBrowser@v2.html", gin.H{"tracks": LoadBam("data/bam_Filename.csv"),
		"root": "http://192.168.38.70:8081/gene"})
}

func PandaGenomeV3(c *gin.Context) {
	c.HTML(http.StatusOK, "geneBrowser@v3.html", gin.H{"tracks": []track{mRNA, gap, BAClatest, RNApi, Microhaps}}) // binds data
}
