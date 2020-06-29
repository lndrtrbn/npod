import { Component, OnInit } from '@angular/core';
import { ApodHttpService } from 'src/app/core/http/apod.http';
import { Picture } from 'src/app/core/domain/picture/picture';
import { Observable } from 'rxjs';
import * as moment from "moment";

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {
  pictures: Picture[] = [];
  nextDate: string = null; // The date of the first picture to get.

  /**
   * @param apodHttp To retrieve the pictures data.
   */
  constructor(
    private readonly apodHttp: ApodHttpService,
  ) {}

  ngOnInit(): void {
    this.fetchPictures();
  }

  fetchPictures(): void {
    this.apodHttp.getMultipleApod(this.nextDate, 10).subscribe(pictures => {
      this.pictures = [...this.pictures, ...pictures];
      this.nextDate = moment(pictures[pictures.length - 1].date)
        .subtract(1, "day")
        .format("YYYY-MM-DD");
    })
  }

}
