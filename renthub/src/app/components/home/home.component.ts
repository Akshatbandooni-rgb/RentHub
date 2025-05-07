import { AppStore } from './../../store/app-store.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ApartmentCardComponent } from '../apartment-card/apartment-card.component';
import { DBService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import {
  Apartment,
  ApartmentCardData,
} from '../../interfaces/apartment.interface';
import { Amenity } from '../../enums/amenities.enum';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    RouterModule,
    ApartmentCardComponent,
    FilterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  apartments: Apartment[] = [];
  filteredApartments: ApartmentCardData[] = [];
  pageSize = 6;
  pageIndex = 0;
  pageSizeOptions = [6, 12, 18, 24, 48];
  featuredListings: Apartment[] = [];
  featuredIndex = 0;
  filterCriteria = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private db: DBService,
    private authService: AuthService,
    private appStore: AppStore
  ) {}

  ngOnInit(): void {
    const amenityControls: any = {};
    for (const key in Amenity) {
      amenityControls[key] = [false];
    }
    this.searchForm = this.fb.group({
      location: [''],
      minPrice: [''],
      maxPrice: [''],
      amenities: this.fb.group(amenityControls),
      vegetarian: [''],
    });

    const storedApartments = this.appStore.getFilteredApartments();
    const storedFilterCriteria = this.appStore.getFilterCriteria();
    if (storedApartments && storedApartments.length > 0) {
      this.apartments = storedApartments;
    } else {
      this.apartments = this.db.getAllApartments();
    }
    if (storedFilterCriteria) {
      this.filterCriteria = storedFilterCriteria;
    }

    this.filteredApartments = [...this.apartments].map((apartment) => ({
      ...apartment,
      isFavorite: false,
    }));

    this.featuredListings = this.apartments.filter(
      (apartment) => apartment.featured
    );
  }

  prevFeatured(): void {
    this.featuredIndex =
      (this.featuredIndex - 1 + this.featuredListings.length) %
      this.featuredListings.length;
  }

  nextFeatured(): void {
    this.featuredIndex =
      (this.featuredIndex + 1) % this.featuredListings.length;
  }

  viewDetails(id: string): void {
    this.router.navigate(['/details', id]);
  }

  filterApartments(filters: any): void {
    this.filterCriteria = filters;
    debugger;
    const { location, price, amenities, vegetarian, nonVegetarian } = filters;

    let results = this.apartments;
    if (location?.trim()) {
      const loc = location.trim().toLowerCase();
      results = results.filter((apartment) =>
        apartment.location?.toLowerCase().includes(loc)
      );
    }

    if (price) {
      results = results.filter((apartment) => apartment.price <= price);
    }

    if (vegetarian && !nonVegetarian) {
      results = results.filter((apartment) => apartment.vegetarian === true);
    } else if (!vegetarian && nonVegetarian) {
      results = results.filter((apartment) => apartment.vegetarian === false);
    }

    if (amenities && amenities.length > 0) {
      results = results.filter((apartment) => {
        return amenities.every((amenity: keyof typeof Amenity) => {
          const enumValue = Amenity[amenity];
          const match = apartment.amenities.includes(enumValue);
          return match;
        });
      });
    }

    this.filteredApartments = [...results];

    console.log('Filters:', filters);
    console.log('Filtered Apartments:', this.filteredApartments);
  }

  resetFilters(filters: any): void {
    this.filterCriteria = filters;
    console.log('Reset Filters:', filters);
    this.apartments = this.db.getAllApartments();
    this.filteredApartments = [...this.apartments];
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  toggleFavorite(apartmentId: string): void {
    const user = this.authService.getLoggedInUser();
    if (!user) return;

    const isFavorite = this.db.isApartmentFavoritedByUser(user.id, apartmentId);
    const response = isFavorite
      ? this.db.removeFavorite(user.id, apartmentId)
      : this.db.markAsFavorite(user.id, apartmentId);

    if (response.isSuccess) {
      this.updateApartmentFavoriteStatus(apartmentId, !isFavorite);
    } else {
      console.error(
        `Error ${isFavorite ? 'removing' : 'adding'} favorite:`,
        response.message
      );
    }
  }

  private updateApartmentFavoriteStatus(
    apartmentId: string,
    isFavorite: boolean
  ): void {
    this.filteredApartments = this.filteredApartments.map((apartment) =>
      apartment.id === apartmentId ? { ...apartment, isFavorite } : apartment
    );
  }

  ngOnDestroy(): void {
    this.appStore.setFilteredApartments(this.filteredApartments);
    this.appStore.setFilterCriteria(this.filterCriteria);
  }
}
