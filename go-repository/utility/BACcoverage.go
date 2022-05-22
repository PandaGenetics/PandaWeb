package utility

import (
	"math"
	"sort"
)

// Given an array of intervals where intervals[i] = [starti, endi],
// merge all overlapping intervals,
// and return an array of the non-overlapping intervals that cover all the intervals in the input.

// Intervals implements sort.Interface
type Intervals [][2]int64

func (In Intervals) Len() int {
	return len(In)
}

func (In Intervals) Less(i, j int) bool {
	if In[i][0] < In[j][0] {
		return true
	} else {
		return false
	}
}
func (In Intervals) Swap(i, j int) {
	In[i], In[j] = In[j], In[i]
}

// Coverage returns the sum of each interval length
func (In Intervals) Coverage() int64 {
	var sum int64
	for i := range In {
		sum += In[i][1] - In[i][0] + 1
	}
	return sum
}

func IntervalMerge(In Intervals) Intervals {
	sort.Sort(In)
	var (
		result Intervals
		start  = In[0][0]
		end    = In[0][1]
	)
	for i := 1; i < In.Len(); i++ {
		if In[i][0] <= end {
			end = int64(math.Max(float64(end), float64(In[i][1])))
			continue
		} else {
			result = append(result, [2]int64{start, end})
			start = In[i][0]
			end = In[i][1]
		}
	}
	result = append(result, [2]int64{start, end})
	return result
}
