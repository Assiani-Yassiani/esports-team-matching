import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';
import { AppService } from '../service/app.service';


@Component({
  selector: 'app-alert4',
  templateUrl: './alert4.component.html',
  styleUrl: './alert4.component.scss'
})
export class Alert4Component {
  @Input() show: boolean = false;
  @Input() idr!: number;
  @Input() idt!: number;
  @Input() nameteam!: String
  @Input() nameResume!: String
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

    console.log(app) // Replace with the actual user ID


    this.appService.create(app, this.idt, this.idr).subscribe(
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
