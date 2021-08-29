import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class DataService implements OnInit {
  public students: Observable<any> | undefined;

  constructor(private apollo: Apollo, private http: HttpClient,) { }

  ngOnInit() {
    console.log("data");
  }

  getAllStudents() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getAllStudents {
              id
              name
              dob
              email
              age
            }
          }
        `,
      })

      .valueChanges.subscribe((result: any) => {
        this.students = result.data.getAllStudents;
        console.log(result);
        console.log('result', this.students);
      });
  }

  createStudent(payLoad: any) {

    this.apollo
      .watchQuery({
        query: gql`
      {
        mutation{
  createStudent(studentInput:{
    name: payLoad.name,
    dob: payLoad.dob,
    email:payLoad.email,
    age: payLoad.age
  }){
    id,
    name,
    dob,
    email,
    age
  }
}
    `,
      })

      .valueChanges.subscribe((result: any) => {
        console.log(result);
      });
  }

  deleteStudent(studentId: any) {

    this.apollo
      .watchQuery({
        query: gql`
      {
        mutation{
      removeStudent(id:studentId){
      id,
      name,
      dob,
      email,
      age
  }
}
      }
    `,
      })

      .valueChanges.subscribe((result: any) => {
        console.log(result);
      });

  }

  updateStudent(payLoad: any) {
    this.apollo
      .watchQuery({
        query: gql`
     mutation{
  updateStudent(studentInput:{
    id: payLoad.studentId,
    name: payLoad.name
    dob: payLoad.dob
    email:payLoad.email
    age: payLoad.age
  }){
    id,
    name,
    dob,
    email,
    age
  }
}
    `,
      })

      .valueChanges.subscribe((result: any) => {
        console.log(result);
      });

  }

  uploadFiles(formData: any) {
    this.http
      .post<any>(`http://localhost:6000/api/upload`, formData).subscribe(response => {
        console.log(response);

      }, error => {
        console.log(error);
      });
  }
}
