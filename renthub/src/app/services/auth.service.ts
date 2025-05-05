import { Labels } from '../enums/labels.enum';
import { APIResponse } from '../interfaces/APIResponse.interface';
import { User } from '../interfaces/user.interface';
import { DBService } from './db.service';
import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private dbService: DBService) {}

  login(email: string, password: string): APIResponse {
    const users = this.dbService.getAllUsers();
    const user = users.find((user) => user.email === email);
    if (!user) {
      return {
        isSuccess: false,
        message: Labels.UserNotFound,
      };
    }
    if (user.password !== password) {
      return {
        isSuccess: false,
        message: Labels.InvalidPassword,
      };
    }
    // Store user data in local storage
    localStorage.setItem(Labels.JWTToken, user.id);
    localStorage.setItem(Labels.LoggedInUser, JSON.stringify(user));
    return {
      isSuccess: true,
      message: Labels.UserLoggedInSuccess,
      data: user,
    };
  }

  logout(): APIResponse {
    localStorage.removeItem(Labels.JWTToken);
    localStorage.removeItem(Labels.LoggedInUser);
    return {
      isSuccess: true,
      message: Labels.UserLoggedOutSucess,
    };
  }

  register(email: string, password: string, name: string): APIResponse {
    const newUser: User = {
      id: uuid.v4(),
      name: name,
      email: email,
      password: password,
    };
    const response = this.dbService.addUser(newUser);
    if (!response.isSuccess) {
      return {
        isSuccess: false,
        message: Labels.UserAlreadyExists,
      };
    }
    return {
      isSuccess: true,
      message: Labels.UserRegisteredSuccess,
      data: newUser,
    };
  }

  getLoggedInUser(): User | null {
    const user = localStorage.getItem(Labels.LoggedInUser);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(Labels.JWTToken);
    if (token) {
      return true;
    }
    return false;
  }
}
