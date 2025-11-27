import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';
import { AppService } from '../service/app.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-discord',
  templateUrl: './discord.component.html',
  styleUrl: './discord.component.scss'
})
export class DiscordComponent {

  @Input() show: boolean = false;
  @Input() link_basic!: string


  @Output() close = new EventEmitter<void>();
  constructor(private sanitizer: DomSanitizer, private route: Router, private conctService: ConnectionService, private appService: AppService) {



  }
  ngOnInit(): void {

  }


  closeModal() {
    this.show = false

    this.close.emit();

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
  goToLink() {
    window.location.href = this.link_basic;
  }

}
