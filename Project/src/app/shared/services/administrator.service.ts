import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  public my_name;

  public root = {
    administrator: null
  }

  constructor(private http: HttpClient, private router: Router) { }

  public get_user_name(token: number): void {

    let observable = this.http.get(`http://localhost:8080/users/name/0?token=${token}`);

    observable.subscribe(

      res => {

        this.my_name = res;


      },
      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

}
