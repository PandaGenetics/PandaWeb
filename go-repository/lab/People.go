package lab

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func People(c *gin.Context) {
	c.HTML(http.StatusOK, "people.html", gin.H{})
}
