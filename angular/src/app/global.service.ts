import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  days: number;
  username: string;
  id: number;
  login: boolean;
  location: string;

  constructor() {
    this.days = 3;
    this.username = 'test';
    this.id = 2;
    this.login = true;
    this.location = 'Pittsburgh';
  }

}
