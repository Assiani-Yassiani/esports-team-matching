import { Component, OnDestroy } from '@angular/core';
import { ResumeService } from '../service/resume-service.service';
import { ConnectionService } from '../service/connection.service';
import { Route } from 'react-router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
  resume: any = {};
  items1: string[] = [];
  items2: string[] = [];
  items3: string[] = [];

  constructor(private resumeService: ResumeService, private conctService: ConnectionService, private route: Router) { }

  ngOnInit(): void {






    if (typeof localStorage !== 'undefined') {
      const id = localStorage.getItem("idr");
      if (id) {


        this.resumeService.getResumeById(Number(id)).subscribe(
          data => {
            this.resume = data;
            this.items1 = this.stringToArray(this.resume.items1);
            this.items2 = this.stringToArray(this.resume.items2);
            this.items3 = this.stringToArray(this.resume.items3);
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

    this.resumeService.deleteResume(id).subscribe(respense => {


      console.log(respense)
      this.route.navigate(['admin'])
    })

  }
}





