import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TranslateService {

  language: any = {};

  constructor(private http: HttpClient) { }

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const langPath = `assets/i18n/${lang || 'en'}.json`;
      // const langPath = `assets/i18n/od.json`;

      this.http.get<{}>(langPath).subscribe(
        translation => {
          this.language = Object.assign({}, translation || {});
          resolve(this.language);
        },
        error => {
          this.language = {};
          resolve(this.language);
        }
      );
    });
  }
}
