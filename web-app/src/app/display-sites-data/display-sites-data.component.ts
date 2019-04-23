import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-display-sites-data',
  templateUrl: './display-sites-data.component.html',
  styleUrls: ['./display-sites-data.component.scss']
})
export class DisplaySitesDataComponent implements OnInit {

   sites = [];

  constructor(private activeRoute: ActivatedRoute, private http:HttpClient) {
  }

  ngOnInit() {
    //
    // const queryParams = this.activeRoute.snapshot.queryParams
    // const routeParams = this.activeRoute.snapshot.params;
    // console.log(queryParams);
    // console.log(routeParams.uid);
    this.http.get(`api/v1/site/all`).subscribe((data: any) => {
      console.log('data',data);
      for (var id in data.sites) {
        console.log(data.sites[id])
        this.sites.push(data.sites[id]);
      }
       console.log(this.sites)
    })
  }

}
