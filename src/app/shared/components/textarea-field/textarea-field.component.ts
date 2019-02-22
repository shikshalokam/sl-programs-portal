import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent implements OnInit {
  @Input()genericData;
  @Input()genericForm:FormGroup;
  @Input()genericEdit:boolean;

  constructor() { }

  ngOnInit() {
  }
  check(val){
  }
}
