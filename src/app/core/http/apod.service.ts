import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IImage, Image } from "../domain/image/image";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';
import { APOD_API_KEY } from "src/secret";

@Injectable({
  providedIn: 'root'
})
export class ApodService {

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
  getApod(date = "today"): Observable<Image> {
    const params: HttpParams = new HttpParams()
      .set("date", date)
      .set("api_key", APOD_API_KEY);
    return this.http.get<IImage>(environment.apodUrl, { params }).pipe(
      map(img => new Image(img))
    );
  }
}
