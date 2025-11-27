import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Offre, OffreserviceService } from '../offreservice.service';

@Component({
  selector: 'app-updateoffre',
  templateUrl: './updateoffre.component.html',
  styleUrl: './updateoffre.component.scss'
})
export class UpdateoffreComponent {


  resumeForm: FormGroup;
  err: boolean;
  teamTypes: any[];


  constructor(
    private fb: FormBuilder,
    private offreService: OffreserviceService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.err = false;

    this.resumeForm = this.fb.group({
      comments: ['', Validators.required],
      comments2: ['', Validators.required],
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

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.loadOffre(Number(localStorage.getItem("ido")));
    }
  }

  loadOffre(id: number): void {
    this.offreService.getOffreById(id).subscribe(
      (offre: Offre) => {
        this.resumeForm.patchValue(offre);
      },
      error => {
        console.error('Error fetching offre', error);
        this.err = true;
      }
    );
  }

  onSubmit(): void {
    if (this.resumeForm.valid) {
      if (typeof localStorage !== 'undefined') {
        this.offreService.updateOffre(Number(localStorage.getItem("ido")), this.resumeForm.value).subscribe(
          response => {
            console.log('Offre updated successfully', response);

            this.router.navigate(['team-recrutement'])
            // Redirection après mise à jour réussie
          },
          error => {
            console.error('Error updating offre', error);
            this.err = true;
          }
        );
      } else {
        console.error('Form is invalid');
      }
    }

  }
}
