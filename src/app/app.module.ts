import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IntroComponent } from './intro/intro.component';
import { AboutComponent } from './about/about.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillsComponent } from './skills/skills.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SizeDetectorComponent } from './size-detector/size-detector.component';
import { ToolNavBarComponent } from './tool-nav-bar/tool-nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ResizeService } from './size-detector/resize.service';
import {MatListModule} from '@angular/material/list';
// import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
// import { LightboxModule } from '@ngx-gallery/lightbox';
// import { GalleryModule, GALLERY_CONFIG } from '@ngx-gallery/core';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    EducationComponent,
    ExperienceComponent,
    FooterComponent,
    HeaderComponent,
    IntroComponent,
    SkillsComponent,
    SizeDetectorComponent,
    ToolNavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SnotifyModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    // FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    // LightboxModule,
    // GalleryModule,
    // FontAwesomeModule,
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
  ],
  bootstrap: [AppComponent],
  exports: [ToolNavBarComponent]
})
export class AppModule { }
