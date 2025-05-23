# 🏠 RentHub

**RentHub** is a fully functional Angular web application designed to streamline the apartment rental process for landlords and tenants. It provides features like apartment listings, advanced search & filters, user authentication, and more.

## 📑 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Bonus Features](#bonus-features)
- [Evaluation Criteria](#evaluation-criteria)
- [Test Credentials](#test-credentials)
- [Live Demo & Repository](#live-demo--repository)

## ✅ #Features

### 🔒 User Registration & Authentication

- Secure login and registration with Angular Reactive Forms.
- **Auth Guards** implemented to restrict access to protected routes.

### 🏡 Apartment Listings Management

- Create apartment listings with photos, descriptions, contact info.

### ⭐ Interest Expression

- Mark listings as **Favorites**.
- Send inquiries to landlords via a dialog interface.

### 💬 Comments & Replies

- Discussion section for each listing for Q&A and negotiations.

### 🔍 Advanced Search & Filters

- Search listings by location, price, amenities, etc.

### ✅ Form Validations

- Real-time validations on all user inputs.

### 💾 LocalStorage for Data Persistence

- Stores apartment listings, user data and favorites in **LocalStorage** for persistence across refreshes.

## 🖼️ Screens

| Screen                  | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
| **Home Screen**         | Carousel, paginated listings, quick actions (view, favorite).         |
| **Interest Expression** | Favorite button & inquiry feature.                                    |
| **Search & Filter**     | Filter listings by location, price, amenities.                        |
| **User Sign-Up Form**   | Registration form with validations.                                   |
| **New Post Form**       | Add property details with checkboxes, radio buttons, and validations. |
| **View Details Page**   | Detailed view of listing with comments section.                       |
| **Preview & Submit**    | Bonus feature - Preview listing before final submission.              |

## 🛠️ Tech Stack

| Category        | Technology                     |
| --------------- | ------------------------------ |
| Framework       | Angular (v19)                  |
| Language        | TypeScript                     |
| UI Library      | Angular Material               |
| Storage         | LocalStorage API (Client-side) |
| Version Control | Git & GitHub                   |
| Deployment      | Netlify                        |

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/renthub.git
cd renthub

# Install dependencies
npm install

# Start development server
ng serve

# Open in browser
http://localhost:4200
```

## 🧑‍💻 Usage

Start the local development server:

```bash
ng serve
```

The application will auto-reload on code changes.

## 🧪 Testing

Unit tests for:

- Components (Filter Component)
- Services ( AuthService)

Run tests using:

```bash
ng test
```

## 🚀 Deployment

- Deployed on **Netlify**
- Production build command:

```bash
ng build --configuration = 'production'
```

## 🌟 Bonus Features

### Preview & Submit

- A preview screen allows users to review their listing before submission.

### Auth Guard Implementation

- Protects sensitive routes:
  - /create-post
  - /favourites
- Redirects unauthenticated users to login.

### LocalStorage Usage

- **Purpose:**
  - Store Apartment listings data.
  - Store user session data & favorites.

## 📊 Evaluation Criteria

✅ Deliverables Checklist:

- Fully functional Angular application.
- Unit tests for component(Filter Component), service(Auth Service).
- GitHub repository shared.
- Live deployed app link provided.
- README file with all details.
- Bonus features (Preview & Submit) implemented.
- Auth Guard protection implemented.
- LocalStorage used for data persistence.

## 🔐 Test Credentials

- **Email:** Akshat@gmail.com
- **Password:** Akshat@123

## 🌐 Live Demo & Repository

- 🔗 **Deployed App:** [RentHub Live](https://akshat-renthub.netlify.app/)
- 🔗 **Source Code:** [GitHub Repository](https://github.com/Akshatbandooni-rgb/RentHub/tree/master/renthub)

## ✅ Summary

- Auth Guards ✅
- LocalStorage Persistence ✅
- Routing, Forms, Validations ✅
- Bonus Preview & Submit ✅
- Deployed & Live ✅
