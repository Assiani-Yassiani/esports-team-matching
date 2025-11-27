import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../service/team-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-up-team',
  templateUrl: './up-team.component.html',
  styleUrls: ['./up-team.component.scss']
})
export class UpTeamComponent implements OnInit {
  resumeForm: FormGroup;
  err!: boolean;
  teamId!: number;
  submitted: boolean = false
  @ViewChildren('item') itemElements!: QueryList<ElementRef>;

  items1: string[] = [];
  items2: string[] = [];
  items3: string[] = [];
  items4: string[] = [];
  items5: string[] = [];

  gameOptions: any[];
  platformOptions: any[];
  priorityOptions: any[];
  regionOptions: any[];
  teamTypes: any[];

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private teamService: TeamService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.err = false;
    this.resumeForm = this.fb.group({
      game: ['', Validators.required],
      region: ['', Validators.required],
      platform: ['', Validators.required],
      priority: ['', Validators.required,],
      comments: ['', [Validators.required, Validators.maxLength(30)]],

      password: ['', [Validators.required, Validators.maxLength(30)]],
      newItem1: ['', Validators.maxLength(30)],
      newItem2: ['', Validators.maxLength(30)],
      newItem3: ['', Validators.maxLength(30)],
      newItem4: ['', Validators.maxLength(30)],
      newItem5: ['', Validators.maxLength(30)],
      items1: [[],],
      items2: [[],],
      items3: [[],],
      items4: [[],],
      items5: [[],],
      description: ['', Validators.required],
      ambitions: [''],
    });

    this.gameOptions = [
      { label: 'League of Legends', value: 'LOL' },
      { label: 'Counter-Strike', value: 'CS2' },
      { label: 'Call of Duty', value: 'COD' }
    ];


    this.platformOptions = [
      { label: 'PC', value: 'PC' },
      { label: 'PS5', value: 'PS5' },
      { label: 'XBOX', value: 'XBOX' }
    ];

    this.priorityOptions = [
      { label: 'High-', value: 'High-' },
      { label: 'Middle+', value: 'Middle+' },
      { label: 'Middle-', value: 'Middle-' },
      { label: 'Low-', value: 'Low-' },
      { label: 'Low', value: 'Low' },
      { label: 'Low+', value: 'Low+' },
      { label: 'High+', value: 'High+' },
      { label: 'Pro', value: 'Pro' },

    ];

    this.regionOptions = [
      { label: 'Tunis', value: 'Tunis' },
      { label: 'Canada', value: 'Canada' },
      { label: 'France', value: 'Canada' }
    ];


    this.teamTypes = [
      { label: 'Team', value: 'Team' },
      { label: 'Mix', value: 'Mix' },
      { label: 'Multigaming', value: 'Multigaming' },
      { label: 'Guild', value: 'Guild' },
      { label: 'Amators', value: 'Amators' },
      { label: 'Organization', value: 'Organization' },
      { label: 'Company', value: 'Company' }
    ];
  }
  ngAfterViewInit(): void {
    // Ajouter une animation pour chaque nouvel élément ajouté
    this.itemElements.changes.subscribe((elements: QueryList<ElementRef>) => {
      elements.forEach((item, index) => {
        setTimeout(() => {
          this.renderer.addClass(item.nativeElement, 'fade-in');
        }, index * 100); // Délai entre chaque item
      });
    });
  }
  ngOnInit(): void {
    console.log("sssssssssssssssssss")
    if (typeof localStorage !== 'undefined') {
      const idt = localStorage.getItem("idt");
      if (idt != null)
        this.teamId = parseInt(idt, 10)
      if (this.teamId) {
        this.teamService.getTeamById(Number(idt)).subscribe(
          data => {
            console.log("hhhhhhhhhhhhhhhhhh" + data)
            this.resumeForm.patchValue(data);
            this.items1 = this.stringToArray(data.items1);
            this.items2 = this.stringToArray(data.items2);
            this.items3 = this.stringToArray(data.items3);
            this.items4 = this.stringToArray(data.items4);
            this.items5 = this.stringToArray(data.items5);
          },
          error => console.error('Error fetching team', error)
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
      items5: this.joinStrings(this.items5)
    });


    console.log(this.resumeForm)
    this.submitted = true
    if (this.resumeForm.valid) {
      this.teamService.updateTeam(this.teamId, this.resumeForm.value).subscribe(
        response => {
          console.log('Form submitted with value:', response.id);
          localStorage.setItem("idt", response.id);
          this.route.navigate(['admin'])

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

  addItem5() {
    if (this.resumeForm.value.newItem5) {
      this.items5.push(this.resumeForm.value.newItem5);
      this.resumeForm.controls['newItem5'].reset(); // Réinitialiser le champ après l'ajout
    }
  }

  removeItem5(index: number) {
    this.items5.splice(index, 1);
  }
  getErrorMessage() {
    const commentsControl = this.resumeForm.get('comments');
    if (commentsControl?.hasError('required')) {
      return 'Name is required';
    } else if (commentsControl?.hasError('maxlength')) {
      console.log("")
      return 'Name is too long (maximum is 30 characters)';
    }
    return '';
  }
  getErrorMessage2() {
    const commentsControl = this.resumeForm.get('password');
    if (commentsControl?.hasError('required')) {
      return 'Discord is required';
    } else if (commentsControl?.hasError('maxlength')) {
      console.log("")
      return 'Discord is too long (maximum is 30 characters)';
    }
    return '';
  }
  getErrorMessageINFO() {
    const gameControl = this.resumeForm.get('game');
    const platformControl = this.resumeForm.get('platform');
    const priorityControl = this.resumeForm.get('priority');
    const regionControl = this.resumeForm.get('region');

    if (gameControl?.hasError('required') && platformControl?.hasError('required') && priorityControl?.hasError('required') && regionControl?.hasError('required')) {
      return 'Game, Platform, Priority, and Region are required';
    } else if (gameControl?.hasError('required') && platformControl?.hasError('required') && priorityControl?.hasError('required')) {
      return 'Game, Platform, and Priority are required';
    } else if (gameControl?.hasError('required') && platformControl?.hasError('required') && regionControl?.hasError('required')) {
      return 'Game, Platform, and Region are required';
    } else if (gameControl?.hasError('required') && priorityControl?.hasError('required') && regionControl?.hasError('required')) {
      return 'Game, Priority, and Region are required';
    } else if (platformControl?.hasError('required') && priorityControl?.hasError('required') && regionControl?.hasError('required')) {
      return 'Platform, Priority, and Region are required';
    } else if (gameControl?.hasError('required') && platformControl?.hasError('required')) {
      return 'Game and Platform are required';
    } else if (gameControl?.hasError('required') && priorityControl?.hasError('required')) {
      return 'Game and Priority are required';
    } else if (gameControl?.hasError('required') && regionControl?.hasError('required')) {
      return 'Game and Region are required';
    } else if (platformControl?.hasError('required') && priorityControl?.hasError('required')) {
      return 'Platform and Priority are required';
    } else if (platformControl?.hasError('required') && regionControl?.hasError('required')) {
      return 'Platform and Region are required';
    } else if (priorityControl?.hasError('required') && regionControl?.hasError('required')) {
      return 'Priority and Region are required';
    } else if (gameControl?.hasError('required')) {
      return 'Game is required';
    } else if (platformControl?.hasError('required')) {
      return 'Platform is required';
    } else if (priorityControl?.hasError('required')) {
      return 'Priority is required';
    } else if (regionControl?.hasError('required')) {
      return 'Region is required';
    }
    return '';
  }

}
