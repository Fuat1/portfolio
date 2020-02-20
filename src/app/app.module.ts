

import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { ToolNavBarComponent } from './tool-nav-bar/tool-nav-bar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SizeDetectorComponent } from './size-detector/size-detector.component';
import { ResizeService } from './size-detector/resize.service';
import {MatListModule} from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolNavBarComponent,
    SizeDetectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    NgxSpinnerModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatCardModule

  ],
  providers: [ResizeService],
  bootstrap: [AppComponent],
  exports: [ToolNavBarComponent]
})
export class AppModule { }
