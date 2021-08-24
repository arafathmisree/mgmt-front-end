import { NgModule } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { StudentRoutingModule } from './student.routing.module';
import { StudentComponent , userListComponent  } from './pages';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { EditService } from '../core/services/edit.service';
 
@NgModule({
  declarations: [StudentComponent,userListComponent],
  imports: [
    StudentRoutingModule,
    FormsModule,
    GridModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp)
    }
  ],
})
export class StudnetModule { }