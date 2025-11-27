import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultiGamingServiceService } from '../service/multi-gaming-service.service';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';


@Component({
  selector: 'app-multigaming',
  templateUrl: './multigaming.component.html',
  styleUrls: ['./multigaming.component.scss']
})
export class MultigamingComponent implements OnInit {
  resumeForm: FormGroup;
  err!: boolean;

  items1: string[] = [];
  items2: string[] = [];
  items3: string[] = [];
  items4: string[] = [];


  platformOptions: any[];
  regionOptions: any[];

  constructor(private fb: FormBuilder, private auth: ConnectionService, private multiGamingService: MultiGamingServiceService, private route: Router) {
    this.err = false;
    this.resumeForm = this.fb.group({

      platform: ['', Validators.required],
      region: ['', Validators.required],
      comments: ['', Validators.required],
      comments2: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      newItem1: [''],
      newItem2: [''],
      newItem3: [''],
      newItem4: [''],
      items1: [[], Validators.required],
      items2: [[], Validators.required],
      items3: [[], Validators.required],
      items4: [[], Validators.required],
      description: ['', Validators.required],
      ambitions: ['', Validators.required],
      user: this.auth.getUserAuth()
    });






    this.platformOptions = [
      { label: 'PC', value: 'PC' },
      { label: 'PS5', value: 'PS5' },
      { label: 'XBOX', value: 'XBOX' }
    ];





    this.regionOptions = [
      { label: 'Tunis', value: 'Tunis' },
      { label: 'Canada', value: 'Canada' },
      { label: 'France', value: 'Canada' }
    ];
  }

  ngOnInit(): void { }


  joinStrings(list: string[]): string {
    return JSON.stringify(list); // Utilisation de l'espace comme séparateur
  }

  onSubmit(): void {
    // Mettre à jour les listes dans le formulaire avant de soumettre
    this.resumeForm.patchValue({
      items1: this.joinStrings(this.items1),
      items2: this.joinStrings(this.items2),
      items3: this.joinStrings(this.items3),
      items4: this.joinStrings(this.items4),

    });
    console.log(this.resumeForm.valid)

    if (this.resumeForm.valid) {
      this.multiGamingService.createMultiGaming(this.resumeForm.value).subscribe(
        response => {
          console.log('Form submitted with value:', response);

          localStorage.setItem("idm", response.id)
          this.route.navigate(['multiprifil']);


        },
        error => {
          console.error('Error submitting form:', error);
        }
      );
    }
  }

  addItem1() {
    if (this.resumeForm.value.newItem1) {
      this.items1.push(this.resumeForm.value.newItem1);
      this.resumeForm.controls['newItem1'].reset(); // Réinitialiser le champ après l'ajout
    }
  }

  removeItem1(index: number) {
    this.items1.splice(index, 1);
  }

  addItem2() {
    if (this.resumeForm.value.newItem2) {
      this.items2.push(this.resumeForm.value.newItem2);
      this.resumeForm.controls['newItem2'].reset(); // Réinitialiser le champ après l'ajout
    }
  }

  removeItem2(index: number) {
    this.items2.splice(index, 1);
  }

  addItem3() {
    if (this.resumeForm.value.newItem3) {
      this.items3.push(this.resumeForm.value.newItem3);
      this.resumeForm.controls['newItem3'].reset(); // Réinitialiser le champ après l'ajout
    }
  }

  removeItem3(index: number) {
    this.items3.splice(index, 1);
  }

  addItem4() {
    if (this.resumeForm.value.newItem4) {
      this.items4.push(this.resumeForm.value.newItem4);
      this.resumeForm.controls['newItem4'].reset(); // Réinitialiser le champ après l'ajout
    }
  }

  removeItem4(index: number) {
    this.items4.splice(index, 1);
  }
}
