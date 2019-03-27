import { Component, OnInit, Input } from '@angular/core';
import { config } from 'rxjs';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit {

  @Input() headers;
  @Input() datas;
  constructor() { }

  ngOnInit() {
    console.log(this.headers)
  }

}
