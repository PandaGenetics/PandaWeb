package sampling

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
)

type Sampling struct {
	ID                    string `json:"id"`
	PandaName             string `json:"panda_name"`
	RequestForCoagulation string `json:"request_for_coagulation"` // Coagulation
	RequestForHeparin     string `json:"request_for_heparin"`     // Anti-coagulation sodium heparin 肝素钠
	RequestForEDTA        string `json:"request_for_edta"`        // Anti-coagulation EDTA
	RequestForOther       string `json:"request_for_other"`
	Purpose               string `json:"purpose"`
	Project               string `json:"project"`
	IACUC                 string `json:"iacuc"`
	ProjectManager        string `json:"project_manager"`
	Contact               string `json:"contact"`
	Notes                 string `json:"notes"`
}

func (s *Sampling) String() string {
	return fmt.Sprintf("%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n", s.ID, s.PandaName, s.RequestForCoagulation,
		s.RequestForHeparin, s.RequestForEDTA, s.RequestForOther, s.Purpose, s.Project, s.IACUC, s.ProjectManager,
		s.Contact, s.Notes)
}

type SamplingRecords []Sampling

func (sr *SamplingRecords) String() string {
	var s = strings.Builder{}
	for _, item := range *sr {
		s.WriteString(item.String() + "\n")
	}
	return s.String()
}

func NewSampling(path string) []Sampling {
	var SamplingRecords = make([]Sampling, 0)
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

		if len(record) == 12 {
			line := Sampling{record[0], record[1], record[2],
				record[3], record[4], record[5],
				record[6], record[7], record[8], record[9],
				record[10], record[11]}
			SamplingRecords = append(SamplingRecords, line)
		}
	}
	return SamplingRecords
}
