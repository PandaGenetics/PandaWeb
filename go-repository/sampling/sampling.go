package sampling

import (
	"encoding/csv"
	"fmt"
	"github.com/PandaGenetics/PandaWeb/go-repository/PandaIndividual"
	"github.com/gin-gonic/gin"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
)

// Sampling records a list of information for requesting panda sample.
type Sampling struct {
	PID       string `json:"id"` // pedigree_id
	PandaName string `json:"panda_name"`
	//RequestForCoagulation string `json:"request_for_coagulation"` // Coagulation
	//RequestForHeparin     string `json:"request_for_heparin"`     // Anti-coagulation sodium heparin 肝素钠
	//RequestForEDTA        string `json:"request_for_edta"`        // Anti-coagulation EDTA
	//RequestForOther       string `json:"request_for_other"`
	SampleType     string `json:"sample_type"`
	SampleQuantity string `json:"sample_quantity"`
	Purpose        string `json:"purpose"`
	Project        string `json:"project"`
	IACUC          string `json:"iacuc"`
	ProjectManager string `json:"project_manager"`
	Contact        string `json:"contact"`
	Notes          string `json:"notes"`
}

func (s *Sampling) String() string {
	//return fmt.Sprintf("%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n", s.PID, s.PandaName, s.RequestForCoagulation,
	//	s.RequestForHeparin, s.RequestForEDTA, s.RequestForOther, s.Purpose, s.Project, s.IACUC, s.ProjectManager,
	//	s.Contact, s.Notes)
	return fmt.Sprintf("%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n", s.PID, s.PandaName, s.SampleType,
		s.SampleQuantity, s.Purpose, s.Project, s.IACUC, s.ProjectManager,
		s.Contact, s.Notes)
}

type SamplingRecords map[string]Sampling // hash table, key is ID

func (sr *SamplingRecords) String() string {
	var s = strings.Builder{}
	for _, item := range *sr {
		s.WriteString(item.String() + "\n")
	}
	return s.String()
}

// NewSampling reads records from comma-delimited file.
func NewSampling(path string) SamplingRecords {
	var SR = make(SamplingRecords, 0)
	f, err := os.Open(path)
	if err != nil {
		log.Fatalln("Open error: ", err)
	}

	r := csv.NewReader(f)
	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if len(record) == 10 {
			ID := record[0]
			SR[ID] = Sampling{record[0], record[1], record[2],
				record[3],
				record[4], record[5], record[6], record[7],
				record[8], record[9]}
		}
	}
	return SR
}

// Save to file
func (sr *SamplingRecords) SaveToCSV(path string) error {
	f, err := os.Create(path)
	if err != nil {
		return err
	}
	defer f.Close()
	w := csv.NewWriter(f)
	for _, item := range *sr {
		err := w.Write([]string{item.PID, item.PandaName, // write record to file in line-by-line
			item.SampleType,
			item.SampleQuantity,
			item.Purpose,
			item.Project, item.IACUC,
			item.ProjectManager, item.Contact,
			item.Notes})
		if err != nil {
			return err
		}
	}
	w.Flush()
	return nil
}

func (sr *SamplingRecords) DeleteByIDs(IDs []string) {
	for _, item := range IDs {
		delete(*sr, item)
	}
}

type Config struct {
	file    string
	records SamplingRecords
}

func NewConfig() *Config {
	var file = "data/samplingSummary.csv"
	return &Config{file: file, records: NewSampling(file)}
}

func SampleSummary(c *gin.Context) {
	conf := NewConfig()
	c.HTML(http.StatusOK, "samplingSummary.html", gin.H{"records": conf.records})
}

func SampleDelete(c *gin.Context) {
	conf := NewConfig()
	deleteItems := c.PostFormArray("delete")
	conf.records.DeleteByIDs(deleteItems)

	//c.JSON(http.StatusOK, deleteItems)
	conf.records.SaveToCSV(conf.file)
	c.HTML(http.StatusOK, "samplingSummary.html", gin.H{"records": conf.records})
}

func SampleAppend(c *gin.Context) {
	conf := NewConfig()
	formPIDValue := c.PostForm("PID")
	pandas := strings.Split(formPIDValue, ",")
	fmt.Println(formPIDValue, pandas)
	Pandas := PandaIndividual.NewConfig()
	for _, panda := range pandas {
		PID, _ := strconv.ParseUint(panda, 10, 64)
		NewRecord := Sampling{
			panda,
			Pandas.Population[uint(PID)].Name,
			//c.PostForm("request_for_coagulation"),
			//c.PostForm("request_for_heparin"),
			//c.PostForm("request_for_edta"),
			//c.PostForm("request_for_other"),
			c.PostForm("sample_type"),
			c.PostForm("sample_quantity"),
			c.PostForm("purpose"),
			c.PostForm("project"),
			c.PostForm("iacuc"),
			c.PostForm("project_manager"),
			c.PostForm("contact"),
			c.PostForm("notes"),
		}
		conf.records[panda] = NewRecord
	}

	// Save new requests to file.
	conf.records.SaveToCSV("data/samplingSummary.csv")

	c.HTML(http.StatusOK, "samplingSummary.html", gin.H{"records": conf.records})
}

func SampleRequest(c *gin.Context) {
	Pandas := PandaIndividual.NewConfig()
	c.HTML(http.StatusOK, "samplingRequest.html", gin.H{"pandas": Pandas.Population})
}
