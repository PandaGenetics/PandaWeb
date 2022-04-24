package lab

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Public(c *gin.Context) {
	c.HTML(http.StatusOK, "Public.html", gin.H{})
}
