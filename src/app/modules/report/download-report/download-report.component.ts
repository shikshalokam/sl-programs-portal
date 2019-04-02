import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ReportService } from '../report-service/report.service';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.scss']
})
export class DownloadReportComponent implements OnInit {
  showLoader = false;
  evedinces = [
    {
      label: "Assesment - Class-3",
      value: "AC3",
    },
    {
      label: "Assesment - Class-5",
      value: "AC5",
    },
    {
      label: "Assesment - Class-8",
      value: "AC8",
    },
    {
      label: "Book Look",
      value: "BL"
    },
    {
      label: "ClassRoom Observation",
      value: "CO"
    },
    {
      label: "Learning Work",
      value: "LW"
    },
    {
      label: "Principal Interview",
      value: "PI"
    },
    {
      label: "Student Interview",
      value: "SI"
    },
    {
      label: "Teacher Interview",
      value: "TI"
    }
  ]
  heading = 'headings.downloadReport'
  evedince;
  activeButton = false;
  constructor(
    private reportService: ReportService, private snackBar: MatSnackBar, ) { }

  ngOnInit() {
  }


  sendEvedinceId(evedinceID) {
    this.activeButton = true;
    this.evedince = evedinceID;

  }
  downloadEvedinceReport() {

    this.showLoader = true;
    this.reportService.downloadReport(this.evedince)
    .subscribe(
      (data:string) => {
        // this.downloadFile(data);
        const datastr = data.toString();
        const blob = new Blob([datastr], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        this.showLoader = false;

      }
      , (error) => {
        if(error.status==200){
          const blob = new Blob([error.error.text], { type: 'csv' });
          const url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = `evidenceReport-${this.evedinces}.csv`;
          document.body.appendChild(a);
          a.click();        
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }else{
          this.snackBar.open(error, "Ok", { duration: 3000 });
        }
        
        
        
        this.showLoader = false;

      }
    )
    
  }
  // moviePromiseService
  //         .getService('api/Movie/TestGetNo')
  //         .then(result => ////console.logresult))
  //         .catch(error => ////console.logerror));
  objectKeys(obj) {
    return Object.keys(obj);
  }
  // downloadFile(data: Response) {
  //   const blob = new Blob([data], { type: 'text/csv' });
  //   const url = window.URL.createObjectURL(blob);
  //   window.open(url);
  // }
}
