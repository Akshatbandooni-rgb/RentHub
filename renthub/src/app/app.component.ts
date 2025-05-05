import { DBService } from './services/db.service';
import { Comment } from './interfaces/comments.interface';
import { User } from './interfaces/user.interface';
import { Apartment } from './interfaces/apartment.interface';
import { UtilityService } from './utils/utility.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

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
    this.apartments = this.dbService.generateApartments();
    this.comments = this.dbService.generateComments(this.apartments);
    this.users = this.dbService.generateUsers();
    //Persist data to local storage on app load
    this.utilityService.persistData(this.apartments, this.users, this.comments);
  }
  title = 'renthub';
}
