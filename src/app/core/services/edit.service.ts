import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { Apollo, gql } from 'apollo-angular';


import { tap, map } from 'rxjs/operators';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class EditService extends BehaviorSubject<any[]> {
    constructor(private http: HttpClient) {
        super([]);


    }
    private dataURL = './data';

    private data: any[] = [];


    public read() {
        if (this.data.length) {
            return super.next(this.data);
        }

        this.fetch()
            .pipe(
                tap(data => {
                    this.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    public save(data: any, isNew?: boolean) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

        this.reset();

        this.fetch(action, data)
            .subscribe(() => this.read(), () => this.read());
    }

    public remove(data: any) {
        this.reset();

        this.fetch(REMOVE_ACTION, data)
            .subscribe(() => this.read(), () => this.read());
    }

    public resetItem(dataItem: any) {
        if (!dataItem) { return; }

        // find orignal data item
        const originalDataItem = this.data.find(item => item.email === dataItem.email);

        // revert changes
        Object.assign(originalDataItem, dataItem);

        super.next(this.data);
    }

    private reset() {
        this.data = [];
    }

    private fetch(action: string = '', data?: any): Observable<any[]> {
        return this.http
            .jsonp(`https://demos.telerik.com/kendo-ui/service/Products/${action}?${this.serializeModels(data)}`, 'callback')
            .pipe(map(res => <any[]>res));
    }

    private serializeModels(data?: any): string {
        console.log(this.data);

        return data ? `&models=${JSON.stringify([data])}` : '';
    }

    // getUsers(): Observable<any> {
    //     // ...using get request
    //     return this.http.get(this.usersURL)
    //         // ...and calling .json() on the response to return data
    //         .pipe(
    //             tap(data =>
    //                 console.log('All: ' + JSON.stringify(data)))
    //         );
    // }

    // public read() {

    //     this.apollo
    //         .watchQuery({
    //             query: gql`
    // query getAllStudents {
    //         id,
    //         name,
    //         dob,
    //         email,
    //         age,
    //       }
    //       # {
    //       #   rates(currency: "USD") {
    //       #     currency
    //       #     rate
    //       #   }
    //       # }
    //     `,
    //         })
    //         .valueChanges.subscribe((result: any) => {
    //             // this.rates = result?.data?.rates;
    //             // this.loading = result.loading;
    //             // this.error = result.error;
    //             console.log(result);

    //         });
    //     //   client
    //     //     .query({
    //     //       query: gql`
    //     // query getAllStudents {
    //     //   id,
    //     //   name,
    //     //   dob,
    //     //   email,
    //     //   age,
    //     // }
    //     //     `,
    //     //     })
    //     //     .then((result) => console.log(result));
    // }

    // }




}
