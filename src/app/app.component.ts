import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  photos: Array<any> = [];
  photosToDisplay: Array<any> = [];
  searchFlag = false;
  breakpoint = 4;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 750) ? 2 : 5;
}

  onResize(event): void {
    this.breakpoint = (event.target.innerWidth <= 750) ? 2 : 5;
  }

  searchFotos(): any {
    this.searchFlag = true;
    this.appService.getFotos()
      .then((resp: any) => {
        console.log(resp);
        this.photos = resp.photos;
        this.photosToDisplay = this.photos.slice(0, 10);
      })
      .catch(err => {
        console.log(err);
      });
  }

  loadMore(): void {
    const counter = this.photosToDisplay.length;
    this.photosToDisplay.push(...this.photos.slice(counter, counter + 10));
    console.log(this.photosToDisplay);
  }
}
