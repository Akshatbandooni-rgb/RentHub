import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FilterComponent } from './filter.component';

fdescribe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCheckboxModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        FilterComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.filterForm.value).toEqual({
      location: '',
      price: '',
      amenities: {
        Wifi: false,
        AirConditioning: false,
        Parking: false,
        Gym: false,
        SwimmingPool: false,
        Elevator: false,
        Laundry: false,
        PetFriendly: false,
      },
      vegetarian: false,
      nonVegetarian: false,
    });
  });

  it('should emit filter changes when the form is updated', () => {
    spyOn(component.filterApplied, 'emit');

    component.filterForm.patchValue({
      location: 'Downtown',
      price: '1000',
      amenities: {
        Wifi: true,
        Parking: true,
        SwimmingPool: false,
      },
      vegetarian: true,
      nonVegetarian: false,
    });

    component.applyFilters();

    expect(component.filterApplied.emit).toHaveBeenCalledWith({
      location: 'Downtown',
      price: '1000',
      amenities: ['Wifi', 'Parking'],
      vegetarian: true,
      nonVegetarian: false,
    });
  });

  it('should reset the form to default values', () => {
    component.filterForm.patchValue({
      location: 'Downtown',
      price: '1000',
      amenities: {
        Wifi: true,
        Parking: true,
        SwimmingPool: false,
      },
      vegetarian: true,
      nonVegetarian: true,
    });

    component.resetFilters();

    expect(component.filterForm.value).toEqual({
      location: '',
      price: '',
      amenities: {
        Wifi: false,
        AirConditioning: false,
        Parking: false,
        Gym: false,
        SwimmingPool: false,
        Elevator: false,
        Laundry: false,
        PetFriendly: false,
      },
      vegetarian: false,
      nonVegetarian: false,
    });
  });
});
