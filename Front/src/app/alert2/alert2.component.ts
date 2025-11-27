
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-alert2',
  templateUrl: './alert2.component.html',
  styleUrl: './alert2.component.scss'
})
export class Alert2Component implements OnInit {
  @Input() show: boolean = false;
  @Input() idr!: number;
  @Input() idt!: number;
  @Input() nameteam!: any;
  @Input() nameResume!: any;
  @Input() ido!: any;
  @Output() close = new EventEmitter<void>();
  constructor(private route: Router, private conctService: ConnectionService, private appService: AppService) {

  }
  ngOnInit(): void {

  }


  closeModal() {
    this.show = false

    this.close.emit();

  }

  app() {
    const app = {
      idResume: this.idr,
      idteam: this.idt,
      nameteam: this.nameteam,
      nameResume: this.nameResume,
      view: false


    }




    this.appService.createApp(this.ido, this.idr, this.idt,).subscribe(
      response => {

        console.log(response)
      }
      ,
      error => {
        console.error('Error finding resume', error);
      })

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

}
