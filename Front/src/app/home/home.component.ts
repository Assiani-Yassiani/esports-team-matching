import { Component } from '@angular/core';
import { ConnectionService } from '../service/connection.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  conct!: any
  constructor(private conctService: ConnectionService, private route: Router) {

  }




  r() {
    this.conctService.currentConct.subscribe(conct => this.conct = conct


    );
    if (this.conct == true) {
      this.conct = true
      this.route.navigate(["/resume"])

    }
    else {
      this.conct = false
      $('#exampleModalCenter').modal('show');

    }







  }



}
