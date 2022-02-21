package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

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

	router.GET("/pedigree", func(c *gin.Context) {
		c.HTML(http.StatusOK, "pedigree.html", gin.H{})
	})

	router.Run(":8080")
}
