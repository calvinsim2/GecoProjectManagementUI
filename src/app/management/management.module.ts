import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { IndProjectComponent } from './ind-project/ind-project.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { AllUserComponent } from './all-user/all-user.component';
import { IndUserComponent } from './ind-user/ind-user.component';
import { RoleComponent } from './role/role.component';
import { ClientComponent } from './client/client.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [
    ManagementComponent,
    DashboardComponent,
    AllProjectsComponent,
    IndProjectComponent,
    MyProjectsComponent,
    AllUserComponent,
    IndUserComponent,
    RoleComponent,
    ClientComponent,
    TeamComponent,
  ],
  imports: [CommonModule, ManagementRoutingModule, ReactiveFormsModule],
})
export class ManagementModule {}
