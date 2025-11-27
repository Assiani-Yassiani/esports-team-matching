import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../service/admin-service.service';
import { ConnectionService } from '../service/connection.service';
import { ResumeService } from '../service/resume-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  resumes: any[] = [];
  teams: any[] = [];
  multigamings: any[] = [];

  constructor(
    private adminService: AdminServiceService,
    private router: Router, private conctService: ConnectionService, private resumeService: ResumeService
  ) { }

  ngOnInit(): void {
    console.log("ttt", Number(this.conctService.getUserAuth()))
    const id = Number(this.conctService.getUserAuth())



    this.adminService.getMultiGamingById(id).subscribe(data => {
      console.log(data);
      this.resumes = data.resumes || [];
      this.teams = data.teams || [];
      this.multigamings = data.multiGamings || [];
    }, error => {
      console.error('Error fetching data', error);
      this.resumes = [];
      this.teams = [];
      this.multigamings = [];
    });
  }

  resumefunc(idr: number) {
    localStorage.setItem("idr", idr.toString());
    console.log(idr);
    this.router.navigate(['/resume_recrutement']);
  }

  teamfunc(idt: number) {
    localStorage.setItem("idt", idt.toString());
    this.router.navigate(['/team-recrutement']);
  }

  multifunc(idt: number) {
    localStorage.setItem("idm", idt.toString());
    this.router.navigate(['/multiprifil']);
  }

  actif(resume: any) {
    resume.actif = !resume.actif

    console.log(resume)
    this.resumeService.actif(resume).subscribe(repense => {

      console.log(repense)
    })


  }
}
