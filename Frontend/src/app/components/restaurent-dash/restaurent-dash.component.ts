import { compileNgModule } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Restaurent } from 'src/app/shared/models/restaurent';
import { ApiService } from 'src/app/shared/services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup;
  restaurentModelObj: Restaurent = new Restaurent;
  restaurentData: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  filterTerm!: any;
  loggedInUser!: Observable<any>;

  page: number = 1;
  count: number = 0;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private toast: NgToastService, private confirmService: NgConfirmService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })

    this.getData();

    this.api.getLoggedInUser().subscribe(data => {
      // console.log(data)
      this.loggedInUser = data.name;
    })

    // console.log(this.loggedInUser)
  }

  clickAddResto(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  addResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    if(this.formValue.value.name !== '' && this.formValue.value.email !== '' && this.formValue.value.mobile !== '' && this.formValue.value.address !== '' && this.formValue.value.services !== ''){

      this.api.postRestaurent(this.restaurentModelObj).subscribe(
        res => {
          console.log(res);
            // alert("Record Added Successfully!");
            this.toast.success({detail: "Success Message", summary: `Record Added Successfully!`, duration: 2000});
            this.formValue.reset();
            this.getData();
            document.getElementById('btnClose')?.click();
        },
        err => {
          // alert("Something went wrong!");
          this.toast.error({detail: "Error Message", summary: `OOPs, Somthing went wrong!`, duration: 2000});
        })
      }
      else{
        // alert("Enter complete details");
        this.toast.warning({detail: "Warning Message", summary: `Enter Complete Details!`, duration: 2000});
      }
    }


  getData(){
    this.api.getRestaurent().subscribe(data => {
      this.restaurentData = data;
      // console.log(this.restaurentData);
    })
  }

  deleteRecord(data: any){
    this.confirmService.showConfirm("Are you sure want to Delete?",
    () => {
      //your logic if Yes clicked
      // console.log(data);
      this.api.deleteRestaurent(data._id).subscribe(res => {
        // alert(`${data.name} Restaurent Deleted!`);
        this.toast.success({detail: "Success Message", summary: `${data.name} Restaurant Deleted!`, duration: 3000});
        this.getData();
      })
    },
    () => {
      //your logic if No clicked
      // this.toast.info({detail: "Info", summary: `Not Deleted`, duration: 2000});
    })



  }

  onEdit(data: any){
    this.showAdd = false;
    this.showUpdate = true;

    this.restaurentModelObj.id = data._id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurent(this.restaurentModelObj, this.restaurentModelObj.id).subscribe(res => {
      // alert("Restaurent updated successfully!");
      this.toast.success({detail: "Success Message", summary: `Restaurant Updated!`, duration: 2000});
      this.getData();
      document.getElementById('btnClose')?.click();
    })
  }

  logOutToaster(){
      localStorage.removeItem('access_token');
      this.toast.success({detail: "Logout Message", summary: `Logged out Successfully!`, duration: 2000});
  }


}
