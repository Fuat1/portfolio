import { Component, OnInit, HostListener} from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = 'Angular';
  album:any = [];
  isShow: boolean;
  topPosToStartShowing = 100;
  items: GalleryItem[];
  imageData = data;

  imagesBasic = [
    { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg', thumb:
'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg', description: 'Image 1' },
{ img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(98).jpg', thumb:
'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(98).jpg', description: 'Image 2' },
  ];
  @HostListener('window:scroll')
  checkScroll() {
    // window의 scroll top
    // tslint:disable-next-line: max-line-length
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  constructor(public gallery: Gallery, public lightbox: Lightbox) {
  }

  ngOnInit() {

    /** Basic Gallery Example */

    // Creat gallery items
    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));


    /** Lightbox Example */

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }
}

const data = [
  {
    srcUrl: 'assets/Front-end/1.PNG',
    previewUrl: 'assets/Front-end/1.PNG'
  },
  {
    srcUrl: 'assets/Front-end/2.PNG',
    previewUrl: 'assets/Front-end/2.PNG'
  },
  {
    srcUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg',
    previewUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg'
  },
  {
    srcUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg',
    previewUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg'
  }
];



