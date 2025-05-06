import { DBService } from './services/db.service';
import { Comment } from './interfaces/comments.interface';
import { User } from './interfaces/user.interface';
import { Apartment } from './interfaces/apartment.interface';
import { UtilityService } from './utils/utility.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Labels } from './enums/labels.enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  apartments: Apartment[] = [];
  comments: Comment[] = [];
  users: User[] = [];
  constructor(
    private utilityService: UtilityService,
    private dbService: DBService
  ) {}

  ngOnInit(): void {
    const apartmentsFromStorage = JSON.parse(
      localStorage.getItem(Labels.Apartments) || 'null'
    );
    const usersFromStorage = JSON.parse(
      localStorage.getItem(Labels.Users) || 'null'
    );
    const commentsFromStorage = JSON.parse(
      localStorage.getItem(Labels.Comments) || 'null'
    );

    // Load from localStorage if available, otherwise generate
    this.apartments =
      apartmentsFromStorage || this.dbService.generateApartments();
    this.users = usersFromStorage || this.dbService.generateUsers();
    this.comments =
      commentsFromStorage ||
      this.dbService.generateComments(this.apartments, this.users);

    //Persist data to local storage on app load
    this.utilityService.persistData(this.apartments, this.users, this.comments);
  }
  title = 'renthub';
}
