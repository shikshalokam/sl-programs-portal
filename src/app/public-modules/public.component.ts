import { Component, OnInit } from '@angular/core';
import { AuthService } from '../modules/private-modules/auth-service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { TranslateService, ApiService, UtilityService } from 'shikshalokam';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicConfig } from './public.config';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-public-modules',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicModulesComponent implements OnInit {
  logo = " ./assets/shikshalokam.png";
  url = environment.base_url;
  linkId: any;
  constructor(private authService :AuthService,
    private route : ActivatedRoute,
    private utility : UtilityService,
    private router : Router,
    private apiService : ApiService,
    private translate : TranslateService,
    ) { 
    this.translate.use('en').then(() => {

    });
    this.route.queryParams.subscribe(params =>{
      this.linkId = params['linkId'] ;
    })
  }

  ngOnInit() {
    this.getVerifyLinkId();
  }
  getVerifyLinkId(){
    this.utility.loaderShow();
    this.apiService.get(PublicConfig.verifyLinkId+"?linkId="+this.linkId ).subscribe(
      successData=>{
        console.log(successData)
        this.router.navigateByUrl(successData['result'].publicURL+"&linkId="+this.linkId)
        // this.router.navigateByUrl("/public?linkId=2a4618c0-5c65-11e9-ab60-bdbd8252e502")

      //  window.open( successData['result'].privateURL);
      } , error =>{
        this.utility.loaderHide();
      }
    )
  }
}
