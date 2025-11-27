import { Component } from '@angular/core';
import { TeamService } from '../service/team-service.service';
import { OffreserviceService } from '../service/offreservice.service';
import { Router } from '@angular/router';
import moment from 'moment';
import { AppService } from '../service/app.service';
import { Offre } from '../admin/model/offer';
import { AppTeam } from '../admin/model/appTeam';
import { AppOffre } from '../admin/model/appOffer';
import { ResumeService } from '../service/resume-service.service';

@Component({
  selector: 'app-teamrecrutment',
  templateUrl: './teamrecrutment.component.html',
  styleUrl: './teamrecrutment.component.scss'
})
export class TeamrecrutmentComponent {

  link: string = ""
  resume: any = {};

  offres: Offre[] = []
  app: any[] = []
  apps: AppTeam[] = []

  items1: any = [];
  items2: any = [];
  items3: any = [];

  stat: any = false



  isModalVisible: boolean = false;
  isModalVisibledisc: boolean = false;


  hideModaldisc() {
    this.isModalVisibledisc = false;
  }
  showModaldisc() {
    this.isModalVisibledisc = true;
  }



  showModal() {
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }






  constructor(private TeamService: TeamService, private offreService: OffreserviceService, private route: Router, private appservice: AppService, private resumeService: ResumeService) { }

  ngOnInit(): void {








    if (typeof localStorage !== 'undefined') {
      const id = localStorage.getItem("idt");
      if (id) {
        this.TeamService.getTeamById(Number(id)).subscribe(
          data => {

            this.link = data.password
            this.resume = data;
            this.offres = data.offres
            this.apps = data.appTeam



          },
          error => console.error('Error fetching resume', error)
        );
      }
    }
  }

  update(id: number) {
    console.log(String(id))
    localStorage.setItem("ido", String(id))
    this.route.navigate(['/update_offre'])


  }

  push() {
    localStorage.setItem("idteamo", String(localStorage.getItem("idt")))
    this.route.navigate(['create_offre'])


  }

  see(id: number) {
    console.log(String(id))
    localStorage.setItem("idos", String(id))
    this.route.navigate(['/see'])


  }

  application(app: any) {
    this.app = app
    this
    console.log(this.app)

    this.showModal()

  }
  getTimeAgo(date: string): string {
    return moment(date).fromNow();
  }

  view(id: any) {
    const a = this.apps.find((a: any) => a.id === id);
    if (a) {

      this.resumeService.getResumeById(a.idr!).subscribe(
        data => {

          console.log("data", data)
          this.resume = data;
          this.items1 = this.stringToArray(this.resume.items1);
          this.items2 = this.stringToArray(this.resume.items2);
          this.items3 = this.stringToArray(this.resume.items3);
          this.stat = data.status
          this. showModalapp()
        },
        error => console.error('Error fetching resume', error)
      );



    }



  }

  actif(offer: any) {
    offer.actif = !offer.actif
    this.offreService.actif(offer).subscribe(data => {

      console.log(data)
    })

  }




  isModalVisibleapp = false;
  hideModalapp() {
    this.isModalVisibleapp = false;

  }
  showModalapp() {
    this.isModalVisibleapp = true;
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
  discord() {
   

      console.log(this.link)
      this.showModaldisc()


    }


  


}






