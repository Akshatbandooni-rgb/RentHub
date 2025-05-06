import { UtilityService } from './../../utils/utility.service';
import { Component, OnInit } from '@angular/core';
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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  apartments: Apartment[] = [];
  filteredApartments: ApartmentCardData[] = [];
  pageSize = 6;
  pageIndex = 0;
  pageSizeOptions = [6, 12, 18, 24, 48];

  // Featured listings logic
  featuredListings: Apartment[] = [];
  featuredIndex = 0;
  IMG_URL =
    'https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf-near-bookshelf_105762-2224.jpg?semt=ais_hybrid&w=740';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private db: DBService,
    private authService: AuthService,
    private utilityService: UtilityService
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

    // Mock data
    this.apartments = this.db.getAllApartments();

    this.filteredApartments = [...this.apartments].map((apartment) => ({
      ...apartment,
      isFavorite: false,
    }));

    this.featuredListings = this.apartments.filter(
      (apartment) => apartment.featured
    );

    this.searchForm.valueChanges.subscribe(() => {
      this.filterApartments();
    });
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

  filterApartments(): void {
    const formValue = this.searchForm.value;
    this.filteredApartments = this.apartments
      .filter((apartment) => {
        const locationMatch =
          !formValue.location ||
          apartment.location
            .toLowerCase()
            .includes(formValue.location.toLowerCase());
        const priceMatch =
          (!formValue.minPrice || apartment.price >= formValue.minPrice) &&
          (!formValue.maxPrice || apartment.price <= formValue.maxPrice);
        const vegetarianMatch =
          !formValue.vegetarian ||
          apartment.vegetarian === (formValue.vegetarian === 'yes');
        const amenitiesMatch = Object.entries(formValue.amenities).every(
          ([key, value]) =>
            !value || apartment.amenities.includes(key as Amenity)
        );

        return locationMatch && priceMatch && vegetarianMatch && amenitiesMatch;
      })
      .map((apartment) => ({ ...apartment, isFavorite: false }));
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
}
