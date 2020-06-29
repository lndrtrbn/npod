import { Component, OnInit } from '@angular/core';
import { ApodHttpService } from "src/app/core/http/apod.http";
import { ActivatedRoute } from '@angular/router';
import { Picture } from 'src/app/core/domain/picture/picture';

@Component({
  selector: 'app-pod',
  templateUrl: './pod.component.html',
  styleUrls: ['./pod.component.scss']
})
export class PodComponent implements OnInit {
  picture: Picture;

  /**
   * @param apodHttp To retrieve the picture data.
   * @param route To retrieve the URL date param
   */
  constructor(
    private readonly apodHttp: ApodHttpService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve the date in the URL and get the associated APOD.
    this.route.params.subscribe(params => {
      this.apodHttp.getApod(params.date).subscribe(pic => this.picture = pic);
    });
  }

}
