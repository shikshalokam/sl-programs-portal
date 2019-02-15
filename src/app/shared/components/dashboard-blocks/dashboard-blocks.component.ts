import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dashboard-blocks',
  templateUrl: './dashboard-blocks.component.html',
  styleUrls: ['./dashboard-blocks.component.scss']
})
export class DashboardBlocksComponent implements OnInit {
 programId: string;
 assessmentId: string;

  constructor(private route : ActivatedRoute) { 
    this.route.parent.queryParams.subscribe(params =>{
     this.programId = params['programId'];
     this.assessmentId = params['assessmentId']
   })
  }
  @Input() list: any;

   ngOnInit() {
   }

}
