import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
@Injectable({
  providedIn: 'root',
})
export class Users {
 
  constructor(private http: HttpClient){

  }
  getUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');

  }
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
