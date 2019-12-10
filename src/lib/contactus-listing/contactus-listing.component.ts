import {Component, Input, OnInit, Inject} from '@angular/core';
import {ApiService} from '../api.service';
import {HttpClient} from '@angular/common/http';
import { LoadingComponent } from '../loading/loading.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'lib-contactus-listing',
  templateUrl: './contactus-listing.component.html',
  styleUrls: ['./contactus-listing.component.css']
})
export class ContactusListingComponent implements OnInit {

  public formTitleValue: any;
  public contactUsAllData: any = [];
  contactUsAllDataHeaderSkipValue: any = [];
  contactUsAllDataModifyHeaderValue: any = {};

  // tslint:disable-next-line:variable-name
  contactUsAllData_collection: any = 'events';

  public serverURL: any = '';      // url variable to fetch the add availability form page
  public addEndpointData: any = '';
  public getDataEndpointData: any = '';
  public updateendpointData: any = '';
  public deleteendpointData: any = '';


  @Input()
  
  public set formTitle(formTitleVal : string) {
    this.formTitleValue = formTitleVal;
    console.log(this.formTitleValue)
  }

  @Input()     // setting the server url from project

  set serverUrl(serverUrlval: any) {
    this.serverURL = (serverUrlval) || '<no name set>';
    this.serverURL = serverUrlval;
    console.log(this.serverURL);

  }
  @Input()     // setting the server url from project

  set contactUsAllDataHeader_skip(contactUsAllDataHeaderSkipval: any) {
    this.contactUsAllDataHeaderSkipValue = (contactUsAllDataHeaderSkipval) || '<no name set>';
    this.contactUsAllDataHeaderSkipValue = contactUsAllDataHeaderSkipval;
    console.log(this.contactUsAllDataHeaderSkipValue);

  }
  @Input()     // setting the server url from project

  set contactUsAllDataModify_header(contactUsAllDataModifyHeaderval: any) {
    this.contactUsAllDataModifyHeaderValue = (contactUsAllDataModifyHeaderval) || '<no name set>';
    this.contactUsAllDataModifyHeaderValue = contactUsAllDataModifyHeaderval;
    console.log('this.contactUsAllDataModifyHeaderValue');
    console.log(this.contactUsAllDataModifyHeaderValue);

  }

  @Input()          // setting the server url from project
  set addEndpoint(endpointUrlval: any) {
    this.addEndpointData = (endpointUrlval) || '<no name set>';
    this.addEndpointData = endpointUrlval;
    // console.log('this.addEndpointData');
    // console.log(this.addEndpointData)
  }

  @Input()          // setting the server url from project
  set getDataEndpoint(endpointUrlval: any) {
    this.getDataEndpointData = (endpointUrlval) || '<no name set>';
    this.getDataEndpointData = endpointUrlval;
    console.log('this.getDataEndpointData');
    console.log(this.getDataEndpointData);
  }

  @Input()          // This is a Update Url
  set updateendpoint(updateendpointval: any) {
    this.updateendpointData = (updateendpointval) || '<no name set>';
    this.updateendpointData = updateendpointval;
    console.log('this.updateendpointData');
    console.log(this.updateendpointData);
  }

  @Input()          // this is a Delete Url
  set deleteendpoint(deleteendpointval: any) {
    this.deleteendpointData = (deleteendpointval) || '<no name set>';
    this.deleteendpointData = deleteendpointval;
    console.log('this.deleteendpointData');
    console.log(this.deleteendpointData);
  }

  


  constructor(public apiService: ApiService, public http: HttpClient,
     public loadingComponent: LoadingComponent, public dialog: MatDialog
     ) { }

  ngOnInit() {
    this.apiService.clearServerUrl();
    setTimeout(() => {
      this.apiService.setServerUrl(this.serverURL);
    }, 50);
    console.log(this.serverURL);

    this.apiService.cleargetdataEndpoint();
    setTimeout(() => {
      this.apiService.setgetdataEndpoint(this.getDataEndpointData.endpoint);
    }, 50);



    this.apiService.clearaddEndpoint();
    setTimeout(() => {
      this.apiService.setaddEndpoint(this.addEndpointData);
    }, 50);
    console.log(this.addEndpointData);


    setTimeout(() => {
      this.getAllData();
    }, 100);
    // setInterval(()=> {
    //   this.openDialog(); },4000); 
      // setInterval(() => {this.openDialog(); },4000);

  }
  getAllData() {
    this.loadingComponent.loading = false;
    let data: any;
    data = {
      "source" : this.getDataEndpointData.source
    };
    this.apiService.getData(data).subscribe(response => {
      this.loadingComponent.loading = true;
      let result: any = [];

      result = response;
      if (result.resc != 0) {
      console.log('result');
      console.log(result);
      this.contactUsAllData = result.res;
      } else 
      console.log('oppes');
    });
  }


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(newsTitleDialog, {
  //     width: '250px',
  //     // data: {name: this.name, animal: this.animal}
  //   });
  // }
}




// export interface DialogData {
//   email: string;
//   name: string;
//   company: string;
//   phone: number;
// }



// @Component({
//   selector: 'newsTitle',
//   templateUrl: 'newsTitle.html',
// })
// export class newsTitleDialog {
//   public newsTitleForm: FormGroup;
//   constructor(
//     public dialogRef: MatDialogRef<newsTitleDialog>,
//     @Inject(MAT_DIALOG_DATA) 
//     // public data: DialogData,
//     public fb: FormBuilder) {
//       this.newsTitleForm = this.fb.group({
//         fullname:['',Validators.required],
//         phone:['',Validators.required],
//         company:['',Validators.required],
//         email: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])]
//       })
//     }

//   // onNoClick(): void {
//   //   this.dialogRef.close();
//   // }


//   newsTitleFormSubmit() {
//     for (const key in this.newsTitleForm.controls) {
//       this.newsTitleForm.controls[key].markAsTouched();
//     }
//     if (this.newsTitleForm.valid) {
//       console.log(this.newsTitleForm.value);
//       this.dialogRef.close();
//     }
   
//   }

//   inputUntouched(val: any) {
//     console.log('ok----');
//     this.newsTitleForm.controls[val].markAsUntouched();
//   }




// }