import { Amenity } from './../../enums/amenities.enum';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Apartment } from '../../interfaces/apartment.interface';
import { DBService } from '../../services/db.service';

@Component({
  selector: 'app-post-listing',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
  ],
  templateUrl: './post-listing.component.html',
  styleUrl: './post-listing.component.scss',
})
export class PostListingComponent implements OnInit {
  postForm: FormGroup;
  previewData: Apartment | null = null;
  selectedFile: File | null = null;
  amenities: { [key: string]: string } = {};
  amenitiesKeys: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dbService: DBService
  ) {
    const amenities = Object.keys(Amenity).reduce(
      (acc: Record<string, boolean>, key: string) => {
        acc[key] = false;
        return acc;
      },
      {}
    );
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      location: ['', [Validators.required]],
      furnished: [false],
      vegetarian: [''],
      amenities: this.fb.group(amenities),
    });
  }

  ngOnInit(): void {
    this.amenities = Amenity;
    this.amenitiesKeys = Object.keys(this.amenities);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  generatePreview(): void {
    if (this.postForm.valid && this.selectedFile) {
      const formValue = this.postForm.value;
      const amenities = Object.entries(formValue.amenities)
        .filter(([_, value]) => value)
        .map(([key]) => key);

      this.previewData = {
        ...formValue,
        amenities,
        image: URL.createObjectURL(this.selectedFile),
      };
    }
  }

  submitListing(): void {
    if (this.previewData) {
      // In a real app, this would save to a backend
      console.log('Submitting listing:', this.previewData);
      this.dbService.addApartment(this.previewData);
      this.router.navigate(['/']);
    }
  }
}
