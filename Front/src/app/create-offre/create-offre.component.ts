import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from '../service/connection.service';

import { OffreserviceService } from '../service/offreservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-offre',
  templateUrl: './create-offre.component.html',
  styleUrls: ['./create-offre.component.scss']
})
export class CreateOffreComponent {

  resumeForm: FormGroup;
  err: boolean;
  submitted: boolean = false

  teamTypes: any[];

  constructor(private fb: FormBuilder, private offreService: OffreserviceService, private router: Router) {
    this.err = false;

    this.resumeForm = this.fb.group({
      comments: ['', [Validators.required, rangeValidator(1, 15)]],
      comments2: ['', [Validators.required, rangeValidator(10, 99)]],
      description: ['', Validators.required],
      teamType: ['', Validators.required],
      participation: [false],
      remunere: [false]
    });

    this.teamTypes = [
      { label: 'Player', value: 'Player' },
      { label: 'Webmaster', value: 'Webmaster' },
      { label: 'Community Manager', value: 'Community Manager' },
      { label: 'Staff', value: 'Staff' },
      { label: 'Coach', value: 'Coach' },
      { label: 'Other', value: 'Other' },
      { label: 'Strat caller', value: 'Strat caller' },
      { label: 'Squad', value: 'Squad' },
      { label: 'LAN Player', value: 'LAN Player' },
      { label: 'Shoutcaster', value: 'Shoutcaster' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Movie maker', value: 'Movie maker' },
      { label: 'Leader', value: 'Leader' },
      { label: 'Sponsor', value: 'Sponsor' },
      { label: 'Webdesigner', value: 'Webdesigner' },
      { label: 'Editor', value: 'Editor' }
    ];
  }

  ngOnInit(): void { }



  onSubmit(): void {
    this.submitted = true

    if (this.resumeForm.valid) {
      this.offreService.createOffre(this.resumeForm.value, Number(localStorage.getItem("idteamo"))).subscribe(
        response => {
          console.log('Offre created successfully', response);
          this.router.navigate(['/team-recrutement']); // Redirection après création réussie
        },
        error => {
          console.error('Error creating offre', error);
          this.err = true;
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
  getErrorMessage() {
    const commentsControl = this.resumeForm.get('comments');

    if (commentsControl?.hasError('required')) {
      return 'Number needed are required';
    } else if (commentsControl?.hasError('rangeError')) {
      return 'This value should be between 1 and 15';
    }

    return '';
  }
  getErrorMessage2() {
    const commentsControl = this.resumeForm.get('comments2');

    if (commentsControl?.hasError('required')) {
      return 'Minimum age are required';
    } else if (commentsControl?.hasError('rangeError')) {
      return 'This value should be between 10 and 99';
    }

    return '';
  }

}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null; // Don't validate if the field is empty (the required validator will handle it)
    }
    return value >= min && value <= max ? null : { rangeError: true };
  };
}
