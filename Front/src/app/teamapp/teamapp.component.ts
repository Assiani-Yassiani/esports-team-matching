import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-teamapp',
  templateUrl: './teamapp.component.html',
  styleUrl: './teamapp.component.scss'
})
export class TeamappComponent {
  @Input()resume: any = {};
  @Input()items1: string[] = [];
  @Input()items2: string[] = [];
  @Input()items3: string[] = [];
  @Input()items4: string[] = [];
  @Input()items5: string[] = [];
  @Input()status : boolean =false
  @Input() show: boolean = false;
  @Input() link: string = ""


  @Output() close = new EventEmitter<void>();
  constructor() {

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

}
