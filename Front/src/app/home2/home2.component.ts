import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';

declare var $: any;
@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrl: './home2.component.scss'
})
export class Home2Component {


  conct!: any
  constructor(private conctService: ConnectionService, private route: Router) {

  }




  r() {


    if (this.conctService.getAuth() == true) {
      this.conct = true
      this.route.navigate(["/resume"]).then(() => {
        window.location.reload();
      });

    }
    else {
      this.conct = false
      $('#exampleModalCenter').modal('show');

    }







  }
}
