import { Component, OnInit } from '@angular/core';
import { AuthService } from '../modules/private-modules/auth-service/auth.service';
@Component({
  selector: 'app-assessment-home',
  templateUrl: './assessment-home.component.html',
  styleUrls: ['./assessment-home.component.scss']
})
export class AssessmentHomeComponent implements OnInit {
  curUser;
  constructor (private authService :AuthService){
    this.curUser = this.authService.userName;
   }

  ngOnInit() {
  
  }

}
