import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  days: number;
  username: string;
  id: number;
  login: boolean;
  location: string;

  constructor() {
/*
    this.days = 3;
    this.username = 'Alvin';
    this.id = 2;
    this.login = true;
    this.location = 'New York';
  */
    this.days = 0;
    this.username = '';
    this.id = 0;
    this.login = false;
    this.location = '';

  }

}
