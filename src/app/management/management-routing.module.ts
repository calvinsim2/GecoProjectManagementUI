import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagementComponent } from './management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { IndProjectComponent } from './ind-project/ind-project.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { AllUserComponent } from './all-user/all-user.component';
import { IndUserComponent } from './ind-user/ind-user.component';
import { RoleComponent } from './role/role.component';
import { TeamComponent } from './team/team.component';
import { ClientComponent } from './client/client.component';
// import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: AllProjectsComponent },
      { path: 'projects/:id', component: IndProjectComponent },
      { path: 'myprojects/:id', component: MyProjectsComponent },
      { path: 'users', component: AllUserComponent },
      { path: 'users/:id', component: IndUserComponent },
      { path: 'roles', component: RoleComponent },
      { path: 'teams', component: TeamComponent },
      { path: 'client', component: ClientComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
