import { Component } from '@angular/core';
import { MultiGamingServiceService } from '../service/multi-gaming-service.service';

@Component({
  selector: 'app-multigamingprofile',
  templateUrl: './multigamingprofile.component.html',
  styleUrl: './multigamingprofile.component.scss'
})
export class MultigamingprofileComponent {
  resume: any = {};
  items1: string[] = [];
  items2: string[] = [];
  items3: string[] = [];
  items4: string[] = [];
  items5: string[] = [];

  constructor(private TeamService: MultiGamingServiceService) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const id = localStorage.getItem("idm");
      if (id) {
        this.TeamService.getMultiGamingById(Number(id)).subscribe(
          data => {
            console.log(data)
            this.resume = data;
            this.items1 = this.stringToArray(this.resume.items1);
            this.items2 = this.stringToArray(this.resume.items2);
            this.items3 = this.stringToArray(this.resume.items3);
            this.items4 = this.stringToArray(this.resume.items4);

          },
          error => console.error('Error fetching resume', error)
        );
      }
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
  ngOnDestroy(): void {

  }


}
