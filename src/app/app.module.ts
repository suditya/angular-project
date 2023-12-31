import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
// import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, ToastrModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
