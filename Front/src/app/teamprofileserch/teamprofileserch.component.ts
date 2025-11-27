import { Component } from '@angular/core';
import { TeamService } from '../service/team-service.service';
import { OffreserviceService, } from '../service/offreservice.service';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';
import { Offre } from '../admin/model/offer';

@Component({
  selector: 'app-teamprofileserch',
  templateUrl: './teamprofileserch.component.html',
  styleUrl: './teamprofileserch.component.scss'
})
export class TeamprofileserchComponent {




  offers: Offre[] = []

  idt: any
  resume: any = {};
  items1: string[] = [];
  items2: string[] = [];
  items3: string[] = [];
  items4: string[] = [];
  items5: string[] = [];
  console: any
  views: number = 0

  constructor(private TeamService: TeamService, private route: Router, private conctService: ConnectionService) { }

  ngOnInit(): void {


    if (typeof localStorage !== 'undefined') {
      const id = localStorage.getItem("idt");
      if (id) {
        const view = {

          user: Number(this.conctService.getUserAuth())
        }
        this.TeamService.view(Number(id), view).subscribe(respense => {
          console.log(respense)
        })
        this.TeamService.getTeamById(Number(id)).subscribe(
          data => {
            this.views = data.view.length

            this.offers = data.offres
            console.log(this.offers)
            this.console = data.platform
            localStorage.setItem("idst", String(data.id))
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

  show(id: number) {




    localStorage.setItem("idsp", String(id))
    this.route.navigate(['/profil_offre'])





  }








}
