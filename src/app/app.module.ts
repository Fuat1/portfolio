import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { ToolNavBarComponent } from './tool-nav-bar/tool-nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolNavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [ToolNavBarComponent]
})
export class AppModule { }
