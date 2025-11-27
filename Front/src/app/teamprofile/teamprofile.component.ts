import { Component } from '@angular/core';
import { ResumeService } from '../service/resume-service.service';
import { TeamService } from '../service/team-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teamprofile',
  templateUrl: './teamprofile.component.html',
  styleUrl: './teamprofile.component.scss'
})
export class TeamprofileComponent {


  resume: any = {};
  items1: string[] = [];
  items2: string[] = [];
  items3: string[] = [];
  items4: string[] = [];
  items5: string[] = [];

  constructor(private TeamService: TeamService, private route: Router) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const id = localStorage.getItem("idt");
      if (id) {
        this.TeamService.getTeamById(Number(id)).subscribe(
          data => {
            console.log(data)
            this.resume = data;
            this.items1 = this.stringToArray(this.resume.items1);
            this.items2 = this.stringToArray(this.resume.items2);
            this.items3 = this.stringToArray(this.resume.items3);
            this.items4 = this.stringToArray(this.resume.items4);
            this.items5 = this.stringToArray(this.resume.items5);
          },
          error => console.error('Error fetching resume', error)
        );
      }
    }
  }

  stringToArray(str: string): string[] {
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed)) {
        return parsed;
      } else {
        throw new Error('Parsed result is not an array');
      }
    } catch (error) {
      console.error('Invalid string format', error);
      return [];
    }
  }


  delete(id: number) {
    this.TeamService.deleteTeam(id).subscribe(respense => {

      console.log(respense)
      this.route.navigate(['admin'])

    })
  }

  ngOnDestroy(): void {

  }


}
