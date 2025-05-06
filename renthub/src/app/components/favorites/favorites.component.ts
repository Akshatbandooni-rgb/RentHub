import { DBService } from './../../services/db.service';
import { UtilityService } from './../../utils/utility.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { Favorite } from '../../interfaces/favorite.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { Apartment } from '../../interfaces/apartment.interface';

@Component({
  selector: 'app-favorites',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatRippleModule,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  loggedInUser: User | null = null;
  favorites: Apartment[] = [];

  constructor(
    private utilityService: UtilityService,
    private dbService: DBService
  ) {}

  ngOnInit(): void {
    this.utilityService.loggedInUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.loggedInUser = user;
        }
      });
    this.loadUserFavorites();
  }

  loadUserFavorites() {
    debugger;
    if (!this.loggedInUser) {
      this.favorites = [];
      return;
    }
    const favorites: Favorite[] = this.dbService.getUserFavorites(
      this.loggedInUser?.id || ''
    );
    this.favorites = favorites
      .map((favorite) => this.dbService.getApartmentById(favorite.apartmentId))
      .filter((apartment) => apartment !== null);
  }

  removeFromFavorites(apartment: Apartment) {
    if (!this.loggedInUser) {
      this.favorites = [];
      return;
    }
    const response = this.dbService.removeFavorite(
      this.loggedInUser?.id || '',
      apartment.id
    );
    if (response.isSuccess) {
      this.loadUserFavorites();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
