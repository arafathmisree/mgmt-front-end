import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Student } from '../../../core/models/Student';
import { map } from 'rxjs/operators';
import { EditService } from '../../../core/services/edit.service';
import { FileRestrictions } from "@progress/kendo-angular-upload";
import { DataService } from '../../../core/services/data.service';



@Component({
    selector: 'my-app',
    templateUrl: './userList.component.html',
    styleUrls: ["./userList.component.scss"],

})


export class userListComponent implements OnInit {


    public myForm: FormGroup | undefined;
    public fileUploadForm: FormGroup | undefined;
    fileInputLabel: string | undefined;


    public srtdents: any

    public value: Date = new Date(2000, 2, 10);
    public view!: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };


    private editService: EditService;
    private editedRowIndex: number | undefined;
    private editedProduct: Student | undefined;
    // users: any[] | undefined;

    uploadSaveUrl = "http://localhost:6000/api/upload"; // should represent an actual API endpoint
    uploadRemoveUrl = "removeUrl"; // should represent an actual API endpoint

    myRestrictions: FileRestrictions = {
        allowedExtensions: [".xls", ".xlsx"],
    };

    public users = [
        {
            userName: "Udara",
            dob: "1991-05-01",
            age: "31",
            email: "ula.6364@gmail.com"
        },
        {
            userName: "Udara",
            dob: "1991-05-01",
            age: "31",
            email: "ula.6364@gmail.com"
        },
        {
            userName: "Udara",
            dob: "1991-05-01",
            age: "31",
            email: "ula.6364@gmail.com"
        },
        {
            userName: "Udara",
            dob: "1991-05-01",
            age: "31",
            email: "ula.6364@gmail.com"
        }
    ]


    constructor(@Inject(EditService) editServiceFactory: any, private dataService: DataService) {
        this.editService = editServiceFactory();
    }

    public ngOnInit(): void {
        this.view = this.editService.pipe(map(data => process(data, this.gridState)));
        this.editService.read();
        console.log(this.view);
        this.dataService.getAllStudents();



    }

    public onStateChange(state: State) {
        this.gridState = state;

        this.editService.read();
    }

    public addHandler({ sender }: any, formInstance: any) {

        formInstance.reset();
        this.closeEditor(sender);
        this.myForm = new FormGroup({
            userName: new FormControl(),
            dob: new FormControl(),
            age: new FormControl(),
            email: new FormControl(),
        });

        sender.addRow(this.myForm);

        // sender.addRow(new Product());
    }

    public editHandler({ sender, rowIndex, dataItem }: any) {



        this.myForm = new FormGroup({
            userName: new FormControl(dataItem.userName),
            dob: new FormControl(dataItem.dob),
            age: new FormControl(dataItem.age),
            email: new FormControl(dataItem.email),
        });
        console.log('myForm', this.myForm);

        this.closeEditor(sender);

        this.editedRowIndex = rowIndex;
        this.editedProduct = Object.assign({}, dataItem);

        sender.editRow(rowIndex, this.myForm);

        // sender.editRow(rowIndex);
    }

    public cancelHandler({ sender, rowIndex }: any) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({ sender, rowIndex, dataItem, isNew }: any) {
        this.editService.save(dataItem, isNew);

        sender.closeRow(rowIndex);

        this.editedRowIndex = undefined;
        this.editedProduct = undefined;
    }

    public removeHandler({ dataItem }: any) {
        this.editService.remove(dataItem);
    }

    private closeEditor(grid: any, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editService.resetItem(this.editedProduct);
        this.editedRowIndex = undefined;
        this.editedProduct = undefined;
    }
}
