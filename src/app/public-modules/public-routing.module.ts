import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicModulesComponent } from './public.component';
const routes: Routes = [
  {
    path:'public',
    component : PublicModulesComponent
    
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
