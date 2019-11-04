import { Component } from '@angular/core';
import { APIService } from './api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fe';
  /**
   *
   */
  constructor(private _apiService: APIService) {
    this.demo();
  }

  demo() {
    const _that = this;
    // tslint:disable-next-line: only-arrow-functions
    _that._apiService.Process('sys_code', 3,'5').subscribe(function (response: any) {
      
      console.log(response);
      if (response) {
        if (response.iblnError) {
          console.log(response);
        } else {
          console.log(response);
        }

      }
    });
  }
}
