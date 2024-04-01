https://food-delivery1.vercel.app/
# Food Delivery System

The Food Delivery System is a comprehensive digital platform designed to revolutionize the way food is ordered, processed, and delivered. In today's fast-paced world, consumers increasingly rely on online platforms to satisfy their culinary cravings conveniently. This system bridges the gap between customers and restaurants, offering a seamless and efficient ordering experience from the comfort of one's home or on the go.

---

## Features

- **User Authentication:** Secure authentication mechanism for users including Admin, Customer, and Restaurant Manager.
- **Manage User:** Functionality to manage user accounts, including registration, login, and profile management.
- **Make Order:** Seamless order placement process allowing customers to browse menus, add items to the cart, and place orders.
- **Track Order:** Real-time order tracking functionality enabling users to track the status of their orders from placement to delivery.
- **Manage Profile:** Profile management system allowing users to update their personal information, preferences, and delivery addresses.
- **Payment:** Secure payment processing using integrated payment gateways ensuring safe transactions.

---

## Users

- **Admin:** Administrators overseeing the entire system, managing users, restaurants, and system settings.
- **Customer:** End-users who browse menus, place orders, and track deliveries.
- **Restaurant Manager:** Managers of individual restaurants responsible for managing menus, processing orders, and updating restaurant information.

---

## Technology Stack

### Frontend
- **Next.js:** React framework for building server-side rendered applications.
- **Tailwind CSS:** Utility-first CSS framework for designing responsive and customizable user interfaces.

### Backend
- **Node.js:** Server-side JavaScript runtime environment for building scalable and efficient backend applications.
- **MongoDB:** NoSQL database for storing and managing data efficiently.

---

## Tools Used

### Development
- **Visual Studio Code:** Integrated development environment for coding, debugging, and version control.
- **Postman:** API development and testing tool for building and debugging APIs.
- **MongoDB Compass:** GUI for MongoDB for visualizing and interacting with the database.

---

## Security
- **JWT Token:** JSON Web Tokens (JWT) used for secure authentication and authorization, ensuring data privacy and integrity throughout the system.

---

## How to Start

### Server

1. Set up the configuration settings in a `.env` file:

    ```
    MAIL_HOST = ""
    MAIL_USER = ""
    MAIL_PASS = ""
    PORT = 4000
    DATABASE_URL = ""

    // Clousdinary folder
    FOLDER_NAME=""
    cloud_name=""
    api_key=""
    api_secret=""

    // Razorpay
    RAZORPAY_KEY=''
    RAZORPAY_SECRET=''

    TWILIO_ACCOUNT_SID = ""
    TWILIO_AUTH_TOKEN = ""
    verifySid = ""
    ```

2. Run the server:

    ```bash
    npm install
    npm run dev
    ```

### Frontend

1. Navigate to the frontend directory:

    ```bash
    cd frontend/foodDelivery
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

---

This README provides an overview of the Food Delivery System project with clear instructions on how to set up and run both the server and the frontend.
