import { Component, OnInit } from '@angular/core';
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

  amenityLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

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
      vegetarian: [''],
    });
  }

  handleClick() {
    console.log(this.filterForm);
  }
}
