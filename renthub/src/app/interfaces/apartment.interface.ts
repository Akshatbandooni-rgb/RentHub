import { Amenity } from '../enums/amenities.enum';

export interface BaseApartment {
  id: string;
  title: string;
  description: string;
  image: string;
  featured?: boolean;
  furnished?: boolean;
}

export interface Apartment extends BaseApartment {
  price: number;
  location: string;
  amenities: Amenity[];
  vegetarian: boolean;
  landlordId?: string;
}

export interface ApartmentCardData extends BaseApartment {
  badge?: string;
  isFavorite?: boolean;
}
