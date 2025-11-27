import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();
  constructor(private route: Router) {

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


}
