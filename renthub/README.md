RentHub
RentHub is a fully functional Angular web application designed to streamline the apartment rental process for landlords and tenants. It provides features like apartment listings, advanced search and filters, user authentication, and more.

Table of Contents
Features
Screenshots
Tech Stack
Installation
Usage
Testing
Deployment
Bonus Features
Evaluation Criteria
Features
🔒 User Registration & Authentication
Secure login and registration flow using Angular Reactive Forms.
Auth Guards implemented to restrict access to protected routes.
🏡 Apartment Listings Management
Create, update, and manage apartment listings with descriptions, photos, and contact information.
⭐ Interest Expression
Mark listings as favorites or send inquiries to landlords via a dialog.

Comments & Replies
Communicate via comments on each listing for questions and discussions.
🔍 Advanced Search & Filters
Search listings by location, price, amenities, and more.
✅ Form Validations
Real-time feedback for user inputs across forms.
💾 LocalStorage for Data Persistence
User session data, authentication tokens, and favorites are stored in LocalStorage to persist data across browser refreshes.
Screenshots
Home Screen
Carousel, paginated listings, and quick actions (view, favorite).
Interest Expression
Favorite button and inquiry feature.
Search & Filter
Filters by location, price, amenities, etc.
User Sign-Up Form
Form with validations for user registration.
New Post Form
Form to add property details (checkboxes, radio buttons, validations).
View Details Page
Detailed view of a listing with a comments section.

Preview & Submit
Bonus feature: Preview listing before submission.
Tech Stack
Framework: Angular (v16+)
Language: TypeScript
UI Library: Angular Material / Bootstrap
Storage: LocalStorage API (Client-side persistence)
Version Control: Git & GitHub
Deployment: Firebase / Netlify
Installation
Clone the repository:
git clone https://github.com/your-repo/renthub.git
cd renthub

Install dependencies:
npm install

Start the development server:
ng serve

Open your browser and navigate to: localhost"4200

Usage
Development Server
Start the local development server:

The application will automatically reload whenever you modify any source files.

onus Features
Preview & Submit
A preview screen allows users to review their listing before submission.
Auth Guard Implementation
Protects sensitive routes like:
/create-post
/favourites
/profile
Redirects unauthenticated users to the login page.
LocalStorage Usage
Purpose:
Persist user authentication tokens.
Store user session data.
Maintain a list of favorite listings.
Advantages:
Data is retained on browser refresh.
Lightweight client-side storage.
Evaluation Criteria
✅ Deliverables Checklist
Fully functional Angular application.
Unit tests for components, services, and modules.
GitHub repository shared.
Live deployed app link provided.
README file with all details.
Bonus feature (Preview & Submit) implemented.
Auth Guard protection implemented.
LocalStorage used for data persistence.
Test Credentials
Email: testuser@renthub.com
Password: Test@123
Live Demo & Repository
Deployed App: RentHub Live
Source Code: GitHub Repository
