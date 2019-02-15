import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-array-field',
  templateUrl: './form-array-field.component.html',
  styleUrls: ['./form-array-field.component.scss']
})
export class FormArrayFieldComponent implements OnInit {
  @Input()genericData;
  @Input()genericForm:FormGroup;
  @Input()genericEdit:boolean;
  question : FormArray;
  @Output() editquestion = new EventEmitter ();
  questionCount;
  ;
  constructor() { }

  ngOnInit() {
    this.questionCount = this.genericData['array'].length  || 1;
  }
  
  editQuestion(edit){
    if(edit == 'add')
    {
      this.questionCount++;
    }
    else if(edit == 'reset'){
      this.questionCount = 1;
    }
    else {
      this.questionCount -= 1;
    }
    this.editquestion.emit(edit);
  }


}
