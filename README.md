# Destiny - Travel Agency Platform ✈️🌍

A full-stack MERN (MongoDB, Express, React, Node.js) travel agency platform featuring dynamic destination browsing, customizable trip details, secure user authentication, and a dedicated admin dashboard for managing travel packages and customer inquiries.

## 🌟 Key Features

* **User Authentication:** Secure login and registration system using JWT and bcrypt. Features role-based access control (Admin vs. Regular User). The first registered user automatically becomes the Admin.
* **Dynamic Trip Pages:** A "Hybrid Data Model" that gracefully handles both static fallback data and dynamic data fetched from the MongoDB database.
* **Admin Dashboard:** A protected portal for administrators to:
  * View and manage customer inquiries (Contact forms/modals).
  * Track registered users, their join dates, and their last login activity.
  * Manage travel packages.
* **Modern UI/UX:** Built with React, Tailwind CSS, and Framer Motion for smooth animations, featuring an intuitive mobile-first design, interactive sliders, flip cards, and sticky action bars.

## 🛠️ Tech Stack

**Frontend:**
* React.js (via Vite)
* Tailwind CSS (Styling)
* Framer Motion (Animations)
* Lucide React (Icons)
* React Router DOM (Navigation)
* Axios (HTTP Client)

**Backend:**
* Node.js & Express.js (Server & API)
* MongoDB & Mongoose (Database & ORM)
* JSON Web Tokens (JWT) & Bcrypt.js (Security & Auth)

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites
* Node.js installed on your machine.
* A MongoDB database (either a local instance or a free MongoDB Atlas cluster).

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name
