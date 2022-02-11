package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	router := gin.Default()

	router.LoadHTMLGlob("templates/*")

	router.Static("/static", "static/")

	router.Static("/img", "images")

	router.GET("", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})

	router.GET("/index", func(c *gin.Context) {
		c.HTML(http.StatusOK, "home_page.html", gin.H{})
	})

	router.GET("/genebrowser", func(c *gin.Context) {
		c.HTML(http.StatusOK, "GeneBrowser.html", gin.H{})
	})

	router.GET("/pedigree", func(c *gin.Context) {
		c.HTML(http.StatusOK, "pedigree.html", gin.H{})
	})

	router.Run(":8080")
}
