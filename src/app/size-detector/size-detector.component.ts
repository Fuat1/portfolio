import { Component, OnInit, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { SCREEN_SIZE } from './screen-size.enum';
import { ResizeService } from './resize.service';

@Component({
  templateUrl: './size-detector.component.html',
  styleUrls: ['./size-detector.component.css']
})
export class SizeDetectorComponent implements AfterViewInit {
  prefix = 'is-';
  sizes = [
    {
      id: SCREEN_SIZE.XS, name: 'xs', css: `d-block d-sm-none`
    },
    {
      id: SCREEN_SIZE.SM, name: 'sm', css: `d-none d-sm-block d-md-none`
    },
    {
      id: SCREEN_SIZE.MD, name: 'md', css: `d-none d-md-block d-lg-none`
    },
    {
      id: SCREEN_SIZE.LG, name: 'lg', css: `d-none d-lg-block d-xl-none`
    },
    {
      id: SCREEN_SIZE.XL, name: 'xl', css: `d-none d-xl-block`
    },
  ];

  @HostListener('window:resize', [])
  onResize() {
    this.detectScreenSize();
  }

  ngAfterViewInit() {
    this.detectScreenSize();
  }

  constructor(private elementRef: ElementRef, private resizeSvc: ResizeService) { }

  private detectScreenSize() {


    const currentSize = this.sizes.find(x => {
      // get the HTML element
      const el = this.elementRef.nativeElement.querySelector(`.${this.prefix}${x.id}`);

      // check its display property value
      const isVisible = window.getComputedStyle(el).display !== 'none';

      return isVisible;
    });

    // @ts-ignore
    this.resizeSvc.onResize(currentSize.id);
}
}
