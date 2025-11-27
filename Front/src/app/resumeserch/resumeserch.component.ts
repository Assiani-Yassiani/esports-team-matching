import { Component } from '@angular/core';
import { ResumeService } from '../service/resume-service.service';
import { ConnectionService } from '../service/connection.service';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-resumeserch',
  templateUrl: './resumeserch.component.html',
  styleUrl: './resumeserch.component.scss'
})
export class ResumeserchComponent {




  resume: any = {};
  items1: string[] = [];
  items2: string[] = [];
  items3: string[] = [];
  game: any;
  platform: any

  idt: any
  idr: any

  nameteam: any
  nameResume: any
  v: number = 0








  constructor(private resumeService: ResumeService, private conctService: ConnectionService, private appService: AppService) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {

      const id = localStorage.getItem("idsr");
      if (id) {
        const view = {

          user: Number(this.conctService.getUserAuth())
        }
        this.resumeService.view(Number(id), view).subscribe(respense => {
          console.log(respense)
        })
        this.resumeService.getResumeById(Number(id)).subscribe(
          data => {

            this.v = data.viwes.length


            console.log(data.viwes.length)

            this.nameResume = data.comments
            this.game = data.game
            this.platform = data.platform
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
  ngOnDestroy(): void {

  }

  recrut() {

    const app = {
      game: this.game,
      platform: this.platform

    }
    const userId = Number(Number(this.conctService.getUserAuth()))


    this.appService.findteamByGameAndPlatform(userId, app).subscribe(
      response => {
        if (response != undefined) {
          this.idt = response.id
          this.idr = localStorage.getItem("idsr")
          this.nameteam = response.comments

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

}
