// import { HttpClient } from '@angular/common/http';
import { Component, DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { userListComponent } from '..';
// import { SocketService } from 'src/app/core/services/socket.service';
// import { EditService } from 'src/app/core/services/edit.service';
import { DataService } from 'src/app/core/services/data.service';
import { GridModule } from '@progress/kendo-angular-grid';
import { UploadsModule } from "@progress/kendo-angular-upload";
import { HttpClientModule } from '@angular/common/http';
import { Apollo, gql } from "apollo-angular";


import { NotificationService } from "@progress/kendo-angular-notification";
import { SocketService } from 'src/app/core/services/socket.service';
import { Student } from 'src/app/core/models/Student';
import { By } from '@angular/platform-browser';


describe('userListComponent', () => {



  let component: userListComponent;
  let fixture: ComponentFixture<userListComponent>;
  let de: DebugElement

  let dataService: DataService

  let socketService: SocketService;
  let notificationSrvice: jasmine.SpyObj<NotificationService>;

  let apolloService: jasmine.SpyObj<Apollo>
  // let apolloService: Apollo


  beforeEach(waitForAsync(() => {
    const notificationSpy = jasmine.createSpyObj('notificationSrvice', ['getValue']);

    const apolloSpy = jasmine.createSpyObj('apolloService', ['getValue']);
    // const dataSpy = jasmine.createSpyObj('dataService', ['getValue']);


    TestBed.configureTestingModule({
      declarations: [userListComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        GridModule,
        UploadsModule,

      ],

      providers: [
        // Apollo,
        DataService,
        { provide: Apollo, useValue: apolloSpy },
        SocketService,
        { provide: NotificationService, useValue: notificationSpy },
      ]
      ,
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(userListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    socketService = TestBed.inject(SocketService);
    notificationSrvice = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    dataService = TestBed.inject(DataService);
    apolloService = TestBed.inject(Apollo) as jasmine.SpyObj<Apollo>;


    // component.ngOnInit();


    fixture.detectChanges();

  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should get birthday and return age', () => {
    let birthday = new Date()

    component.calculateAge(birthday)

    // component.calculateAge(birthday);

    expect(component.calculateAge).toHaveBeenCalled

  });
  // it('should remove student', () => {

  //   let birthday = new Date('07/07/1991')
  //   let payload: Student = {
  //     id: 'student_id',
  //     name: 'udara',
  //     age: 30,
  //     dob: birthday,
  //     email: 'udara@123'
  //   }

  //   expect(dataService.deleteStudent(payload)).toContain('id')


  // });

});

