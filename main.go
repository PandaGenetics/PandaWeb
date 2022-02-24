package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

const igvRoot = "http://192.168.38.70:8081/gene/v3"

type track struct {
	TrackType            string
	Name             string
	Format           string
	Url              string
	IndexURL         string
	VisibilityWindow int64
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
		c.HTML(http.StatusOK, "geneBrowser.html", gin.H{})
	})

	router.GET("/genebrowser2", func(c *gin.Context) {
		c.HTML(http.StatusOK, "geneBrowser@v2.html", gin.H{"tracks":[]track{mRNA,gap,BAC}}) // binds data
	})

	router.GET("/pedigree", func(c *gin.Context) {
		c.HTML(http.StatusOK, "pedigree.html", gin.H{})
	})

	router.Run(":8081")
}
