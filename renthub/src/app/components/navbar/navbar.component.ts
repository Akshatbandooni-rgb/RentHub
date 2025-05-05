import { UtilityService } from './../../utils/utility.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  userName: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private utilityService: UtilityService
  ) {}
  ngOnInit(): void {
    debugger;
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userName = this.authService.getLoggedInUser()?.name ?? '';
    // Subscribe to the loggedInUser observable to get the current user
    this.utilityService.loggedInUser$.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.userName = user.name;
      } else {
        this.isAuthenticated = false;
        this.userName = '';
      }
    });
  }

  logout() {
    const response = this.authService.logout();
    if (response.isSuccess) {
      this.isAuthenticated = false;
      this.userName = '';
    }
    // Navigate to the login page after logout
    this.router.navigate(['/login']);
  }
}
