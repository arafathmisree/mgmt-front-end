import { Component, OnInit } from "@angular/core";
import { observable, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
// import { HttpClient } from "@angular/common/http";
import { Student } from "../models/Student";
import { shareReplay, pluck } from 'rxjs/operators';



export const DELETE_STUDENT = gql`
mutation removeStudent($id: String!) {
  removeStudent(id: $id) {
    id
  }
}
`;
export const GET_ALL_STUDENTS = gql`
{
  getAllStudents {
    id
    name
    dob
    email
    age
  }
}
`;
export const UPDATE_STUDENT = gql`
mutation updateStudent($student: UpdateStudentInput!) {
  updateStudent(studentInput: $student) {
    id
  }
}
`;


@Injectable()
export class DataService implements OnInit {

  public students: Student[] = []



  constructor(private apolloService: Apollo) { }

  ngOnInit() {
    console.log("data");
  }

  getAllStudents() {
    return this.apolloService
      .watchQuery({
        query: GET_ALL_STUDENTS
      })
      .valueChanges.pipe(shareReplay(1));

    // .valueChanges.subscribe(({ data, loading }) => {
    //   console.log(loading)
    //   console.log(data)

    // })
  }
  deleteStudent(payLoad: Student) {
    let _data;
    console.log("");

    let studentId = payLoad.id;



    return this.apolloService
      .mutate({
        mutation: DELETE_STUDENT,
        variables: {
          id: studentId,
        },
      }).pipe(shareReplay(1));
    // .subscribe(
    //   ({ data }) => {
    //     if (data) {
    //       // this.getAllStudents();
    //     }
    //     console.log("got data", data);
    //   },
    //   (error) => {
    //     console.log("there was an error sending the query", error);
    //   }
    // );
  }

  updateStudent(payLoad: Student) {
    let studentData = payLoad;
    console.log("ll");



    return this.apolloService
      .mutate({
        mutation: UPDATE_STUDENT,
        variables: {
          student: studentData,
        },
      }).pipe(shareReplay(1));
  }

  // uploadSelected(file: any) {
  //   var formdata = new FormData();
  //   formdata.append("file", file, "Data.xlsx");

  //   this.http
  //     .post("http://localhost:7000/api/upload", formdata)
  //     .subscribe((response) => {
  //       console.log("response received is ", response);
  //     });
  // }
}
