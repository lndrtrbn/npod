import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPicture, Picture } from "../domain/picture/picture";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';
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
    if (!date || date === "today") {
      // If no date given, then get today.
      date = moment(new Date()).format("YYYY-MM-DD");
    }
    const params: HttpParams = new HttpParams()
      .set("date", date)
      .set("api_key", APOD_API_KEY);
    return this.http.get<IPicture>(environment.apodUrl, { params }).pipe(
      map(img => new Picture(img))
    );
  }
}
