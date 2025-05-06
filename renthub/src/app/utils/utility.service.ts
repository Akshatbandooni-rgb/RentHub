import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Apartment } from '../interfaces/apartment.interface';
import { Amenity } from '../enums/amenities.enum';
import { User } from '../interfaces/user.interface';
import { Comment } from '../interfaces/comments.interface';
import { Labels } from '../enums/labels.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  private loggedInUserSubject = new BehaviorSubject<User | null>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  constructor() {
    const loggedInUser = localStorage.getItem(Labels.LoggedInUser);
    const token = localStorage.getItem(Labels.JWTToken);
    if (token && loggedInUser) {
      this.loggedInUserSubject.next(JSON.parse(loggedInUser));
    }
  }

  persistData(
    apartments: Apartment[] | null,
    users: User[] | null,
    comments: Comment[] | null
  ): void {
    if (apartments !== null) {
      localStorage.setItem(Labels.Apartments, JSON.stringify(apartments));
    }
    if (users !== null) {
      localStorage.setItem(Labels.Users, JSON.stringify(users));
    }
    if (comments !== null) {
      localStorage.setItem(Labels.Comments, JSON.stringify(comments));
    }
  }

  setLoggedInUser(user: User | null): void {
    this.loggedInUserSubject.next(user);
  }

  getLoggedInUser(): User | null {
    return this.loggedInUserSubject.getValue();
  }
}
