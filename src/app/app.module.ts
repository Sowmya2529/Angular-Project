import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { NavbardesktopComponent } from './navbardesktop/navbardesktop.component';
import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { MatExpansionModule } from '@angular/material/expansion';
import { WelcomeselectemailComponent } from './welcomeselectemail/welcomeselectemail.component';
import { WelcomedifferentemailComponent } from './welcomedifferentemail/welcomedifferentemail.component';
import { SuccesspageComponent } from './successpage/successpage.component';
import { CreatepasswordComponent } from './createpassword/createpassword.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';
import { AvatarModule } from 'ngx-avatar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ApiService } from './config/api.service';
import { ConfigService } from './config/config.service';
import { SharedService } from './shared/shared.service';
import { AppInterceptor } from './app.interceptor';
import { LoginComponent } from './login/login.component';
import { JwtHelperService } from'@auth0/angular-jwt';
import { ClickOutsideModule } from 'ng-click-outside';
@NgModule({
  declarations: [
    AppComponent,
    HomescreenComponent,
    NavbarComponent,
    ProjectsComponent,
    TasksComponent,
    CalendarComponent,
    DashboardComponent,
    ProjectdetailsComponent,
    NavbardesktopComponent,
    TaskdetailsComponent,

    WelcomeselectemailComponent,
    WelcomedifferentemailComponent,
    SuccesspageComponent,
    CreatepasswordComponent,
    ProfileComponent,
    LoginComponent,
   
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    DeviceDetectorModule,
    MatExpansionModule,
    MatDialogModule,
    AvatarModule,
    CalendarModule,
    MatSnackBarModule,
    ClickOutsideModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [ApiService,
    ConfigService,
    SharedService,
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
      },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
