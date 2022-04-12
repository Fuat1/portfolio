import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
// import { FlexLayoutModule } from '@angular/flex-layout';


@Component({
  selector: 'app-tool-nav-bar',
  templateUrl: './tool-nav-bar.component.html',
  styleUrls: ['./tool-nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolNavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect() {
    this.router.navigate(['/home']);
  }

}
