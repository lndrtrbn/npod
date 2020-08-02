import { Component, OnInit } from '@angular/core';
import { ApodHttpService } from 'src/app/core/http/apod.http';
import { Picture } from 'src/app/core/domain/picture/picture';
import * as moment from "moment";
import { finalize, delay } from 'rxjs/operators';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {
  pictures: Picture[] = [];
  nextDate: string = null; // The date of the first picture to get.
  pageSize = 10; // Number of pictures to fetch every time.
  isFetching = false; // To avoid calling multiple times the API.

  /**
   * @param apodHttp To retrieve the pictures data.
   */
  constructor(
    private readonly apodHttp: ApodHttpService,
  ) {}

  ngOnInit(): void {
    this.fetchPictures();
  }

  /**
   * Call the API to fetch pictures.
   */
  fetchPictures(delayMillis = 0): void {
    if (!this.isFetching) {
      this.isFetching = true;
      this.apodHttp.getMultipleApod(this.nextDate, this.pageSize)
      // When fetching ends (either by success or error) reset isFecthing attribute.
      .pipe(
        delay(delayMillis),
        finalize(() => this.isFetching = false))
      .subscribe(pictures => {
        // Add the new pictures and update the date of the next day to fetch.
        this.pictures = [...this.pictures, ...pictures];
        this.nextDate = moment(pictures[pictures.length - 1].date)
          .subtract(1, "day")
          .format("YYYY-MM-DD");
      });
    }
  }

}
