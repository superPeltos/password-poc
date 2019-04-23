import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserInfoModel} from "../models/UserInfoModel";
import {SiteInfoModel} from "../models/SiteInfoModel";

@Component({
  selector: 'app-display-site-data',
  templateUrl: './display-site-data.component.html',
  styleUrls: ['./display-site-data.component.scss']
})
export class DisplaySiteDataComponent implements OnInit {

  site: SiteInfoModel;

  constructor(private activeRoute: ActivatedRoute, private http:HttpClient) {
  }

  ngOnInit() {

    const queryParams = this.activeRoute.snapshot.queryParams
    const routeParams = this.activeRoute.snapshot.params;
    console.log(queryParams);
    console.log(routeParams.uid);
    this.http.get(`api/v1/site/${routeParams.uid}`).subscribe((data: any) => {
      console.log(data)
      this.site = new SiteInfoModel({
        guid: data.site.guid,
        siteUid: data.site.id,
        site: data.site.site,
        url: data.site.url,
        password: data.site.password,
      });
    })
  }

}
