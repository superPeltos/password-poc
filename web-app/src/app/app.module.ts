import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { HttpClientModule }    from '@angular/common/http'

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {InputUserDataFormComponent} from './input-user-data-form/input-user-data-form.component';
import { DisplayUserDataComponent } from './display-user-data/display-user-data.component';
import {RouterModule, Routes} from "@angular/router";
import { InputSiteDataFormComponent } from './input-site-data-form/input-site-data-form.component';
import { DisplaySiteDataComponent } from './display-site-data/display-site-data.component';
import { DisplaySitesDataComponent } from './display-sites-data/display-sites-data.component';


const routes: Routes = [
    {
        path: '',
        component: InputUserDataFormComponent
    },
    {
        path: 'site',
        component: InputSiteDataFormComponent
    },
    {
        path: 'user/:uid',
        component: DisplayUserDataComponent
    },
    {
        path: 'site/:uid',
        component: DisplaySiteDataComponent
    },
    {
        path: 'sites',
        component: DisplaySitesDataComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        InputUserDataFormComponent,
        DisplayUserDataComponent,
        InputSiteDataFormComponent,
        DisplaySiteDataComponent,
        DisplaySitesDataComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
