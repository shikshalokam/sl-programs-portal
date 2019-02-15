import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blank',
  pure: false
})
export class NoValuePipe implements PipeTransform {
  constructor() {}
  transform(value: any): any {
   
      if (value == null || value == "") {
        return "-NA-";
      }
      return value;
    }
  }

