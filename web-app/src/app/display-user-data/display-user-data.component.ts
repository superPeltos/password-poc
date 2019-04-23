import {Component, OnInit} from '@angular/core';
import {UserInfoModel} from "../models/UserInfoModel";
import {ActivatedRoute} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
    selector: 'app-display-user-data',
    templateUrl: './display-user-data.component.html',
    styleUrls: ['./display-user-data.component.scss']
})
export class DisplayUserDataComponent implements OnInit {

    user: UserInfoModel;

    constructor(private activeRoute: ActivatedRoute, private http:HttpClient) {
    }

    ngOnInit() {

        const queryParams = this.activeRoute.snapshot.queryParams
        const routeParams = this.activeRoute.snapshot.params;
        console.log(queryParams);
        console.log(routeParams.uid);
        this.http.get(`api/v1/customer/${routeParams.uid}`).subscribe((data: any) => {
            console.log(data)
            this.user = new UserInfoModel({
                guid: data.customer.guid,
                customerUid: data.customer.id,
                first_name: data.customer.first_name,
                last_name: data.customer.last_name,
                email: data.customer.email,
                zipcode: data.customer.zipcode,
                password: data.customer.password,
            });
        })
    }
}
