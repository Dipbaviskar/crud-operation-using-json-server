import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { APIService } from '../Shared/api.service';
import { employeeModel } from './employee-dashboard.module';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
   formvalue !:FormGroup;
  employeeModelObj : employeeModel =new employeeModel();
  employeeData ! :any;
  showadd !:boolean;
  showUpdate!:boolean;
  constructor( private formbuilder:FormBuilder,
    private api:APIService) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      id:[''],
      firstname : [''],
      lastname : [''],
      email : [''],
      contactno : [''],
      salary : [''],
    })
    this.getEmployee();
  }
   
  PostEmployeeDetails(){
    this.employeeModelObj.firstname = this.formvalue.value.firstname;
    this.employeeModelObj.lastname = this.formvalue.value.lastname;
    this.employeeModelObj.email = this.formvalue.value.email;
    this.employeeModelObj.contactno = this.formvalue.value.contactno;
    this.employeeModelObj.salary = this.formvalue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe({next:res=>{
      console.log(res);
      alert("Employee added Successfully");
      // method to cancel input form alert
      let ref = document.getElementById('cancel')
      ref?.click();
      // method to reset form
      this.formvalue.reset();
      this.getEmployee();
    },
    error:(err: any)=>{ alert("Something went wrong")
    }
  })
  }

  getEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData =res
    })
  }
  deleteEmployee(row:any){
    this.api.DeleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee deleted")
      this.getEmployee();
    })

  }
  OnEdit(row:any){
    this.showadd = false;
    this.showUpdate = true;
    this.employeeModelObj.id= row.id;
    this.formvalue.controls['firstname'].setValue(row.firstname)
    this.formvalue.controls['lastname'].setValue(row.lastname)
    this.formvalue.controls['email'].setValue(row.email)
    this.formvalue.controls['contactno'].setValue(row.contactno)
    this.formvalue.controls['salary'].setValue(row.salary)
  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstname = this.formvalue.value.firstname;
    this.employeeModelObj.lastname = this.formvalue.value.lastname;
    this.employeeModelObj.email = this.formvalue.value.email;
    this.employeeModelObj.contactno = this.formvalue.value.contactno;
    this.employeeModelObj.salary = this.formvalue.value.salary;
    this.api.UpdateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe(res=>{
      alert("updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      // method to reset form
      this.formvalue.reset();
      this.getEmployee();
    })
  }

  clickAddEmployee(){
    this.formvalue.reset();
    this.showadd = true;
    this.showUpdate = false;
  }
}
