import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { AppService } from '../service/app.service';
import { AppOffre } from '../admin/model/appOffer';
import { ResumeService } from '../service/resume-service.service';
import { ConnectionService } from '../service/connection.service';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent implements OnInit {
  idr: number = 0;
  resume: any = {};
  items1: any = [];
  items2: any = [];
  items3: any = [];

  stat: any = false

  @Input() link: string = ""
  @Input() app: any[] = []
  @Input() show: boolean = false;

  @Output() close = new EventEmitter<void>();
  constructor(private route: Router, private appservice: AppService, private resumeService: ResumeService, private conctService: ConnectionService) {

  }
  ngOnInit(): void {





  }


  closeModal() {
    this.show = false

    this.close.emit();

  }

  createCv() {
    // Your logic to create a CV
    this.route.navigate(['resume'])
  }

  onBackdropClick(event: MouseEvent) {
    this.triggerCloseAnimation();
  }

  onContentClick(event: MouseEvent) {
    event.stopPropagation();
  }

  triggerCloseAnimation() {
    const backdrop = document.querySelector('.modal-backdrop');
    const content = document.querySelector('.modal-content');
    if (backdrop && content) {
      backdrop.classList.add('fade-out');
      content.classList.add('fade-out');
      setTimeout(() => {
        this.closeModal();
      }, 500); // Duration of the fade-out animation
    }
  }



  getTimeAgo(date: string): string {
    return moment(date).fromNow();
  }
  view(id: any) {
    this.appservice.viewOffer(id).subscribe(respense => {




    })

    const a = this.app.find((a: any) => a.id === id);
    if (a) {


      a.view = true;

      this.resumeService.getResumeById(a.idr).subscribe(
        data => {

          console.log("data", data)
          this.resume = data;
          this.items1 = this.stringToArray(this.resume.items1);
          this.items2 = this.stringToArray(this.resume.items2);
          this.items3 = this.stringToArray(this.resume.items3);
        },
        error => console.error('Error fetching resume', error)
      );

    }



    this.triggerCloseAnimation()
    this.showModalapp()




















  }
  isModalVisibleapp = false;
  hideModalapp() {
    this.isModalVisibleapp = false;
    this.show = true
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

  status(id: number) {

    console.log("hhhhhhh", this.link)

    this.appservice.statusOffer(id, this.link).subscribe(respense => {


      console.log(respense)

      const a = this.app.find((a: any) => a.id === id);
      if (a) {

        this.stat = true
      }
    }
    )





  }

  discord() {
    this.triggerCloseAnimation()
    this.showModaldisc()




  }
  isModalVisibledisc: boolean = false;


  hideModaldisc() {
    this.isModalVisibledisc = false;
    this.show = true;
  }
  showModaldisc() {
    this.isModalVisibledisc = true;
  }


}
