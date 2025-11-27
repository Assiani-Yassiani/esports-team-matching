import { Component } from '@angular/core';
import { ResumeService } from '../service/resume-service.service';
import moment from 'moment';
import { AppService } from '../service/app.service';
import { AppResume } from '../admin/model/appResume';
import { TeamService } from '../service/team-service.service';

@Component({
  selector: 'app-teamrecrutemnent',
  templateUrl: './teamrecrutemnent.component.html',
  styleUrl: './teamrecrutemnent.component.scss'
})
export class TeamrecrutemnentComponent {



  link: any = ""
  resume: any = {};
  items1: string[] = [];
  items2: string[] = [];
  items3: string[] = [];
  items4: string[] = [];
  items5: string[] = [];
  app: AppResume[] = [];
  team: any = {}
  stat: any = false

  constructor(private resumeService: ResumeService, private appservice: AppService, private TeamService: TeamService) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const id = localStorage.getItem("idr");
      if (id) {
        this.resumeService.getResumeById(Number(id)).subscribe(
          data => {
            this.resume = data;

            this.app = data.appResume

            console.log(this.app)

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
  ngOnDestroy(): void {

  }
  getTimeAgo(date: string): string {
    return moment(date).fromNow();
  }
  view(id: any) {

    const a = this.app.find((a: any) => a.id === id);
    if (a) {
      a.view = true;
      if (a.idto != null) {
        this.appservice.viewOffer(id).subscribe(respense => {



        })




        this.TeamService.getTeamById(a.idto!).subscribe(
          data => {
            console.log(data)
            this.team = data;
            this.items1 = this.stringToArray(this.team.items1);
            this.items2 = this.stringToArray(this.team.items2);
            this.items3 = this.stringToArray(this.team.items3);
            this.items4 = this.stringToArray(this.team.items4);
            this.items5 = this.stringToArray(this.team.items5);
            console.log(this.items5)
            this.stat = a.status
            this.showModalapp()

          },


        )
      }
      else {
        this.appservice.viewPlayer(id).subscribe(respense => {



        })




        this.TeamService.getTeamById(a.idt!).subscribe(
          data => {
            console.log(data)
            this.team = data;
            this.items1 = this.stringToArray(this.team.items1);
            this.items2 = this.stringToArray(this.team.items2);
            this.items3 = this.stringToArray(this.team.items3);
            this.items4 = this.stringToArray(this.team.items4);
            this.items5 = this.stringToArray(this.team.items5);
            console.log(this.items5)
            this.stat = a.status
            this.showModalapp()

          },


        )

      }

    }


    console.log(this.app)

  }
  isModalVisibleapp = false;
  hideModalapp() {
    this.isModalVisibleapp = false;

  }
  showModalapp() {
    this.isModalVisibleapp = true;
  }

  isModalVisibledisc: boolean = false;


  hideModaldisc() {
    this.isModalVisibledisc = false;

  }
  showModaldisc() {
    this.isModalVisibledisc = true;
  }

  discord(id: number) {
    const a = this.app.find((a: any) => a.id === id);
    if (a) {
      this.link = a.link

      console.log(this.link)
      this.showModaldisc()


    }


  }
  status(id: number) {

    this.appservice.statusPlayer(id).subscribe(respense => {


      console.log(respense)

      const a = this.app.find((a: any) => a.id === id);
      if (a) {

        this.stat = true
      }
    }
    )





  }
}
