import { UtilityService } from './../utils/utility.service';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Apartment } from '../interfaces/apartment.interface';
import { Amenity } from '../enums/amenities.enum';
import { User } from '../interfaces/user.interface';
import { Comment } from '../interfaces/comments.interface';
import { Labels } from '../enums/labels.enum';
import { APIResponse } from '../interfaces/APIResponse.interface';
import { Favorite } from '../interfaces/favorite.interface';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  private destroy$ = new Subject<void>();
  loggedInUser: User | null = null;
  constructor(private utilityService: UtilityService) {
    this.utilityService.loggedInUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.loggedInUser = user;
        }
      });
  }

  generateApartments(): Apartment[] {
    return [
      {
        id: uuidv4(),
        title: 'Modern Studio in City Center',
        price: 1200,
        location: 'Downtown',
        description:
          'A stylish studio apartment near cafes and metro stations.',
        image: this.utilityService.getAssetPath('apartment1.jpg'),
        amenities: [Amenity.Wifi, Amenity.Parking],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Luxury 2BHK with Park View',
        price: 2200,
        location: 'Uptown',
        description: 'Spacious 2BHK with stunning park views and balcony.',
        image: this.utilityService.getAssetPath('apartment2.jpg'),
        amenities: [Amenity.Wifi],
        vegetarian: false,
        featured: true,
      },
      {
        id: uuidv4(),
        title: 'Affordable 1BHK Near Metro',
        price: 950,
        location: 'Suburbs',
        description: 'Cozy 1BHK apartment ideal for professionals or couples.',
        image: this.utilityService.getAssetPath('apartment3.jpg'),
        amenities: [Amenity.Wifi, Amenity.Laundry],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Compact Studio for Students',
        price: 700,
        location: 'Campus Area',
        description:
          'Affordable and functional studio for university students.',
        image: this.utilityService.getAssetPath('apartment1.jpg'),
        amenities: [Amenity.Wifi, Amenity.Laundry],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Family-Friendly 3BHK',
        price: 1800,
        location: 'Greenfield',
        description: 'Large 3-bedroom apartment near schools and parks.',
        image: this.utilityService.getAssetPath('apartment1.jpg'),
        amenities: [
          Amenity.Wifi,
          Amenity.Parking,
          Amenity.Gym,
          Amenity.PetFriendly,
        ],
        vegetarian: false,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Penthouse with Rooftop Access',
        price: 3200,
        location: 'Downtown',
        description:
          'Exclusive penthouse with private rooftop and smart home tech.',
        image: this.utilityService.getAssetPath('apartment2.jpg'),
        amenities: [Amenity.Wifi, Amenity.Gym, Amenity.SwimmingPool],
        vegetarian: false,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Pet-Friendly 2BHK',
        price: 1600,
        location: 'West End',
        description: 'Spacious 2BHK near dog park and public transport.',
        image: this.utilityService.getAssetPath('apartment3.jpg'),
        amenities: [Amenity.Wifi, Amenity.PetFriendly, Amenity.Parking],
        vegetarian: true,
        featured: true,
      },
      {
        id: uuidv4(),
        title: 'Smart Studio Apartment',
        price: 1250,
        location: 'City Edge',
        description: 'Modern studio with smart locks and lighting.',
        image: this.utilityService.getAssetPath('apartment4.jpg'),
        amenities: [Amenity.Wifi],
        vegetarian: false,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Shared 2BHK for Professionals',
        price: 850,
        location: 'Tech Park',
        description: 'Fully furnished and ideal for IT professionals.',
        image: this.utilityService.getAssetPath('apartment5.jpg'),
        amenities: [Amenity.Wifi, Amenity.Gym, Amenity.Laundry],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Cozy 1BHK with Garden Access',
        price: 1050,
        location: 'Midtown',
        description: 'Quiet 1BHK with a shared garden and reading nook.',
        image: this.utilityService.getAssetPath('apartment6.jpg'),
        amenities: [Amenity.Wifi],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Spacious Studio Apartment',
        price: 1100,
        location: 'South City',
        description: 'Open layout studio near shopping district.',
        image: this.utilityService.getAssetPath('apartment7.jpg'),
        amenities: [Amenity.Wifi, Amenity.Parking],
        vegetarian: false,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Urban 2BHK Loft',
        price: 1900,
        location: 'Warehouse District',
        description:
          'Industrial-style loft with high ceilings and large windows.',
        image: this.utilityService.getAssetPath('apartment8.jpg'),
        amenities: [Amenity.Wifi, Amenity.Parking, Amenity.Gym],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Minimalist 1BHK',
        price: 980,
        location: 'Old Town',
        description: 'Simple and elegant space for quiet living.',
        image: this.utilityService.getAssetPath('apartment9.jpg'),
        amenities: [Amenity.Wifi],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Stylish 3BHK for Families',
        price: 2000,
        location: 'Central Plaza',
        description: 'Modern interiors, ideal for a family of four.',
        image: this.utilityService.getAssetPath('apartment10.jpg'),
        amenities: [Amenity.Wifi, Amenity.Parking],
        vegetarian: false,
        featured: false,
      },
      {
        id: uuidv4(),
        title: "Bachelor's Pad - 1RK",
        price: 850,
        location: 'East Side',
        description: 'Compact single-room flat for solo renters.',
        image: this.utilityService.getAssetPath('apartment11.jpg'),
        amenities: [Amenity.Wifi, Amenity.Laundry],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Luxury Apartment with Pool Access',
        price: 2400,
        location: 'Heights',
        description: 'Includes private pool access and covered parking.',
        image: this.utilityService.getAssetPath('apartment12.jpg'),
        amenities: [
          Amenity.Wifi,
          Amenity.SwimmingPool,
          Amenity.Gym,
          Amenity.Parking,
        ],
        vegetarian: false,
        featured: false,
      },
      {
        id: uuidv4(),
        title: '1BHK with Private Terrace',
        price: 1400,
        location: 'Sunrise Colony',
        description: 'Great sunlight and a private terrace garden.',
        image: this.utilityService.getAssetPath('apartment13.jpg'),
        amenities: [Amenity.Wifi],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Budget 1BHK for Rent',
        price: 800,
        location: 'North Hills',
        description: 'Simple 1BHK for affordable urban living.',
        image: this.utilityService.getAssetPath('apartment14.jpg'),
        amenities: [Amenity.Wifi],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Fully Furnished Studio',
        price: 1300,
        location: 'City Square',
        description: 'Equipped with all essentials. Move-in ready.',
        image: this.utilityService.getAssetPath('apartment15.jpg'),
        amenities: [Amenity.Wifi, Amenity.Laundry],
        vegetarian: false,
        featured: true,
      },
      {
        id: uuidv4(),
        title: 'Modern Duplex Apartment',
        price: 2500,
        location: 'Lakeview',
        description: 'Duplex apartment with lake view and mezzanine.',
        image: this.utilityService.getAssetPath('apartment16.avif'),
        amenities: [Amenity.Wifi],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Compact 1RK for Students',
        price: 750,
        location: 'Hostel Area',
        description: 'Ideal for students with shared laundry and kitchen.',
        image: this.utilityService.getAssetPath('apartment1.jpg'),
        amenities: [Amenity.Wifi, Amenity.Laundry],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Rustic 2BHK Apartment',
        price: 1550,
        location: 'Countryside',
        description: 'Wood finish interiors and garden access.',
        image: this.utilityService.getAssetPath('apartment1.jpg'),
        amenities: [Amenity.Wifi, Amenity.Parking],
        vegetarian: false,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'High-Rise Luxury Studio',
        price: 2000,
        location: 'Skyline Towers',
        description: 'Live above the city with panoramic views.',
        image: this.utilityService.getAssetPath('apartment1.jpg'),
        amenities: [
          Amenity.Wifi,
          Amenity.Gym,
          Amenity.SwimmingPool,
          Amenity.Parking,
        ],
        vegetarian: false,
        featured: false,
      },
      {
        id: uuidv4(),
        title: '3BHK with Study Room',
        price: 1850,
        location: 'Knowledge Park',
        description: 'Ideal for families with kids or work-from-home setups.',
        image: this.utilityService.getAssetPath('apartment1.jpg'),
        amenities: [Amenity.Wifi],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Co-living Space with Shared Kitchen',
        price: 600,
        location: 'City Hostel',
        description: 'Affordable co-living option with good community.',
        image: this.utilityService.getAssetPath('apartment1.jpg'),
        amenities: [Amenity.Wifi],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Luxury 4BHK Villa',
        price: 4500,
        location: 'Golf Course Road',
        description: 'Sprawling villa with garden, pool, and servant quarters.',
        image: this.utilityService.getAssetPath('apartment1.jpg'),
        amenities: [
          Amenity.Wifi,
          Amenity.SwimmingPool,
          Amenity.Parking,
          Amenity.PetFriendly,
        ],
        vegetarian: false,
        featured: true,
      },
      {
        id: uuidv4(),
        title: 'Eco-Friendly Studio',
        price: 1000,
        location: 'Eco Town',
        description: 'Built with sustainable materials and green energy.',
        image: this.utilityService.getAssetPath('apartment1.jpg'),
        amenities: [Amenity.Wifi],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Seaside 2BHK Apartment',
        price: 2600,
        location: 'Beach Road',
        description: 'Wake up to sea breeze and stunning views.',
        image: this.utilityService.getAssetPath('apartment1.jpg'),
        amenities: [Amenity.Wifi, Amenity.Parking],
        vegetarian: false,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Compact Flat in IT Hub',
        price: 1450,
        location: 'Cyber City',
        description: 'Close to tech offices with all basic amenities.',
        image: this.utilityService.getAssetPath('apartment1.jpg'),
        amenities: [Amenity.Wifi, Amenity.Parking],
        vegetarian: true,
        featured: false,
      },
      {
        id: uuidv4(),
        title: 'Shared 3BHK for Girls',
        price: 950,
        location: 'College Road',
        description: 'Safe and well-maintained apartment for female tenants.',
        image: this.utilityService.getAssetPath('apartment1.jpg'),
        amenities: [Amenity.Wifi, Amenity.Laundry],
        vegetarian: true,
        featured: false,
      },
    ];
  }

  generateUsers(): User[] {
    return [
      {
        id: uuidv4(),
        name: 'Akshat Bandooni',
        email: 'Akshat@gmail.com',
        password: 'Akshat@123',
      },
    ];
  }

  generateComments(apartments: Apartment[], users: User[]): Comment[] {
    return [
      {
        id: uuidv4(),
        apartmentId: apartments[0].id,
        userId: users[0].id,
        content: 'Amazing apartment!',
        timestamp: new Date(),
      },
      {
        id: uuidv4(),
        apartmentId: apartments[1].id,
        userId: users[0].id,
        content: 'Loved the amenities!',
        timestamp: new Date(),
      },
      {
        id: uuidv4(),
        apartmentId: apartments[2].id,
        userId: users[0].id,
        content: 'Great value for money.',
        timestamp: new Date(),
      },
      {
        id: uuidv4(),
        apartmentId: apartments[3].id,
        userId: users[0].id,
        content: 'Very cozy and comfortable.',
        timestamp: new Date(),
      },
    ];
  }

  getAllApartments(): Apartment[] {
    const apartmentsData = localStorage.getItem(Labels.Apartments);
    const apartments: Apartment[] = apartmentsData
      ? JSON.parse(apartmentsData)
      : [];

    const userId = this.loggedInUser?.id || '';
    const userFavorites = this.getUserFavorites(userId);

    if (userFavorites.length > 0) {
      const favoriteApartmentIds = new Set(
        userFavorites.map((fav) => fav.apartmentId)
      );

      apartments.forEach((apartment) => {
        apartment.isFavorite = favoriteApartmentIds.has(apartment.id);
      });
    }

    return apartments;
  }

  getApartmentById(id: string): Apartment | null {
    const apartments = this.getAllApartments();
    return apartments.find((apartment) => apartment.id === id) || null;
  }

  getAllComments(): Comment[] {
    const comments = localStorage.getItem(Labels.Comments);
    return comments ? JSON.parse(comments) : [];
  }

  getCommentsForApartment(apartmentId: string): Comment[] {
    const allComments = this.getAllComments();
    return allComments.filter((comment) => {
      return comment.apartmentId === apartmentId;
    });
  }

  addComment(comment: Comment): APIResponse {
    if (!comment.apartmentId || !comment.userId) {
      return {
        isSuccess: false,
        message: 'Invalid apartment or user ID',
      };
    }
    const allComments = this.getAllComments();
    allComments.push(comment);
    localStorage.setItem(Labels.Comments, JSON.stringify(allComments));
    return {
      isSuccess: true,
      message: 'Comment added successfully',
      data: comment,
    };
  }

  getAllUsers(): User[] {
    const users = localStorage.getItem(Labels.Users);
    return users ? JSON.parse(users) : [];
  }

  getUserById(id: string): User | null {
    const users = this.getAllUsers();
    return users.find((user) => user.id === id) || null;
  }

  addUser(newUser: User): APIResponse {
    const users = this.getAllUsers();
    const user = users.find((user) => user.email === newUser.email);
    if (user) {
      return {
        isSuccess: false,
        message: Labels.UserAlreadyExists,
      };
    }
    users.push(newUser);
    localStorage.setItem(Labels.Users, JSON.stringify(users));
    return {
      isSuccess: true,
      message: Labels.UserRegisteredSuccess,
      data: newUser,
    };
  }

  addApartment(apartment: Apartment): APIResponse {
    const apartments = this.getAllApartments();
    apartments.push(apartment);
    localStorage.setItem(Labels.Apartments, JSON.stringify(apartments));
    return {
      isSuccess: true,
      message: Labels.ApartmentListedSuccess,
      data: apartment,
    };
  }

  getAllFavorites(): Favorite[] {
    const favorites = localStorage.getItem(Labels.UserFavorites);
    return favorites ? JSON.parse(favorites) : [];
  }

  getUserFavorites(userId: string): Favorite[] {
    const favorites = this.getAllFavorites();
    return favorites.filter((favorite) => {
      return favorite.userId === userId;
    });
  }

  isApartmentFavoritedByUser(userId: string, apartmentId: string): boolean {
    const favorites = this.getUserFavorites(userId);
    return favorites.some((favorite) => favorite.apartmentId === apartmentId);
  }

  markAsFavorite(userId: string, apartmentId: string): APIResponse {
    if (!userId || !apartmentId) {
      return {
        isSuccess: false,
        message: 'Invalid user or apartment ID',
      };
    }
    const favorites = this.getAllFavorites();
    const existingFavorite = favorites.find(
      (favorite) =>
        favorite.userId === userId && favorite.apartmentId === apartmentId
    );
    if (existingFavorite) {
      return {
        isSuccess: false,
        message: 'Already marked as favorite',
      };
    }
    const newFavorite: Favorite = {
      userId,
      apartmentId,
    };
    favorites.push(newFavorite);
    localStorage.setItem(Labels.UserFavorites, JSON.stringify(favorites));
    return {
      isSuccess: true,
      message: 'Marked as favorite',
      data: apartmentId,
    };
  }

  removeFavorite(userId: string, apartmentId: string): APIResponse {
    const allFavorites = this.getAllFavorites();

    const filteredFavorites = allFavorites.filter(
      (favorite) =>
        !(favorite.userId === userId && favorite.apartmentId === apartmentId)
    );

    if (allFavorites.length === filteredFavorites.length) {
      return {
        isSuccess: false,
        message: 'Favorite not found',
      };
    }

    localStorage.setItem(
      Labels.UserFavorites,
      JSON.stringify(filteredFavorites)
    );

    return {
      isSuccess: true,
      message: 'Removed from favorites',
      data: apartmentId,
    };
  }
}
