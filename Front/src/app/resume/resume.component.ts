import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../service/resume-service.service';
import { Route, Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  @ViewChildren('item') itemElements!: QueryList<ElementRef>;
  resumeForm: FormGroup;
  err!: boolean;

  items1: string[] = [];
  items2: string[] = [];
  items3: string[] = [];

  gameOptions: any[];
  platformOptions: any[];
  priorityOptions: any[];

  constructor(private fb: FormBuilder, private auth: ConnectionService, private resumeService: ResumeService, private route: Router, private renderer: Renderer2) {

    const user = this.auth.getUserAuth()
    if (user != -1 && user != null) {
    }

    this.err = false;
    this.resumeForm = this.fb.group({
      game: ['', Validators.required],
      platform: ['', Validators.required],
      priority: ['', Validators.required],
      comments: ['', [Validators.required, Validators.maxLength(30)]],
      available: [false],
      expenses: [false],
      Player: [false],
      Webmaster: [false],
      CommunityManager: [false],
      Staff: [false],
      Coach: [false],
      Other: [false],
      StratCaller: [false],
      Squad: [false],
      LanPlayer: [false],
      Shoutcaster: [false],
      Manager: [false],
      MovieMaker: [false],
      Leader: [false],
      Sponsor: [false],
      Webdesigner: [false],
      Editor: [false],
      newItem1: ['', Validators.maxLength(40)],
      newItem2: ['', Validators.maxLength(40)],
      newItem3: ['', Validators.maxLength(40)],
      items1: [[]],
      items2: [[]],
      items3: [[]],
      description: ['', Validators.required],
      ambitions: [''],
      recruitmentList: [[], Validators.required],
      profileList: ['', Validators.required],
      user: user
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

  ngOnInit(): void { }

  joinStrings(list: string[]): string {
    return JSON.stringify(list); // Utilisation de l'espace comme séparateur
  }
  submitted = false;
  onSubmit(): void {



    console.log(this.getProfileList())



    // Mettre à jour les listes dans le formulaire avant de soumettre
    this.resumeForm.patchValue({
      items1: this.joinStrings(this.items1),
      items2: this.joinStrings(this.items2),
      items3: this.joinStrings(this.items3),
      recruitmentList: this.joinStrings(this.getRecruitmentList()),
      profileList: this.getProfileList().length > 0 ? this.joinStrings(this.getProfileList()) : "",


    });
    this.submitted = true;
    console.log("ddddddddddddd", this.getProfileList())



    if (this.resumeForm.valid) {
      this.resumeService.createResume(this.resumeForm.value).subscribe(
        response => {
          console.log('Form submitted with value:', response.id);
          localStorage.setItem("idr", response.id)
          this.route.navigate(['resume_recrutement']);

        },
        error => {
          console.error('Error submitting form:', error);
        }
      );
    }

  }



  addItem1() {

    if (this.resumeForm.value.newItem1 && !this.resumeForm.get('newItem1')?.invalid) {



      console.log("item", this.resumeForm.get('newItem1')?.invalid)

      this.items1.push(this.resumeForm.value.newItem1);
      this.resumeForm.controls['newItem1'].reset(); // Réinitialiser le champ après l'ajout
    }
  }

  removeItem1(index: number) {
    this.items1.splice(index, 1);
  }

  addItem2() {
    if (this.resumeForm.value.newItem2 && !this.resumeForm.get('newItem2')?.invalid) {
      this.items2.push(this.resumeForm.value.newItem2);
      this.resumeForm.controls['newItem2'].reset(); // Réinitialiser le champ après l'ajout
    }
  }

  removeItem2(index: number) {
    this.items2.splice(index, 1);
  }

  addItem3() {

    if (this.resumeForm.value.newItem3 && !this.resumeForm.get('newItem3')?.invalid) {
      this.items3.push(this.resumeForm.value.newItem3);
      this.resumeForm.controls['newItem3'].reset(); // Réinitialiser le champ après l'ajout
    }
  }

  removeItem3(index: number) {
    this.items3.splice(index, 1);
  }

  getRecruitmentList(): string[] {
    const recruitmentList = [];
    if (this.resumeForm.value.available) recruitmentList.push('available');
    if (this.resumeForm.value.expenses) recruitmentList.push('expenses');
    return recruitmentList;
  }

  getProfileList(): any {


    const profileList = [];
    if (this.resumeForm.value.Player) profileList.push('Player');
    if (this.resumeForm.value.Webmaster) profileList.push('Webmaster');
    if (this.resumeForm.value.CommunityManager) profileList.push('CommunityManager');
    if (this.resumeForm.value.Staff) profileList.push('Staff');
    if (this.resumeForm.value.Coach) profileList.push('Coach');
    if (this.resumeForm.value.Other) profileList.push('other');
    if (this.resumeForm.value.StratCaller) profileList.push('StratCaller');
    if (this.resumeForm.value.Squad) profileList.push('Squad');
    if (this.resumeForm.value.LanPlayer) profileList.push('LanPlayer');
    if (this.resumeForm.value.Shoutcaster) profileList.push('Shoutcaster');
    if (this.resumeForm.value.Manager) profileList.push('Manager');
    if (this.resumeForm.value.MovieMaker) profileList.push('MovieMaker');
    if (this.resumeForm.value.Leader) profileList.push('Leader');
    if (this.resumeForm.value.Sponsor) profileList.push('Sponsor');
    if (this.resumeForm.value.Webdesigner) profileList.push('Webdesigner');
    if (this.resumeForm.value.Editor) profileList.push('Editor');
    return profileList;
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

  getErrorMessageINFO() {
    const gameControl = this.resumeForm.get('game');
    const platformControl = this.resumeForm.get('platform');
    const priorityControl = this.resumeForm.get('priority');

    if (gameControl?.hasError('required') && platformControl?.hasError('required') && priorityControl?.hasError('required')) {
      return 'Game, Platform, and Priority are required';
    } else if (gameControl?.hasError('required') && platformControl?.hasError('required')) {
      return 'Game and Platform are required';
    } else if (gameControl?.hasError('required') && priorityControl?.hasError('required')) {
      return 'Game and Priority are required';
    } else if (platformControl?.hasError('required') && priorityControl?.hasError('required')) {
      return 'Platform and Priority are required';
    } else if (gameControl?.hasError('required')) {
      return 'Game is required';
    } else if (platformControl?.hasError('required')) {
      return 'Platform is required';
    } else if (priorityControl?.hasError('required')) {
      return 'Priority is required';
    }
    return '';
  }




}

