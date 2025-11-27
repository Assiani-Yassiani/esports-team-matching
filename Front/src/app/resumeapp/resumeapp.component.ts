import { Component, EventEmitter, Input, Output } from '@angular/core';
import { error } from 'console';
import { ResumeService } from '../service/resume-service.service';
import { ConnectionService } from '../service/connection.service';

@Component({
  selector: 'app-resumeapp',
  templateUrl: './resumeapp.component.html',
  styleUrl: './resumeapp.component.scss'
})
export class ResumeappComponent {
  @Input() items1: string[] = [];
  @Input() items2: string[] = [];
  @Input() items3: string[] = [];
  @Input() show: boolean = false;

  @Input() status: boolean = false;



  @Input() resume: any = {}


  @Output() close = new EventEmitter<void>();
  constructor(private resumeService: ResumeService, private conctService: ConnectionService) {

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


}
