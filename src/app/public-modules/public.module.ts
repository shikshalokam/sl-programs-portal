import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicModulesComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [
    PublicModulesComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
