package main

import (
	"net/http"

	"github.com/PandaGenetics/PandaWeb/go-repository/genomeBrowser"
	"github.com/PandaGenetics/PandaWeb/go-repository/lab"
	"github.com/PandaGenetics/PandaWeb/go-repository/sampling"
	"github.com/PandaGenetics/PandaWeb/go-repository/utility"
	"github.com/gin-gonic/gin"
)

func main() {

	utility.OpenCSV()
	router := gin.Default()

	router.LoadHTMLGlob("pages/*")

	router.Static("/static", "static/")
	router.Static("/img", "images")
	router.Static("/gene", "data")

	router.GET("", func(c *gin.Context) {
		c.HTML(http.StatusOK, "homePage.html", gin.H{})
	})

	// IGV Pages
	router.GET("/genebrowser2", genomeBrowser.PandaGenomeV2)
	router.GET("/genebrowser3", genomeBrowser.PandaGenomeV3)
	router.GET("/pedigree", func(c *gin.Context) {
		c.HTML(http.StatusOK, "pedigree.html", gin.H{})
	})

	router.GET("/samplingsummary", sampling.SampleSummary)
	router.POST("/samplingsummary", sampling.SampleDelete)
	router.GET("/samplingrequest", sampling.SampleRequest)
	router.POST("/samplingrequest", sampling.SampleAppend)

	router.GET("/people", lab.People)
	router.GET("/public", lab.Public)

	router.Run(":8081")
}
