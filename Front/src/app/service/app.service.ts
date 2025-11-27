import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Assurez-vous d'importer 'of'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = 'http://localhost:8080/api'; // Remplacez par votre URL API

  constructor(private http: HttpClient) { }

  createApp(ido: number, idr: number, idt: number): Observable<any> {
    const url = `${this.apiUrl}/app/${ido}/${idr}/${idt}`;
    return this.http.post<any>(url, null).pipe(
      catchError(this.handleError<any>('createOffre', []))
    );
  }

  findResumeByGameAndPlatform(userId: number, searchRequest: any): Observable<any> {
    const url = `${this.apiUrl}/app/find/${userId}`;
    return this.http.post<any>(url, searchRequest).pipe(
      catchError(this.handleError<any>('findResumeByGameAndPlatform', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log to console
      return of(result as T); // Let the app keep running by returning an empty result
    };
  }


  create(app: any, idt: number, idr: number): Observable<any> {
    const url = `${this.apiUrl}/app/recruite/${idt}/${idr}`;
    return this.http.post<any>(url, app).pipe(
      catchError(this.handleError<any>('createOffre', []))
    );
  }

  findteamByGameAndPlatform(userId: number, searchRequest: any): Observable<any> {
    const url = `${this.apiUrl}/app/find/team/${userId}`;
    return this.http.post<any>(url, searchRequest).pipe(
      catchError(this.handleError<any>('findResumeByGameAndPlatform', []))
    );
  }


  viewOffer(id: number): Observable<any> {
    const url = `${this.apiUrl}/app/offer/view/${id}`;
    return this.http.put(url, null).pipe(
      catchError(this.handleError<any>('view', []))
    );


  }

  statusOffer(id: number, link: string) {



    const url = `${this.apiUrl}/app/offer/status/${id}/a}`;
    return this.http.put(url, null).pipe(
      catchError(this.handleError<any>('status', []))
    );



  }
  viewPlayer(id: number): Observable<any> {
    const url = `${this.apiUrl}/app/player/view/${id}`;
    return this.http.put(url, null).pipe(
      catchError(this.handleError<any>('view', []))
    );


  }

  statusPlayer(id: number) {
    const url = `${this.apiUrl}/app/player/status/${id}`;
    return this.http.put(url, null).pipe(
      catchError(this.handleError<any>('status', []))
    );



  }



}
