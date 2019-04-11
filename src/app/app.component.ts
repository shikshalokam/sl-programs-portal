import { Component, OnInit } from '@angular/core';
import { TranslateService, GlobalConfigurationService } from 'shikshalokam';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './modules/private-modules/auth-service/auth.service';
import { environment } from 'src/environments/environment';
import { GlobalConfig } from './modules/global-config';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // isLoggedIn:boolean;
  // programId;
  // assessmentId;
  // // links ;
  // opened = true;
  // pushMode = 'side';
  // currentUser;
  // baseUrl;
  // portalName;


  // logo =" ./assets/shikshalokam.png";
  // roleAcess=[];
  // constructor(private translate: TranslateService,private route : ActivatedRoute,
  //   private authService :AuthService , private globalConfigService:GlobalConfigurationService
  //   ,private snackBar : MatSnackBar) {
  //   translate.use('en').then(() => {
      
  //   });
  //   // if (window.screen.width < 760) { // 768px portrait
  //   //   this.opened = false;
  //   //   this.pushMode = 'push';
  //   // }
  //   // this.currentUser = this.authService.getCurrentUserDetails();
  //   // this.baseUrl=environment.base_url;
  //   // this.portalName = environment.portal_name;

  //   // if(this.currentUser){
  //   //   this.isLoggedIn = true;
  //   // }else{
  //   //   this.isLoggedIn = false;
  //   // }
  //   // this.getRoleAcess();
  //  }

  ngOnInit() {
    

  }
   
  // onLogout(){
  //   this.authService.getLogout();
  // }
  // onResize(event)
  // {
  //   if(event.target.innerWidth < 760)
  //   {
  //     this.opened = false;
  //     this.pushMode = 'push';
  //   }
  //   else{
  //     this.opened = true;
  //     this.pushMode = 'side';

  //   }
  // }
  // links;
  //     getRoleAcess() {
  //       this.globalConfigService.getRolePermission(environment.apibaseurl + GlobalConfig.acessAccordingRole)
  //         .subscribe(data => {
  //           this.roleAcess = this.globalConfigService.getUniqueRoleAcessObject(data['result'], GlobalConfig.currentPortal);
  //           this.roleAcess.push('home');
  //           localStorage.setItem('canAcess',JSON.stringify(this.roleAcess));
  //           this.links = GlobalConfig.programPortalLinks;
  //           //console.logthis.roleAcess)
  //         },
  //           error => {
  //             this.snackBar.open(GlobalConfig.errorMessage, "Ok", { duration: 9000 });
  //           }
  //         )
    
  //     }
}


