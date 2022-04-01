package sampling

import (
	"fmt"
	"testing"
)

func TestNewSampling(t *testing.T) {
	s := NewSampling("../../data/samplingSummary.csv")
	fmt.Printf("%v", s)
}
