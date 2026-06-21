# Astra Cognix Solutions Pvt Ltd

Premium full-stack corporate IT company website with a powerful admin CMS.
all done the project  

## Tech Stack
add somethings
**Frontend:** React, Tailwind CSS, Framer Motion, React Router, React Hook Form, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT  
**Features:** Dark/Light mode, Admin CMS, Cloudinary uploads, SEO, Contact forms

## Quick Start
npm run dev

### Prerequisites

- Node.js 18+
- MongoDB running locally or MongoDB Atlas URI

### Installation

```bash
# Install root, server, and client dependencies
npm install
cd server && npm install
cd ../client && npm install --legacy-peer-deps
```

### Environment

Copy `server/.env.example` to `server/.env` and configure:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/astra_cognix
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@astracognix.com
ADMIN_PASSWORD=Admin@123456
```

Optional Cloudinary and SMTP settings for image uploads and email notifications.

### Seed Database

```bash
cd server
npm run seed
```

### Run Development

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

- Website: http://localhost:5173
- API: http://localhost:5000/api
- Admin: http://localhost:5173/admin/login

### Default Admin Credentials

- **Email:** admin@astracognix.com
- **Password:** Admin@123456

## Project Structure

```
ASTRA/
├── client/          # React frontend
│   ├── src/
│   │   ├── admin/       # Admin panel
│   │   ├── components/  # UI & sections
│   │   ├── pages/       # Public pages
│   │   ├── api/         # API client
│   │   └── context/     # Auth & theme
├── server/          # Express API
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API routes
│   ├── controllers/ # Business logic
│   └── utils/       # Seed, email, etc.
└── README.md
```

## Admin Panel Modules

- Dashboard analytics
- Hero, About, Services, Solutions
- Portfolio, Tech Stack, Pricing
- Testimonials, Client Logos, Careers
- Blog (rich text editor), FAQ
- Contact inquiries, SEO, Website settings
- User management (admin only)

## Production Build

```bash
cd client
npm run build
```

Serve `client/dist` with any static host and deploy the Express API separately.

## License

Proprietary - Astra Cognix Solutions Pvt Ltd
