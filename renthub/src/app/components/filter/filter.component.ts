import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Amenity } from '../../enums/amenities.enum';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    CommonModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  filterForm!: FormGroup;
  amenitiesKeys: string[] = [];
  @Output() filterApplied = new EventEmitter<any>();
  @Output() resetFilter = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    const amenityControls: any = {};
    for (const key in Amenity) {
      amenityControls[key] = [false];
      this.amenitiesKeys.push(key);
    }
    console.log(this.amenitiesKeys);
    console.log(amenityControls);
    this.filterForm = this.fb.group({
      location: [''],
      price: [''],
      amenities: this.fb.group(amenityControls),
      vegetarian: [false],
      nonVegetarian: [false],
    });
  }

  applyFilters() {
    console.log(this.filterForm.value);
    const formValues = this.filterForm.value;
    // Filter out the amenities that are checked by user
    const selectedAmenities = Object.keys(formValues.amenities).filter(
      (key) => formValues.amenities[key]
    );
    const filters = {
      location: formValues.location,
      price: formValues.price,
      amenities: selectedAmenities,
      vegetarian: formValues.vegetarian,
      nonVegetarian: formValues.nonVegetarian,
    };
    this.filterApplied.emit(filters);
  }

  resetFilters() {
    this.filterForm.reset(); // set all value to null
    console.log(this.filterForm.value);
    const amenityControls: any = {};
    for (const key in Amenity) {
      amenityControls[key] = false;
    }
    this.filterForm.setValue({
      location: '',
      price: '',
      amenities: amenityControls,
      vegetarian: false,
      nonVegetarian: false,
    });
    const formValues = this.filterForm.value;
    const resettedFilters = {
      location: formValues.location,
      price: formValues.price,
      amenities: [],
      vegetarian: formValues.vegetarian,
    };
    console.log(this.filterForm.value);
    console.log(resettedFilters);
    this.resetFilter.emit(resettedFilters);
  }
}
