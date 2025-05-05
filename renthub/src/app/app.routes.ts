import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { PostListingComponent } from './components/post-listing/post-listing.component';
import { ApartmentDetailsComponent } from './components/apartment-details/apartment-details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'post', component: PostListingComponent, canActivate: [authGuard] },
  { path: 'details/:id', component: ApartmentDetailsComponent },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
