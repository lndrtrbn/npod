import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { IPicture, Picture } from "../domain/picture/picture";
import { environment } from "src/environments/environment";
import { map, mergeMap } from 'rxjs/operators';
import { APOD_API_KEY } from "src/secret";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class ApodHttpService {

  /**
   * @param http To call the Nasa API.
   */
  constructor(
    private readonly http: HttpClient
  ) {}

  /**
   * Retrieves an Astronomy Picture of the Day from the Nasa API.
   *
   * @param date The date of the Picture of the Day to get.
   * @returns The data of the APOD.
   */
  getApod(date?: string): Observable<Picture> {
    let params: HttpParams = new HttpParams().set("api_key", APOD_API_KEY);
    if (date && date !== "today") {
      params = params.set("date", date);
    }
    return this.http.get<IPicture>(environment.apodUrl, { params }).pipe(
      map(picture => new Picture(picture))
    );
  }

  /**
   * Retrieves several consecutive APOD from a date.
   * Or from the last published if no date given.
   * 
   * @param startDate The date of the latest APOD to get.
   * @param quantity The number of APOD to retrieve.
   * @returns An array of APOD sorted by newer to older.
   */
  getMultipleApod(startDate?: string, quantity = 3): Observable<Picture[]> {
    // Mocking data to avoid spamming Nasa API during dev. TODO DELETE.
    return this.http.get<IPicture[]>("assets/a.json").pipe(map(pics => pics.map(p => new Picture(p))));
    return this.getApod(startDate).pipe(
      mergeMap(firstPicture => {
        const requests: Observable<Picture>[] = [];
        let date: string = moment(firstPicture.date).format("YYYY-MM-DD");
        quantity = quantity - 1; // Already have one.
        while(quantity-- > 0) { // Loop until we have {quantity} pictures.
          date = moment(date).subtract(1, "day").format("YYYY-MM-DD");
          requests.push(this.getApod(date));
        }
        return forkJoin([of(firstPicture), ...requests]);
      })
    );
  }
}
