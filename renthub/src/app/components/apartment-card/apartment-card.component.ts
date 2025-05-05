import { UtilityService } from './../../utils/utility.service';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ApartmentCardData } from '../../interfaces/apartment.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-apartment-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './apartment-card.component.html',
  styleUrl: './apartment-card.component.scss',
})
export class ApartmentCardComponent implements OnInit, OnDestroy {
  utilityService = inject(UtilityService);
  isAuthenticated: boolean = false;
  private destroy$ = new Subject<void>();

  @Input() apartment!: ApartmentCardData;
  @Output() viewDetails = new EventEmitter<string>();
  @Output() toggleFavorite = new EventEmitter<string>();

  ngOnInit(): void {
    this.utilityService.loggedInUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      });
  }

  viewApartmentDetails(apartment: ApartmentCardData): void {
    console.log('viewApartmentDetails', apartment);
    this.viewDetails.emit(apartment.id);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
