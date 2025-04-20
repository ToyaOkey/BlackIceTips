# 🧊 BlackTips Marketplace

**BlackTips** is a web-based marketplace built specifically for Rainbow Six Siege players who want to sell or buy coaching services, tip sheets, or helpful resources related to the game. It’s designed to make buying, selling, and bidding on gameplay knowledge smooth, secure, and fast.

---

## 🚀 What It Does

BlackTips connects players looking to improve their game with experts offering tips, guides, and coaching services. Users can:

- Sign up and log in securely
- Post multiple listings for sale
- Browse and search for helpful game resources
- Place bids on items or services listed by others
- Accept or reject offers in an intuitive admin panel

---

## 🔧 Key Features

### 🗃️ MongoDB Integration

- MongoDB is used as the backend database to store all **user accounts** and **marketplace listings**
- Each item or user entry follows a defined schema for consistency and security

### 🛡️ Multi-layered Validation

- **Schema Validation:** Every item and user follows strict schema rules to prevent malformed data
- **Front-end Validation:** Input fields are validated on the client side for usability
- **Server-side Validation:** All incoming data is revalidated to guard against injection or tampering

### 🛍️ Marketplace Listings

- Users can post **multiple items**
- Items are searchable with built-in filters for ease of navigation and discovery
- Users can place **custom bids** on items they are interested in

### 🔐 Secure Login & Bidding System

- Users can **sign up and log in** to manage their listings or bids
- All passwords are **hashed using bcrypt** before being stored
- Admins can review bids submitted by users and select which ones to accept

---

## 🛠️ Getting Started

To run this project locally, make sure you have **Node.js** installed on your machine.

### Installation Steps

```bash
# Clone the repo
git clone https://github.com/ToyaOkey/BlackIceTips.git 
cd BlackIceTips

# Install dependencies
npm install

# Run the application
nodemon app.js
```

## 📈 Future Plans

- 🌐 **User Profiles** — Let users customize their profile with bios and stats
- 💬 **Messaging System** — Allow buyers and sellers to chat directly
- 💸 **Stripe/PayPal Integration** — Enable secure payments for services
- 📨 **Notification System** — Notify users when bids are placed or accepted
- 📊 **Seller Dashboard** — Analytics for bids, accepted offers, and earnings
- 🧠 **AI Recommendation Engine** — Suggest listings based on user interests
- 🔒 **Two-Factor Authentication** — Add extra security to login
- 🌙 **Dark Mode** — Optional UI theme for user comfort  
