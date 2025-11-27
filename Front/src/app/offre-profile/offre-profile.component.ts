import { Component, OnInit } from '@angular/core';
import { TeamService } from '../service/team-service.service';
import { Offre, OffreserviceService } from '../service/offreservice.service';


@Component({
  selector: 'app-offre-profile',
  templateUrl: './offre-profile.component.html',
  styleUrl: './offre-profile.component.scss'
})
export class OffreProfileComponent implements OnInit {
  constructor(private TeamService: TeamService, private offreService: OffreserviceService,) { }
  resume: any = {};



  offer!: Offre

  ngOnInit(): void {


    if (typeof localStorage !== 'undefined') {
      this.loadOffre(Number(localStorage.getItem("idos")))
      const id = localStorage.getItem("idt");
      if (id) {
        this.TeamService.getTeamById(Number(id)).subscribe(
          data => {
            console.log(data)
            this.resume = data;

          },
          error => console.error('Error fetching resume', error)
        );
      }
    }
  }

  loadOffre(id: number): void {
    this.offreService.getOffreById(id).subscribe(
      (offre: Offre) => {
        this.offer = offre
      },
      error => {
        console.error('Error fetching offre', error);

      }
    );
  }

}
