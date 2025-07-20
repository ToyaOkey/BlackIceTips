# 🧊 BlackTips Marketplace

**BlackTips** is a web-based marketplace built specifically for Rainbow Six Siege players who want to sell or buy coaching services, tip sheets, or helpful resources related to the game. It’s designed to make buying, selling, and bidding on gameplay knowledge smooth, secure, and fast.

---

## What It Does

BlackTips connects players looking to improve their game with experts offering tips, guides, and coaching services. Users can:

- Sign up and log in securely
- Post multiple listings for sale
- Browse and search for helpful game resources
- Place bids on items or services listed by others
- Accept or reject offers in an intuitive admin panel

---

## Key Features

### MongoDB Integration

- **MongoDB Atlas** is used as the cloud database to store all **user accounts** and **marketplace listings**
- Each item or user entry follows a defined schema for consistency and security
- Environment variables are used for secure database connection management
- Session data is stored in MongoDB for persistence across server restarts

### Multi-layered Validation

- **Schema Validation:** Every item and user follows strict schema rules to prevent malformed data
- **Front-end Validation:** Input fields are validated on the client side for usability
- **Server-side Validation:** All incoming data is revalidated to guard against injection or tampering

### Marketplace Listings

- Users can post **multiple items**
- Items are searchable with built-in filters for ease of navigation and discovery
- Users can place **custom bids** on items they are interested in

### Secure Login & Bidding System

- Users can **sign up and log in** to manage their listings or bids
- All passwords are **hashed using bcrypt** before being stored
- Admins can review bids submitted by users and select which ones to accept

---

## Getting Started

To run this project locally, make sure you have **Node.js** and **MongoDB** set up on your machine.

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB Atlas** account (free tier available)
- **Git**

### Installation Steps

```bash
# Clone the repo
git clone https://github.com/ToyaOkey/BlackIceTips.git 
cd BlackIceTips

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Configuration

1. **Create a `.env` file** in the root directory with the following variables:

```env
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority
SESSION_SECRET=your_session_secret_here
PORT=3000
HOST=localhost
```

2. **Get your MongoDB connection string:**
   - Sign up for [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster (free tier available)
   - Go to "Database Access" and create a new user
   - Go to "Network Access" and add your IP address (or `0.0.0.0/0` for all IPs)
   - Click "Connect" on your cluster and choose "Connect your application"
   - Copy the connection string and replace `<password>` with your actual password

### Running the Application

```bash
# Development mode (with auto-restart)
nodemon app.js

# Production mode
node app.js
```

The application will be available at `http://localhost:3000`

### Troubleshooting

#### MongoDB Connection Issues

- **"Bad auth" error**: Check that your MongoDB Atlas credentials are correct
- **"Network access denied"**: Add your IP address to MongoDB Atlas Network Access
- **"Database not found"**: Ensure the database name in your connection string exists

#### Environment Variables

- **"process.env.MONGO_URI is undefined"**: Make sure your `.env` file exists and has the correct variable names
- **"dotenv not loading"**: Ensure `require('dotenv').config()` is at the top of your `app.js` file

#### Port Issues

- **"EADDRINUSE" error**: Port 3000 is already in use. Either:
  - Kill the existing process: `lsof -ti:3000 | xargs kill -9`
  - Or change the PORT in your `.env` file

## 📈 Future Plans

- 🌐 **User Profiles** — Let users customize their profile with bios and stats
- 💬 **Messaging System** — Allow buyers and sellers to chat directly
- 💸 **Stripe/PayPal Integration** — Enable secure payments for services
- 📨 **Notification System** — Notify users when bids are placed or accepted
- 📊 **Seller Dashboard** — Analytics for bids, accepted offers, and earnings
- 🧠 **AI Recommendation Engine** — Suggest listings based on user interests
- 🔒 **Two-Factor Authentication** — Add extra security to login
- 🌙 **Dark Mode** — Optional UI theme for user comfort  
