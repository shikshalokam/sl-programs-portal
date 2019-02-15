import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelcase',
  pure: false
})
export class CamelCasePipe implements PipeTransform {
  constructor() {}
  transform(camelCase: any): any {
   
      if (camelCase == null || camelCase == "") {
        return camelCase;
      }
  
      camelCase = camelCase.trim();
      var newText = "";
      for (var i = 0; i < camelCase.length; i++) {
        if (/[A-Z]/.test(camelCase[i])
            && i != 0
            && /[a-z]/.test(camelCase[i-1])) {
          newText += " ";
        }
        if (i == 0 && /[a-z]/.test(camelCase[i]))
        {
          newText += camelCase[i].toUpperCase();
        } else {
          newText += camelCase[i];
        }
      }
  
      return newText;
    }
  }

