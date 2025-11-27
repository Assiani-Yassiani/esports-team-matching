import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
interface Player {

  comments: string;
  time: string;
  review: string;
  priority: string;
  roles: string;
  image: string;
  region: string;
  platform: string;
  game: string;
  showDropdown: boolean;
  offers: Offres[],
}
interface Offres {
  name: string;
  id: string;
}


interface Option {
  name: string;
  code: string;
}

@Component({
  selector: 'app-serchmulti',
  templateUrl: './serchmulti.component.html',
  styleUrl: './serchmulti.component.scss'
})

export class SerchmultiComponent {
  myform: FormGroup;

  countries: Option[] = [
    { name: 'France', code: 'France' },
    { name: 'United States of America', code: 'USA' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Canada', code: 'Canada' },
    { name: 'India', code: 'IN' },
    { name: 'Tunis', code: 'Tunis' },
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
    { name: 'Fortnite', code: 'FN' },
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
    { name: 'Xbox Series X/Y', code: 'XSX' },
    { name: 'Xbox', code: 'XBOX' },
    { name: 'Multiplatform', code: 'MP' }
    // Ajoutez d'autres plateformes
  ];
  selectedPlatforms: Option[] = [];

  levelsCount: { [key: string]: number } = {
    'Amators': 0,
    'Organization': 0,
    'Company': 0,

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

  constructor(private http: HttpClient) {
    this.myform = new FormGroup({
      selectedCountries: new FormControl([]),
      selectedGames: new FormControl([]),
      selectedPlatforms: new FormControl([]),
      selectedLevels: new FormGroup({
        'Amators': new FormControl(false),
        'Organization': new FormControl(false),
        'Company': new FormControl(false),

      }),


      teamName: new FormControl('')
    });
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/multigaming').subscribe(response => {
      this.currentPlayers = response.map(player => ({
        ...player,
        showDropdown: false,
        offers: [
          { name: "Fortnite", id: "for" },
          { name: "Valorant", id: "val" },
          { name: "League of Legends", id: "lol" },


        ]
      }));
      console.log(this.currentPlayers);
      this.updateLevelsCount(response); // Mise à jour des comptes des niveaux
    });


    this.setPages();
    console.log("pagenumber", this.setPages())
    this.setCurrentPlayers();

    // Abonnez-vous aux changements de valeur du formulaire
    this.myform.valueChanges.subscribe(() => {
      this.onFormChange();
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
        'Amators': false,
        'Organization': false,
        'Company': false,

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
      'Amators': 0,
      'Organization': 0,
      'Company': 0,

    };
  }

  isFormEmpty(): boolean {
    const formValue = this.myform.value;

    return (
      !(formValue.selectedCountries && formValue.selectedCountries.length) &&
      !(formValue.selectedGames && formValue.selectedGames.length) &&
      !(formValue.selectedPlatforms && formValue.selectedPlatforms.length) &&
      !(formValue.selectedLevels && Object.values(formValue.selectedLevels).some((value: any) => value)) &&



      !formValue.teamName
    );
  }

  onSubmit() {
    const formValue = this.myform.value;
    const searchCriteria = {
      selectedCountries: formValue.selectedCountries ? formValue.selectedCountries.map((c: Option) => c.code) : [],
      selectedGames: formValue.selectedGames ? formValue.selectedGames.map((g: Option) => g.code) : [],
      selectedPlatforms: formValue.selectedPlatforms ? formValue.selectedPlatforms.map((p: Option) => p.code) : [],

      teamName: formValue.teamName || ''
    };

    this.http.post<any[]>('http://localhost:8080/api/multigaming/search', searchCriteria)
      .subscribe(response => {
        this.currentPlayers = response.map(player => ({
          ...player,
          showDropdown: false,
          offers: [
            { name: "Fortnite", id: "for" },
            { name: "Valorant", id: "val" },
            { name: "League of Legends", id: "lol" },


          ]
        }));
        console.log(this.currentPlayers);
        this.updateLevelsCount(response); // Mise à jour des comptes des niveaux
      });
  }

  updateLevelsCount(resumes: any[]) {
    const counts: { [key: string]: number } = {
      'Amators': 0,
      'Organization': 0,
      'Company': 0,

    };



    this.levelsCount = counts;
  }
  toggleDropdown(player: Player) {
    player.showDropdown = !player.showDropdown;
  }

  getOfferIcon(type: string): string {
    switch (type) {
      case 'Player':
        return 'assets/images/rabia/player.png';
      case 'Sponsor':
        return 'assets/images/rabia/sponsor.png';
      // Add more cases as needed
      default:
        return 'assets/images/rabia/default.png';
    }
  }
}

