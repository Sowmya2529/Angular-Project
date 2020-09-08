import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { NavbardesktopComponent } from './navbardesktop/navbardesktop.component';
import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
import { CreatepasswordComponent } from './createpassword/createpassword.component';
import { WelcomeselectemailComponent } from './welcomeselectemail/welcomeselectemail.component';
import { WelcomedifferentemailComponent } from './welcomedifferentemail/welcomedifferentemail.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomescreenComponent },
  { path: 'sidenav', component: NavbarComponent },
  { path: 'project', component: ProjectsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'project/:projectId', component: ProjectdetailsComponent },
  { path: 'navbardesktop', component: NavbardesktopComponent },
  { path: 'taskdetails', component: TaskdetailsComponent },
  { path: 'createPassword', component: CreatepasswordComponent },
  { path: 'project/:projectId/task/:taskId', component: TaskdetailsComponent },
  { path: 'welcome', component: WelcomeselectemailComponent },
  { path: 'differentemail', component: WelcomedifferentemailComponent },
  { path: 'profile', component: ProfileComponent },

  //{ path: '', redirectTo: '/project', pathMatch: 'full' },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  // { path: '', redirectTo: '/calendar', pathMatch: 'full' },
  // { path: '', redirectTo: '/projectdetails', pathMatch: 'full' },
  // {
  //   path: '',
  //   redirectTo: '/dashboard',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
