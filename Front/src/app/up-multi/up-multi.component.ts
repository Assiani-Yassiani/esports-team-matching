import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from '../service/connection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiGamingServiceService } from '../service/multi-gaming-service.service';

@Component({
  selector: 'app-up-multi',
  templateUrl: './up-multi.component.html',
  styleUrl: './up-multi.component.scss'
})
export class UpMultiComponent {
  resumeForm: FormGroup;
  err!: boolean;
  multiGamingId!: number;

  items1: string[] = [];
  items2: string[] = [];
  items3: string[] = [];
  items4: string[] = [];

  platformOptions: any[];
  regionOptions: any[];

  constructor(
    private fb: FormBuilder,
    private multiGamingService: MultiGamingServiceService,
    private route: Router,
    private activatedRoute: ActivatedRoute
    , private auth: ConnectionService
  ) {
    this.err = false;
    const user = this.auth.getUserAuth()
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
      user: user
    });

    this.platformOptions = [
      { label: 'PC', value: 'PC' },
      { label: 'PS5', value: 'PS5' }
    ];

    this.regionOptions = [
      { label: 'Tun', value: 'Tun' },
      { label: 'ALG', value: 'Alg' }
    ];
  }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {

      this.multiGamingId = Number(localStorage.getItem("idm"));

      if (this.multiGamingId) {
        this.multiGamingService.getMultiGamingById(Number(this.multiGamingId)).subscribe(
          data => {
            this.resumeForm.patchValue(data);
            this.items1 = this.stringToArray(data.items1);
            this.items2 = this.stringToArray(data.items2);
            this.items3 = this.stringToArray(data.items3);
            this.items4 = this.stringToArray(data.items4);
          },
          error => console.error('Error fetching multigaming', error)
        );
      }
    }
  }
  joinStrings(list: string[]): string {
    return JSON.stringify(list); // Utilisation de l'espace comme séparateur
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

  onSubmit(): void {
    // Mettre à jour les listes dans le formulaire avant de soumettre
    this.resumeForm.patchValue({
      items1: this.joinStrings(this.items1),
      items2: this.joinStrings(this.items2),
      items3: this.joinStrings(this.items3),
      items4: this.joinStrings(this.items4),
    });

    if (this.resumeForm.valid) {
      this.multiGamingService.updateMultiGaming(this.multiGamingId, this.resumeForm.value).subscribe(
        response => {
          console.log('Form submitted with value:', response);
          localStorage.setItem("idm", response.id);
          this.route.navigate(['admin']);
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
