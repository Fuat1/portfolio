import { ResizeService } from './size-detector/resize.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SCREEN_SIZE } from './size-detector/screen-size.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  size: SCREEN_SIZE;

  constructor(private spinner: NgxSpinnerService, private resizeSvc: ResizeService) {
    this.resizeSvc.onResize$.subscribe(x => {
      this.size = x;
    });
   }
  title = 'Fuat Shakjiri Portfolio';
  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
