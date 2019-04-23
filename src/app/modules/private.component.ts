import { Component, OnInit } from '@angular/core';
import { TranslateService, GlobalConfigurationService } from 'shikshalokam';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GlobalConfig } from './global-config';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './private-modules/auth-service/auth.service';
// import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
  isLoggedIn: boolean;
  programId;
  assessmentId;
  // links ;
  opened = true;
  pushMode = 'side';
  currentUser;
  baseUrl;
  portalName;


  logo = " ./assets/shikshalokam.png";
  roleAcess = [];
  constructor(private router: Router, private translate: TranslateService, private route: ActivatedRoute,
    private authService: AuthService, private globalConfigService: GlobalConfigurationService
    , private snackBar: MatSnackBar) {


  }

  ngOnInit() {
    // if(! localStorage.getItem('currentUser')){ 

    // this.authService.init();
    // this.authService.loginUserDetail.subscribe(success => {
    //   console.log(success);
    //   debugger;
    //   if (success.keyClockSuccess) {
        this.currentUser = this.authService.getCurrentUserDetails();
    //     localStorage.setItem('currentUser', this.currentUser)
      this.links = GlobalConfig.programPortalLinks;
        this.translate.use('en').then(() => {

        });
        this.currentUser = this.authService.getCurrentUserDetails();

        if (window.screen.width < 760) { // 768px portrait
          this.opened = false;
          this.pushMode = 'push';
        }
        this.baseUrl = environment.base_url;
        this.portalName = environment.portal_name;

        if (this.currentUser) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
        // this.getRoleAcess();
      // }
    // }
    // )
    // // }

    // this.authService.init();

  }

  onLogout() {
  setTimeout(()=>{
    this.router.navigate(['/home']);

  },2000 );
    this.authService.getLogout();
  }
  onResize(event) {
    if (event.target.innerWidth < 760) {
      this.opened = false;
      this.pushMode = 'push';
    }
    else {
      this.opened = true;
      this.pushMode = 'side';

    }
  }
  links;
  // getRoleAcess() {
  //   this.globalConfigService.getRolePermission(environment.apibaseurl + GlobalConfig.acessAccordingRole)
  //     .subscribe(data => {
  //       this.roleAcess = this.globalConfigService.getUniqueRoleAcessObject(data['result'], GlobalConfig.currentPortal);
  //       this.roleAcess.push('home');
  //       localStorage.setItem('canAcess', JSON.stringify(this.roleAcess));
  //       this.links = GlobalConfig.programPortalLinks;
  //       //console.logthis.roleAcess)
  //     },
  //       error => {
  //         //this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });
  //       }
  //     )

  // }
}


