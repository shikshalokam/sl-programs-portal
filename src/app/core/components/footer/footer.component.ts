import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerLink;
  constructor() {
    this.footerLink =[
      {
        name: "Copyright @2019 Shikshalokam",
        line:"|"
      },
      {
        name: "Terms of Service",
        line:"|"
      },
      {
        name: "Privacy Policy",
        line:"|"
      },
      {
        name: "Contact Us",
      }
   ];
  }

  ngOnInit() {
  }

}
