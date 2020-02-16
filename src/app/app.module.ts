import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashModule } from './splash/splash.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { TodosModule } from './todos/todos.module';

import { GlobalErrorHandler } from './error.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SplashModule,
    LoginModule,
    RegisterModule,
    TodosModule,
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot({
      timeOut: 2000,
      theClass: 'notification',
      clickToClose: true,
      showProgressBar: true,
      preventDuplicates: true
    })
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
