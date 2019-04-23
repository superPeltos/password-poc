import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-input-site-data-form',
  templateUrl: './input-site-data-form.component.html',
  styleUrls: ['./input-site-data-form.component.scss']
})
export class InputSiteDataFormComponent implements OnInit {

  registered = false;
  submitted = false;
  siteForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router)
  {

  }

  invalidSite()
  {
    return (this.submitted && this.siteForm.controls.site.errors != null);
  }

  invalidUrl()
  {
    return (this.submitted && this.siteForm.controls.url.errors != null);
  }


  invalidPassword()
  {
    return (this.submitted && this.siteForm.controls.password.errors != null);
  }

  ngOnInit()
  {
    this.siteForm = this.formBuilder.group({
      site: ['', Validators.required],
      url: ['', Validators.required],
      password: ['', [Validators.required, ]],
    });
  }

  onSubmit()
  {
    this.submitted = true;

    if(this.siteForm.invalid == true)
    {
      return;
    }
    else
    {



      this.http.get('api/v1/generate_uid').subscribe((tokenGuid:any) => {
        let data: any = Object.assign({
          guid: tokenGuid.guid
        },this.siteForm.value);
        console.log('data to api',data);
        this.http.post('/api/v1/site  ',data).subscribe((data:any) => {
          console.log('data by api',data);
          let path = '/site/' + data.site.uid;
          console.log(path)
          this.router.navigate([path])
        }, error => {
          // this.serviceErrors = error.error.error;
        })
      });

      this.registered = true;
    }
  }

}
