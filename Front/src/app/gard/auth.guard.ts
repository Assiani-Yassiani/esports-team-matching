import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ConnectionService } from '../service/connection.service';
declare var $: any;
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private conctService: ConnectionService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user = this.conctService.getAuth();
    if (user) {
      return true;
    }
    console.log("hhhhhhhhhhhh")
    this.router.navigate(['']);
    $('#exampleModalCenter').modal('show');
    return false;

  }
}
