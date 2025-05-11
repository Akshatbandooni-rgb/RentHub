import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { DBService } from './db.service';
import { UtilityService } from '../utils/utility.service';
import { Labels } from '../enums/labels.enum';
import { User } from '../interfaces/user.interface';

fdescribe('AuthService', () => {
  let service: AuthService;
  let dbServiceMock: jasmine.SpyObj<DBService>;
  let utilityServiceMock: jasmine.SpyObj<UtilityService>;

  beforeEach(() => {
    dbServiceMock = jasmine.createSpyObj('DBService', [
      'getAllUsers',
      'addUser',
    ]);
    utilityServiceMock = jasmine.createSpyObj('UtilityService', [
      'setLoggedInUser',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: DBService, useValue: dbServiceMock },
        { provide: UtilityService, useValue: utilityServiceMock },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return success if user credentials are valid', () => {
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      dbServiceMock.getAllUsers.and.returnValue([mockUser]);

      const response = service.login('john@example.com', 'password123');

      expect(response.isSuccess).toBeTrue();
      expect(response.message).toBe(Labels.UserLoggedInSuccess);
      expect(localStorage.getItem(Labels.JWTToken)).toBe(mockUser.id);
      expect(localStorage.getItem(Labels.LoggedInUser)).toBe(
        JSON.stringify(mockUser)
      );
    });

    it('should return failure if user is not found', () => {
      dbServiceMock.getAllUsers.and.returnValue([]);

      const response = service.login('john@example.com', 'password123');

      expect(response.isSuccess).toBeFalse();
      expect(response.message).toBe(Labels.UserNotFound);
    });

    it('should return failure if password is incorrect', () => {
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      dbServiceMock.getAllUsers.and.returnValue([mockUser]);

      const response = service.login('john@example.com', 'wrongpassword');

      expect(response.isSuccess).toBeFalse();
      expect(response.message).toBe(Labels.InvalidPassword);
    });
  });

  describe('logout', () => {
    it('should clear local storage and return success', () => {
      localStorage.setItem(Labels.JWTToken, 'token123');
      localStorage.setItem(
        Labels.LoggedInUser,
        JSON.stringify({ id: '1', name: 'John Doe' })
      );

      const response = service.logout();

      expect(response.isSuccess).toBeTrue();
      expect(response.message).toBe(Labels.UserLoggedOutSucess);
      expect(localStorage.getItem(Labels.JWTToken)).toBeNull();
      expect(localStorage.getItem(Labels.LoggedInUser)).toBeNull();
    });
  });

  describe('register', () => {
    it('should return success if user is registered successfully', () => {
      dbServiceMock.addUser.and.returnValue({
        isSuccess: true,
        message: Labels.UserRegisteredSuccess,
      });

      const response = service.register(
        'john@example.com',
        'password123',
        'John Doe'
      );

      expect(response.isSuccess).toBeTrue();
      expect(response.message).toBe(Labels.UserRegisteredSuccess);
    });

    it('should return failure if user already exists', () => {
      dbServiceMock.addUser.and.returnValue({
        isSuccess: false,
        message: Labels.UserAlreadyExists,
      });

      const response = service.register(
        'john@example.com',
        'password123',
        'John Doe'
      );

      expect(response.isSuccess).toBeFalse();
      expect(response.message).toBe(Labels.UserAlreadyExists);
    });
  });

  describe('getLoggedInUser', () => {
    it('should return the logged-in user from local storage', () => {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      localStorage.setItem(Labels.LoggedInUser, JSON.stringify(mockUser));

      const user = service.getLoggedInUser();

      expect(user).toEqual(mockUser);
    });

    it('should return null if no user is logged in', () => {
      localStorage.removeItem(Labels.LoggedInUser);

      const user = service.getLoggedInUser();

      expect(user).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if JWT token exists in local storage', () => {
      localStorage.setItem(Labels.JWTToken, 'token123');

      const isAuthenticated = service.isAuthenticated();

      expect(isAuthenticated).toBeTrue();
    });

    it('should return false if JWT token does not exist in local storage', () => {
      localStorage.removeItem(Labels.JWTToken);

      const isAuthenticated = service.isAuthenticated();

      expect(isAuthenticated).toBeFalse();
    });
  });
});
