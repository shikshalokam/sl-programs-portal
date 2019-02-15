import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements OnInit {
  @Input()genericData;
  @Input()genericForm:FormGroup;
  @Input()genericEdit:boolean;
  constructor() { }

  ngOnInit() {
  }

}
