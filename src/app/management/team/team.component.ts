import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  allTeamList!: any;
  public teamForm!: FormGroup;
  isDeletingTeam!: boolean;
  isEditingTeam!: boolean;
  currentSelectedTeamIDtoDelete!: any;
  currentSelectedTeamIDtoEdit!: any;
  currentSelectedEditingTeamName!: any;

  constructor(
    private authService: AuthService,
    private teamService: TeamService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.teamForm = this.formBuilder.group({
      TeamID: [0],
      TeamName: ['', Validators.required],
    });
    this.getAllTeam();
  }

  getAllTeam() {
    this.teamService.getAllTeams().subscribe({
      next: (res) => {
        this.allTeamList = res.result.length < 1 ? [] : res.result;
      },
      error: (err) => {
        alert('Cannot Fetch teams, try again later');
      },
    });
  }

  onCreateTeam() {
    this.teamForm.value.TeamID = 0;
    this.isDeletingTeam = false;
    this.isEditingTeam = false;
    this.teamForm.reset();
  }

  createTeam() {
    this.teamService.addTeam(this.teamForm.value).subscribe({
      next: (res) => {
        alert('New Team Added!');
        this.teamForm.reset();
        document.getElementById('close-emp-comment')?.click();
        this.getAllTeam();
      },
      error: (err) => {
        alert('An error occured, try again later');
      },
    });
  }

  onEditTeam(id: any, name: any) {
    this.isEditingTeam = true;
    this.isDeletingTeam = false;
    this.currentSelectedTeamIDtoEdit = id;
    this.currentSelectedEditingTeamName = name;
    this.teamForm.setValue({
      TeamID: this.currentSelectedTeamIDtoEdit,
      TeamName: this.currentSelectedEditingTeamName,
    });
  }

  editTeam() {
    this.teamService.updateTeam(this.teamForm.value).subscribe({
      next: (res) => {
        alert('Team Edited!');
        this.teamForm.reset();
        document.getElementById('close-emp-comment')?.click();
        this.getAllTeam();
      },
      error: (err) => {
        alert('Error occured, try again later');
      },
    });
  }

  onDeleteTeam(id: any) {
    this.isDeletingTeam = true;
    this.isEditingTeam = false;
    this.currentSelectedTeamIDtoDelete = id;
    this.teamForm.reset();
  }

  deleteTeam() {
    this.teamService.deleteTeam(this.currentSelectedTeamIDtoDelete).subscribe({
      next: (res) => {
        alert('Team has been deleted');
        document.getElementById('close-emp-comment')?.click();
        this.currentSelectedTeamIDtoDelete = null;
        this.getAllTeam();
      },
      error: (err) => {
        alert('Error Deleting, try again later.');
      },
    });
  }
}
