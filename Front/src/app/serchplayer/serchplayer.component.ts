import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';

interface Option {
  name: string;
  code: string;
}


interface Player {
  id: any;

  comments: string;
  time: string;
  review: string;
  priority: string;
  roles: string;
  image: string;
  country: string;
  platform: string;
  game: string;
  showDropdown: boolean;
  profileList: string


}

@Component({
  selector: 'app-serchplayer',
  templateUrl: './serchplayer.component.html',
  styleUrls: ['./serchplayer.component.scss'],
})
export class SerchplayerComponent implements OnInit {
  myform: FormGroup;

  countries: Option[] = [
    { name: 'France', code: 'FR' },
    { name: 'United States of America', code: 'USA' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Canada', code: 'CA' },
    { name: 'India', code: 'IN' },
    { name: 'Switzerland', code: 'CH' },
    // Ajoutez d'autres pays
  ];

  profiles: Option[] = [
    { name: 'Player', code: 'PL' },
    { name: 'Strat caller', code: 'SC' },
    { name: 'Leader', code: 'LE' },
    { name: 'LAN Player', code: 'LP' },
    { name: 'Squad', code: 'SQ' },
    { name: 'Coach', code: 'CO' },
    { name: 'Staff', code: 'ST' },
    { name: 'Manager', code: 'MA' },
    { name: 'Other', code: 'OT' },
    { name: 'Editor', code: 'ED' },
    { name: 'Community Manager', code: 'CM' },
    { name: 'Movie maker', code: 'MM' },
    { name: 'Webdesigner', code: 'WD' },
    { name: 'Webmaster', code: 'WM' },
    { name: 'Shoutcaster', code: 'SH' },
    { name: 'Sponsor', code: 'SP' },
  ];
  selectedProfiles: Option[] = [];
  selectedCountries: Option[] = [];

  games: Option[] = [
    { name: 'Valorant', code: 'VAL' },
    { name: 'Fortnite', code: 'FO' },
    { name: 'League of Legends', code: 'LOL' },
    { name: 'Rocket League', code: 'RL' },
    { name: 'Counter-Strike 2', code: 'CS2' },
    { name: 'Rainbow Six Siege', code: 'R6S' },
    { name: 'Apex Legends', code: 'AL' },
    { name: 'Call of Duty Mobile', code: 'CODM' },
    { name: 'Brawl Stars', code: 'BS' },
    { name: 'Call of Duty: Warzone 2', code: 'CODWZ2' },
    { name: 'Mobile Legends', code: 'ML' },
    { name: 'Overwatch', code: 'OW' },
    { name: 'Call of Duty', code: 'COD' },
    { name: 'Rust', code: 'RST' },
    // Ajoutez d'autres jeux
  ];
  selectedGames: Option[] = [];

  platforms: Option[] = [
    { name: 'PC', code: 'PC' },
    { name: 'Mobile', code: 'MB' },
    { name: 'PS5', code: 'PS5' },
    { name: 'PS4', code: 'PS4' },
    { name: 'XBOX Series X/Y', code: 'XBOX' },
    { name: 'Xbox One', code: 'XONE' },
    { name: 'Multiplatform', code: 'MP' }
    // Ajoutez d'autres plateformes
  ];
  selectedPlatforms: Option[] = [];

  levelsCount: { [key: string]: number } = {
    'High-': 0,
    'Middle+': 0,
    'Middle-': 0,
    'Low-': 0,
    'Low+': 0,
    'High+': 0,
    'Pro': 0
  };

  reviews: { [key: string]: boolean } = {};
  premium: boolean = false;

  pseudo: string = '';
  availableToRecruit: boolean = false;

  players: Player[] = [

  ];

  currentPage = 1;
  itemsPerPage = 10; // Nombre d'éléments par page
  pages: number[] = [];
  currentPlayers: Player[] = [];

  constructor(private http: HttpClient, private route: Router) {
    this.myform = new FormGroup({
      selectedCountries: new FormControl([]),
      selectedGames: new FormControl([]),
      selectedPlatforms: new FormControl([]),
      selectedLevels: new FormGroup({
        'High-': new FormControl(false),
        'Middle+': new FormControl(false),
        'Middle-': new FormControl(false),
        'Low-': new FormControl(false),
        'Low+': new FormControl(false),
        'High+': new FormControl(false),
        'Pro': new FormControl(false)
      }),
      selectedProfiles: new FormControl([]),
      reviews: new FormGroup({
        '-': new FormControl(false),
        'Positive': new FormControl(false),
        'Negative': new FormControl(false),
        'Neutral': new FormControl(false),
        'Neutre': new FormControl(false)
      }),
      premium: new FormControl(false),
      pseudo: new FormControl(''),
      availableToRecruit: new FormControl(false),
      selectedRoles: new FormControl([]),
      selectedLeagues: new FormControl([]),
      selectedChampions: new FormControl([]),
      teamName: new FormControl('')
    });
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/resumes')
      .subscribe(response => {
        this.currentPlayers = response

        console.log(this.currentPlayers);
        this.updateLevelsCount(response); // Mise à jour des comptes des niveaux
      });
    this.setPages();
    this.setCurrentPlayers();

    // Abonnez-vous aux changements de valeur du formulaire
    this.myform.valueChanges.subscribe(() => {
      this.onFormChange();
    });
  }

  onFormChange() {
    if (this.myform.valid) {
      this.onSubmit();
    }
  }

  setPages() {
    const totalPages = Math.ceil(this.players.length / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  setCurrentPlayers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPlayers = this.currentPlayers.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.setCurrentPlayers();
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.setCurrentPlayers();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setCurrentPlayers();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.setCurrentPlayers();
    }
  }

  goToLastPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage = this.pages.length;
      this.setCurrentPlayers();
    }
  }

  resetSearch() {
    this.myform.reset({
      selectedCountries: [],
      selectedGames: [],
      selectedPlatforms: [],
      selectedLevels: {
        'High-': false,
        'Middle+': false,
        'Middle-': false,
        'Low-': false,
        'Low+': false,
        'High+': false,
        'Pro': false
      },
      selectedProfiles: [],
      reviews: {
        '-': false,
        'Positive': false,
        'Negative': false,
        'Neutral': false,
        'Neutre': false
      },
      premium: false,
      pseudo: '',
      availableToRecruit: false,
      selectedRoles: [],
      selectedLeagues: [],
      selectedChampions: []
    });

    this.levelsCount = {
      'High-': 0,
      'Middle+': 0,
      'Middle-': 0,
      'Low-': 0,
      'Low+': 0,
      'High+': 0,
      'Pro': 0
    };
  }

  isFormEmpty(): boolean {
    const formValue = this.myform.value;

    return (
      !(formValue.selectedCountries && formValue.selectedCountries.length) &&
      !(formValue.selectedGames && formValue.selectedGames.length) &&
      !(formValue.selectedPlatforms && formValue.selectedPlatforms.length) &&
      !(formValue.selectedLevels && Object.values(formValue.selectedLevels).some((value: any) => value)) &&
      !(formValue.selectedProfiles && formValue.selectedProfiles.length) &&
      !(formValue.reviews && Object.values(formValue.reviews).some((value: any) => value)) &&
      !formValue.premium &&
      !formValue.pseudo &&
      !formValue.availableToRecruit &&
      !(formValue.selectedRoles && formValue.selectedRoles.length) &&
      !(formValue.selectedLeagues && formValue.selectedLeagues.length) &&
      !(formValue.selectedChampions && formValue.selectedChampions.length) &&
      !formValue.teamName
    );
  }

  onSubmit() {
    const formValue = this.myform.value;
    const searchCriteria = {
      selectedCountries: formValue.selectedCountries ? formValue.selectedCountries.map((c: Option) => c.code) : [],
      selectedGames: formValue.selectedGames ? formValue.selectedGames.map((g: Option) => g.code) : [],
      selectedPlatforms: formValue.selectedPlatforms ? formValue.selectedPlatforms.map((p: Option) => p.code) : [],
      selectedLevels: formValue.selectedLevels ? Object.keys(formValue.selectedLevels).filter(level => formValue.selectedLevels[level]) : [],
      selectedProfiles: formValue.selectedProfiles ? formValue.selectedProfiles.map((p: Option) => p.code) : [],
      teamName: formValue.teamName || ''
    };

    this.http.post<any[]>('http://localhost:8080/api/resumes/search', searchCriteria)
      .subscribe(response => {
        this.currentPlayers = response

        console.log(this.currentPlayers);
        this.updateLevelsCount(response); // Mise à jour des comptes des niveaux
      });
  }

  updateLevelsCount(resumes: any[]) {
    const counts: { [key: string]: number } = {
      'High-': 0,
      'Middle+': 0,
      'Middle-': 0,
      'Low-': 0,
      'Low+': 0,
      'High+': 0,
      'Pro': 0
    };

    resumes.forEach(resume => {
      const levels: string[] = resume.
        priority
        .split(', '); // Supposons que les niveaux sont stockés sous forme de chaîne séparée par des virgules
      levels.forEach((level: string) => {
        if (counts[level] !== undefined) {
          counts[level]++;
        }
      });
    });

    this.levelsCount = counts;
  }
  toggleDropdown(player: Player) {
    player.showDropdown = !player.showDropdown;
  }

  getOfferIcon(type: string): string {
    switch (type) {
      case 'Player':
        return 'assets/images/rabia/Player.png';
      case 'Sponsor':
        return 'assets/images/rabia/sponsor.png';
      // Add more cases as needed
      default:
        return 'assets/images/rabia/default.png';
    }
  }

  profil(id: any) {
    console.log(id)
    localStorage.setItem("idsr", String(id))
    this.route.navigate(['resume_serch'])

  }
  convertStringToArray(jsonString: string): string[] {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error('Invalid JSON string', e);
      return [];
    }
  }
}
