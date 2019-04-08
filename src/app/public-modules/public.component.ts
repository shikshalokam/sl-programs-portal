import { Component, OnInit } from '@angular/core';
import { AuthService } from '../modules/private-modules/auth-service/auth.service';

@Component({
  selector: 'app-public-modules',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicModulesComponent implements OnInit {

  constructor(private authService :AuthService) { 
    
  }

  ngOnInit() {
  }

}
