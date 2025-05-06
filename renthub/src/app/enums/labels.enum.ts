export const enum Labels {
  //Database Keys
  Apartments = 'apartments',
  Users = 'users',
  Comments = 'comments',
  LoggedInUser = 'loggedInUser',
  JWTToken = 'jwtToken',
  UserFavorites = 'userFavorites',

  //Success Messages
  UserLoggedInSuccess = 'User logged in successfully',
  UserLoggedOutSucess = 'User logged out successfully',
  UserRegisteredSuccess = 'User registered successfully',
  ApartmentListedSuccess = 'Apartment listed successfully',

  //Error Messages
  UserNotFound = 'User not found',
  InvalidPassword = 'Invalid password',
  UserAlreadyExists = 'User already exists',
  UserNotLoggedIn = 'User not logged in',
  InvalidEmail = 'Invalid Email',
}
