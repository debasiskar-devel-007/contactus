import { Component, Input, OnInit, Pipe, PipeTransform, ViewChild, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

export interface DialogData {
  value: string;
  Url: any;
}




@Component({
  selector: 'lib-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})


export class ContactusComponent implements OnInit {

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  public value: any='';
  public link: any='';
  public Url: any='';
  public message: any = '';

  public formTitleValue: any;        // This variable is use for show the Form title   
  public email: any[] = [];
  public phone: any[] = [];
  public address: any[] = [];

  public serverURL: any = '';      // url variable to fetch the add availability form page
  public addEndpointData: any = '';
  public routeingUrlValue: any = '';
  public setJwtTokenValue: any = '';  
  public listingValue: any = '';
  public logoImgValue: any = '';


  @Input()      // set the from modal logo

  set modaleLogo(modaleLogoVal : any) {
    this.link = modaleLogoVal;
  }
  

  @Input()
  
  public set formTitle(formTitleVal : string) {
    this.formTitleValue = formTitleVal;
    console.log(this.formTitleValue)
  }


  @Input()
  
  public set logoimg(logoVal : string) {
    this.logoImgValue = logoVal;
    console.log(this.logoImgValue)
  }

  @Input()
  set addlisting(listingVal : any) {
    this.listingValue = (listingVal) || '<no name set>';
    this.listingValue = listingVal;
    console.log('this.listingValue')
    console.log(this.listingValue)
  }


  @Input()
  
  set JwtToken(JwtTokenVal : any) {
    this.setJwtTokenValue = JwtTokenVal;
  }

  @Input()     // setting the server url from project

  set serverUrl(serverUrlval: any) {
    this.serverURL = (serverUrlval) || '<no name set>';
    this.serverURL = serverUrlval;
    // console.log(this.serverURL);

  }


  @Input()          // setting the url addEndpoint from project
  set addEndpoint(endpointUrlval: any) {
    this.addEndpointData = (endpointUrlval) || '<no name set>';
    this.addEndpointData = endpointUrlval;
    console.log('this.addEndpointData');
    console.log(this.addEndpointData);
    // console.log(this.addEndpointData.endpoint);
  }

  @Input()          // setting the navigate By Url from project
  set routeingUrl(routeingUrlval: any) {
    this.routeingUrlValue = (routeingUrlval) || '<no name set>';
    this.routeingUrlValue = routeingUrlval;
    // console.log(this.routeingUrlValue);
  }

  /*Using for google map start ----*/
  latitude = -28.68352;
  longitude = -147.20785;
  mapType = 'satellite';
  /*Using for google map end ----*/


  public contactUsForm: FormGroup;
  constructor(public fb: FormBuilder, public apiService: ApiService, public http: HttpClient, public router: Router, public cookieService: CookieService, public dialog: MatDialog) {
    this.contactUsForm = this.fb.group({
      name: ['', Validators.required],
      message: [''],
      // tslint:disable-next-line:max-line-length
      multipleemails: this.fb.array([this.fb.group({ emails: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])] })]),
      phones: this.fb.array([this.fb.group({ phone: ['', Validators.required] })]),
      addresses: this.fb.array([this.fb.group({ address: ['', Validators.required] })])

    });
  }


  ngOnInit() {
    this.apiService.clearServerUrl();
    setTimeout(() => {
      this.apiService.setServerUrl(this.serverURL);
    }, 50);
    // console.log(this.serverURL);


    this.apiService.clearaddEndpoint();
    setTimeout(() => {
      this.apiService.setaddEndpoint(this.addEndpointData.endpoint);
    }, 50);
    // console.log(this.addEndpointData.endpoint);

  }
  /* Multiple emails created start here*/
  get multipleemails() {
    return this.contactUsForm.get('multipleemails') as FormArray;
  }

  /* Add email field start here */
  addEmail() {
    console.log('okk');

    // tslint:disable-next-line:max-line-length
    this.multipleemails.push(this.fb.group({ emails: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])] }));
  }
  /* Add email field end here */

  /* Remove email field start here */
  removeEmail(index) {
    console.log(index);
    this.multipleemails.removeAt(index);
  }
  /* Remove email field end here */
  /* Multiple emails created end here*/


  /* Multiple addresses created start here*/

  get addresses() {
    return this.contactUsForm.get('addresses') as FormArray;
  }
  /* Add addresses field start here */
  addAddress() {
    console.log('okk');
    this.addresses.push(this.fb.group({ address: ['', Validators.required] }));
  }
  /* Add addresses field end here */

  /* Remove addresses field start here */
  removeAddress(index) {
    // console.log(index);
    this.addresses.removeAt(index);
  }
  /* Remove addresses field end here */
  /* Multiple addresses created end here*/


  /* Multiple phones created start here*/
  get phones() {
    return this.contactUsForm.get('phones') as FormArray;
  }

  /* Add addresses field start here */

  addPhone() {
    // console.log('okk');
    this.phones.push(this.fb.group({ phone: ['', Validators.required] }));
  }

  /* Add phones field end here */

  /* Remove phones field start here */
  removePhone(index) {
    // console.log(index);
    this.phones.removeAt(index);
  }
  /* Remove phones field end here */
  /* Multiple phones created end here*/




  // contactUsForm submit function start here
  contactUsFormSubmit() {


    let x: any;
    for (x in this.contactUsForm.controls) {
      this.contactUsForm.controls[x].markAsTouched();

    }
    if (this.contactUsForm.valid) {
      // console.log('ok');

      // console.log(this.contactUsForm.value);


      // All emails sites in a Array start here

      for (const key of this.contactUsForm.value.multipleemails) {
        this.email.push(key.emails);

      }
      // All emails sites in a Array end here

      // All Phones sites in a Array start here

      // console.log(this.contactUsForm.value.phones);
      for (const key of this.contactUsForm.value.phones) {
        this.phone.push(key.phone);

      }
 // All Phones sites in a Array end here

      // All addresses sites in a Array start here

      for (const key of this.contactUsForm.value.addresses) {
        this.address.push(key.address);
      }
      // All addresses sites in a Array end here

      let allData: any ={};
      allData.name = this.contactUsForm.value.name;
      allData.address = this.address;
      allData.phone = this.phone;
      allData.email = this.email;
      allData.message = this.contactUsForm.value.message; 
      // console.log(allData);
      let data: any = {
        "source": this.addEndpointData.source,
        "data": allData,
        "token": this.addEndpointData.token
      }
      console.log(data);
     
      this.apiService.addData(data).subscribe(res => {
        let result: any;
        result = res;
        if (result.status === 'success') {
          // console.log(result);
          const dialogRef = this.dialog.open(successModalComponent, {
            width: '250px',
            data: {value: result.status, Url: this.link}
          });

          this.formDirective.resetForm();
        }
      });

    }



  }

  // contactUsForm submit function end here



  inputUntouched(val: any) {
    console.log('ok----');
    this.contactUsForm.controls[val].markAsUntouched();
  }



  goToListing() {
    this.router.navigateByUrl('/' + this.routeingUrlValue);
  }

}


@Component({
  selector: 'successModal',
  template: `
  
<span style="text-align: center"  *ngIf="data.Url != ''" >
<img style="max-width: 100%; text-align: center" [src]="data.Url">
</span>

<div mat-dialog-content>
<p *ngIf="data.value.length <= 7">Thanks! your account has been successfully created</p>
<p *ngIf="data.value.length >= 8">{{data.value}}</p>

</div>
<div mat-dialog-actions>
<button mat-button [mat-dialog-close]="" cdkFocusInitial>Ok</button>
</div>

  `,

})
export class successModalComponent {

  constructor(
    public dialogRef: MatDialogRef<successModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log(data)
     }

    
  onNoClick(): void {
    this.dialogRef.close();
  }
}