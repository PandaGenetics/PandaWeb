package lab

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Public(c *gin.Context) {
	c.HTML(http.StatusOK, "Public.html", gin.H{})
}
