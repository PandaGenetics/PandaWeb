package lab

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func People(c *gin.Context) {
	c.HTML(http.StatusOK, "people.html", gin.H{})
}
