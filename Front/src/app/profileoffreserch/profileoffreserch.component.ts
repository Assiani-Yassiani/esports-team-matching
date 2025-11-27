
import { TeamService } from '../service/team-service.service';
import { Offre, OffreserviceService } from '../service/offreservice.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';

@Component({
  selector: 'app-profileoffreserch',
  templateUrl: './profileoffreserch.component.html',
  styleUrl: './profileoffreserch.component.scss'
})
export class ProfileoffreserchComponent {

  constructor(private TeamService: TeamService, private offreService: OffreserviceService, private appService: AppService, private route: Router, private conctService: ConnectionService) { }
  resume: any = {};
  idr: any

  game: any
  platform: any
  offer: any = {}
  idt!: any
  ido!: any

  nameteam!: any;
  nameResume!: any;

  ngOnInit(): void {


    if (typeof localStorage !== 'undefined') {
      this.loadOffre(Number(localStorage.getItem("idsp")))
      const id = localStorage.getItem("idst");
      if (id) {
        this.TeamService.getTeamById(Number(id)).subscribe(
          data => {
            console.log(data)
            this.resume = data;
            this.game = data.game
            this.platform = data.platform
            this.nameteam = data.comments


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
  isModalVisible: boolean = false;
  isModalVisible2: boolean = false;


  showModal() {
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }



  showModal2() {
    this.isModalVisible2 = true;
  }

  hideModal2() {
    this.isModalVisible2 = false;
  }


  app() {
    const app = {
      game: this.game,
      platform: this.platform

    }
    const userId = Number(Number(this.conctService.getUserAuth()))


    this.appService.findResumeByGameAndPlatform(userId, app).subscribe(
      response => {

        if (response != undefined) {
          this.idr = response.id
          this.idt = Number(localStorage.getItem("idst"))
          this.ido = Number(localStorage.getItem("idsp"))
          this.nameResume = response.comments

          console.log('Resume found', response);
          this.showModal2()
        } else {
          console.log('No matching resume found');
          this.showModal()


        }
      },
      error => {
        console.error('Error finding resume', error);
      }
    );
  }

}
