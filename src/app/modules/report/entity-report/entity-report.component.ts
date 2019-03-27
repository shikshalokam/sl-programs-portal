import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../private-modules/auth-service/auth.service';
import { ApiService, UtilityService } from 'shikshalokam';

@Component({
  selector: 'app-entity-report',
  templateUrl: './entity-report.component.html',
  styleUrls: ['./entity-report.component.scss']
})
export class EntityReportComponent implements OnInit {

  headings= 'headings.reportEntityReport'
  entityResult;
  insightReport;
  summary;
  constructor(private authService :AuthService , private apiService :ApiService,private utility :UtilityService) {
    
   }

  ngOnInit() {
    this.utility.loaderShow();
    this.getEntityReport();

  
    this.apiService.get("assets/temp.json").subscribe(data =>{
      this.summary=data;
      this.entityResult = data['results'];
      this.setColor();

    })
  }
  setColor(){
    let index =0;
    let colorArray=[];
    this.entityResult.forEach(element => {
      if(element.reportType == "tableGraph"){
       let colorArrayLength=  element.graphData.data[0].length;
       for( let i = 1; i < colorArrayLength;){
         let uniqueColor = this.getRandomColor();
         if(!( colorArray.includes(uniqueColor)  &&  uniqueColor.includes('#f'))){
           colorArray.push(uniqueColor);
           i++;
         }

       }
       this.entityResult[index].graphData.chartOptions.colors = colorArray ;
      }
       index++;
    });
  }
  onReady(){
    console.log("graph ready");
    this.utility.loaderHide();
  }
   getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getEntityReport() {
    this.apiService.get("assets/insight.json").subscribe(data =>{
      this.insightReport = data['result'];
    this.utility.loaderHide();

      // this.summary=data;
      // this.entityResult = data['results'];
      // this.setColor();

    })
  }
  
  
}
