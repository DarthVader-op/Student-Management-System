import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { studentdata } from '../shared/student.model';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  //hide
  showadd!: boolean;
  showupdate!: boolean;
  studentmodelobj: studentdata = new studentdata
  formvalue!: FormGroup
  allstudentdata: any;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formBuilder.group({
      Name: ['', Validators.required],
      Regno: ['', Validators.required],
      Branch: ['', Validators.required],
      Email: ['', Validators.required],
      Mobile: ['', Validators.required],
    })
    this.getdata()
  }
  add() {
    this.showadd = true;
    this.showupdate = false;
  }
  //to hide on edit button
  edit(data: any) {
    this.showadd = false;
    this.showupdate = true;
    this.studentmodelobj.id = data.id;
    this.formvalue.controls['Name'].setValue(data.Name)
    this.formvalue.controls['Regno'].setValue(data.Regno)
    this.formvalue.controls['Branch'].setValue(data.Branch)
    this.formvalue.controls['Email'].setValue(data.Email)
    this.formvalue.controls['Mobile'].setValue(data.Mobile)

  }
  //update on edit 
  update() {
    this.studentmodelobj.Name = this.formvalue.value.Name;
    this.studentmodelobj.Regno = this.formvalue.value.Regno;
    this.studentmodelobj.Branch = this.formvalue.value.Branch;
    this.studentmodelobj.Email = this.formvalue.value.Email;
    this.studentmodelobj.Mobile = this.formvalue.value.Mobile;

    this.api.updatestudent(this.studentmodelobj, this.studentmodelobj.id).subscribe(res => {
      this.formvalue.reset();
      this.getdata();
      alert("Record updated sucessfully");
    },
      _err => {
    alert("something went wrong !!!");
      })
  }

  addstudent() {
    this.studentmodelobj.Name = this.formvalue.value.Name;
    this.studentmodelobj.Regno = this.formvalue.value.Regno;
    this.studentmodelobj.Branch = this.formvalue.value.Branch;
    this.studentmodelobj.Email = this.formvalue.value.Email;
    this.studentmodelobj.Mobile = this.formvalue.value.Mobile;

    this.api.poststudent(this.studentmodelobj).subscribe(res => {
      console.log(res);
      this.formvalue.reset();
      this.getdata();
      alert("Record added sucessfully");
    },
  _err => {
        alert("something went wrong!!!");
      })
  }


  //getdata
  getdata() {
    this.api.getstudent()
      .subscribe(res => {
        this.allstudentdata = res;
      })
  }

  //delete

  deletestudent(data: any) {
    if (confirm('Are you sure to delete?'))
      this.api.deletestudent(data.id)
        .subscribe(res => {
          alert("Record deleted successfully");
          this.getdata();
        })
  }

}

