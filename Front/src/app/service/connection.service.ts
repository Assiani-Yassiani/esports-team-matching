import { Injectable } from '@angular/core';
import { resourceUsage } from 'process';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private conctSource = new BehaviorSubject<boolean>(false);
  currentConct = this.conctSource.asObservable();

  constructor() { }

  changeConct(conct: boolean) {
    this.conctSource.next(conct);

  }


  SetAuth(auth: string) {

    localStorage.setItem("auth", auth)


  }
  SetUserAuth(auth: string) {

    localStorage.setItem("user", auth)


  }

  getAuth() {

    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem("auth") == "true") { return true }
      else {
        return false
      }
    } else {
      // Gestion alternative si localStorage n'est pas disponible
      return false;
    }
  }
  getUserAuth() {

    if (typeof localStorage !== 'undefined') {

      return localStorage.getItem("user")
    }
    return -1


  }



}
