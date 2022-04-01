package main

import (
	"bufio"
	"github.com/PandaGenetics/PandaWeb/go-repository/sampling"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

const igvRoot = "http://192.168.38.70:8081/gene/v3"

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
	Chr       string `json:"chr"'`
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

var mRNA = track{
	"annotation",
	"mRNA",
	"gff3",
	igvRoot + "/annotation/pasa2.longest.filter_sorted.gff3.gz",
	igvRoot + "/annotation/pasa2.longest.filter_sorted.gff3.gz.tbi",
	100000}
var gap = track{
	"annotation",
	"gap",
	"bed",
	igvRoot + "/annotation/panda_gap.bed.gz",
	igvRoot + "/annotation/panda_gap.bed.gz.tbi",
	1000000}
var BAC = track{
	"annotation",
	"BAC",
	"bed",
	igvRoot + "/BAC/GiantPanda_SP01-BAC_location_sorted.bed.gz",
	igvRoot + "/BAC/GiantPanda_SP01-BAC_location_sorted.bed.gz.tbi",
	1000000}

var BAClatest = track{
	"annotation",
	"BAClatest",
	"gff3",
	igvRoot + "/BAC/current_sorted.gff3.gz",
	igvRoot + "/BAC/current_sorted.gff3.gz.tbi",
	100000000}

//var igvTracks = gin.H{"mRNA": mRNA, "gap": gap, "BAC": BAC}

func main() {
	router := gin.Default()

	router.LoadHTMLGlob("pages/*")

	router.Static("/static", "static/")

	router.Static("/img", "images")
	router.Static("/gene", "data")

	router.GET("", func(c *gin.Context) {
		c.HTML(http.StatusOK, "homePage.html", gin.H{})
	})

	router.GET("/genebrowser", func(c *gin.Context) {
		c.HTML(http.StatusOK, "geneBrowser.html", gin.H{"tracks": LoadBam("data/Bam_Filename.csv"),
			"root": "http://192.168.38.70:8081/gene"})
	})

	router.GET("/genebrowser2", func(c *gin.Context) {
		c.HTML(http.StatusOK, "geneBrowser@v2.html", gin.H{"tracks": []track{mRNA, gap, BAC, BAClatest}}) // binds data
	})

	router.GET("/pedigree", func(c *gin.Context) {
		c.HTML(http.StatusOK, "pedigree.html", gin.H{})
	})

	records := sampling.NewSampling("data/samplingSummary.csv")
	router.GET("/samplingsummary", func(c *gin.Context) {
		c.HTML(http.StatusOK, "samplingSummary.html", gin.H{"records": records})
	})

	router.GET("/samplingrequest", func(c *gin.Context) {
		c.HTML(http.StatusOK, "samplingRequest.html", gin.H{})
	})

	router.Run(":8081")
}
