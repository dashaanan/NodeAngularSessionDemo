import { Component, OnInit } from '@angular/core';
import { APIService } from '../api-service.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
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
          //console.log(response);
        } else {
          //console.log(response);
        }

      }
    });
  }

  ngOnInit() {
  }

}
