import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../private-modules/auth-service/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  curUser;
  constructor (private authService :AuthService){
    this.curUser = this.authService.userName;
   }

  ngOnInit() {
  
  }

}
