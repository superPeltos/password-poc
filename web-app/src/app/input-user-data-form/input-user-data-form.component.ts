import { Component, OnInit } from '@angular/core';
import  { FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {UserInfoModel} from "../models/UserInfoModel";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'input-user-data-form',
  templateUrl: './input-user-data-form.component.html',
  styleUrls: ['./input-user-data-form.component.scss']
})
export class InputUserDataFormComponent implements OnInit {
  registered = false;
  submitted = false;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router)
  {

  }

  invalidFirstName()
  {
    return (this.submitted && this.userForm.controls.first_name.errors != null);
  }

  invalidLastName()
  {
    return (this.submitted && this.userForm.controls.last_name.errors != null);
  }

  invalidEmail()
  {
    return (this.submitted && this.userForm.controls.email.errors != null);
  }

  invalidZipcode()
  {
    return (this.submitted && this.userForm.controls.zipcode.errors != null);
  }

  invalidPassword()
  {
    return (this.submitted && this.userForm.controls.password.errors != null);
  }

  ngOnInit()
  {
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      password: ['', [Validators.required, ]],
    });
  }

  onSubmit()
  {
    this.submitted = true;
    console.log('form',this.userForm.value);
    if(this.userForm.invalid == true)
    {
      return;
    }
    else
    {
      console.log('form2',this.userForm);
      this.http.get('api/v1/generate_uid').subscribe((tokenGuid:any) => {
        let data: any = Object.assign({
          guid: tokenGuid.guid
        },this.userForm.value);
        console.log('data to api',data);
        this.http.post('/api/v1/customer',data).subscribe((data:any) => {
          console.log('data by api',data);
          let path = '/user/' + data.customer.uid;
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
