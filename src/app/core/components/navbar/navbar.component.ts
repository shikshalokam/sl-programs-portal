import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showDropdown = false;
  @Input() dropdownLabel ;
  currentUser: any;

  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUserDetails();
  }
  openDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  onSignout()
  {
    return this.authService.getLogout();
  }
}



