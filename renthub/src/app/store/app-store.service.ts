import { Injectable, OnInit } from '@angular/core';
import { Apartment } from '../interfaces/apartment.interface';

@Injectable({
  providedIn: 'root',
})
export class AppStore implements OnInit {
  filteredApartments: Apartment[] = [];
  filterCriteria = {};
  constructor() {}
  ngOnInit(): void {}

  setFilteredApartments(apartments: Apartment[]) {
    this.filteredApartments = apartments;
  }
  getFilteredApartments() {
    return this.filteredApartments;
  }
  setFilterCriteria(criteria: any) {
    this.filterCriteria = criteria;
  }
  getFilterCriteria() {
    return this.filterCriteria;
  }
}
