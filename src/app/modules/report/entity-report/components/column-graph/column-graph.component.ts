import { Component, OnInit, Input } from '@angular/core';
import { CamelCasePipe } from 'shikshalokam';

@Component({
  selector: 'app-column-graph',
  templateUrl: './column-graph.component.html',
  styleUrls: ['./column-graph.component.scss']
})
export class ColumnGraphComponent implements OnInit {

  @Input() datas;
  @Input() configs;
  graphData = {};


  constructor() { }

  ngOnInit() {
    this.createGraphObj();
  }

  createGraphObj() {
    this.graphData['chartType'] = this.configs.chartType;
    this.graphData["data"] = this.datas.map(data => Object.values(data));
    this.graphData['title'] = this.configs.title;
    this.graphData['options'] = this.configs.chartOptions;
  //   this.graphData['options'] ['titleTextStyle'] = {
  //     color: "red",    // any HTML string color ('red', '#cc00cc')
  //     "margin": "20",
  //     // fontName: <string>, // i.e. 'Times New Roman'
  //     fontSize: 30, // 12, 18 whatever you want (don't specify px)
  //     "bold": true,    
  //     italic: true   // true of false
  // }
    let keys = Object.keys(this.datas[0]);
    this.graphData['columnNames'] = keys.map(key => new CamelCasePipe().transform(key));
    this.graphData['options']["legend"] = { position: 'top', maxLines: 2 }
  }

}
