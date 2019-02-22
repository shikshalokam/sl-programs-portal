import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-responsive-navbar',
  templateUrl: './responsive-navbar.component.html',
  styleUrls: ['./responsive-navbar.component.scss']
})
export class ResponsiveNavbarComponent implements OnInit {
  currentUser: any;
  @Output() openDrawer = new EventEmitter();
  prodFlag = environment.production;
  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    this.openSideNav();
    this.currentUser = this.authService.getCurrentUserDetails();
  }
  
  onSignout()
  {
    return this.authService.getLogout();
  }
  openSideNav(){
    this.openDrawer.emit(true);
  }

}
