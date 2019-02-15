import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../../services';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  resarray='';
  obj = {};
  constructor(private translate: TranslateService) {}
  transform(key: any): any {
    if(key.indexOf('.') === -1)
    {
      return this.translate['language'][key] || key;
    }
    else{
        var array = key.split(".");
        this.resarray = this.translate['language'] ;
        array.forEach(element => {
          if(this.resarray){
            this.resarray = this.resarray[element];
          }
        });
      return this.resarray || key;
    }
  }
}
