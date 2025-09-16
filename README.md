# 📱 MCD311 Backend (Clone)

Backend for the MCD311 complaint app – built with **Node.js, Express, MongoDB, JWT Auth, and Cloudinary for photo uploads**.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone & Install

```bash
git clone <repo_url>
cd mcd311-backend
npm install
```

### 2️⃣ Configure Environment

Create a `.env` file in the project root:

```ini
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mcd311
JWT_SECRET=yourStrongSecretKey
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

### 3️⃣ Run Server

```bash
npm run dev
```

✅ You should see:  
`MongoDB Connected 🚀 Server running on port 5000`

---

## 🔍 Testing with Postman

### 1. Register User

**POST** → `http://localhost:5000/api/auth/register`  
Body (JSON):

```json
{
  "name": "Kishan",
  "email": "kishan@example.com",
  "phone": "9876543210",
  "password": "mypassword"
}
```

### 2. Login User

**POST** → `http://localhost:5000/api/auth/login`  
Body (JSON):

```json
{
  "email": "kishan@example.com",
  "password": "mypassword"
}
```

Copy the returned **token**.

### 3. Create Complaint

**POST** → `http://localhost:5000/api/complaints`  
Headers:

```
Authorization: Bearer <your_token>
```

Body (**form-data**):

- `category`: Sanitation
- `description`: Garbage not collected in street
- `latitude`: 23.6102
- `longitude`: 85.2799
- `address`: Ranchi, Jharkhand
- `photos`: (Upload file from local storage / camera)

---

## 📌 Notes

- Complaints store images on **Cloudinary** and save links in MongoDB.
- Only **admin** users can update or delete complaints.
- Citizens can create and view their complaints.
