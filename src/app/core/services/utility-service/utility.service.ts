import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  constructor(private location :Location,private spinner: NgxSpinnerService) { }

  onBack(){
    this.location.back();
  }
  loaderShow(){
    this.spinner.show();
  }
  loaderHide(){
    this.spinner.hide();
  }
  toGroup(inputs) {

    let group: any = {};
   
    inputs.forEach(inputs => {
      if(inputs.input == "array")
      {
        group[inputs.field] = this.createFormArray(inputs);
      }
      else{
        group[inputs.field] = inputs.validation.required ? new FormControl(inputs.value || '', Validators.required)
        : new FormControl(inputs.value || '');
      }
    });
    return new FormGroup(group);
  }
  createFormArray(inputs){

    let elements : any = [];
    inputs.array.forEach(element => {
      elements[element['field']] = element.validation.required ? new FormControl(element.value || '', Validators.required)
                                            : new FormControl(element.value || '');
    });

    return new FormArray(elements);
  }
}

