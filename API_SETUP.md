# API Configuration Guide

## Overview
The client now has a centralized API configuration in `client/src/utils/api.js` that uses environment variables to connect to the backend server.

## Environment Setup

### Local Development
Create a `.env` file in the `client/` directory:
```
VITE_API_URL=http://localhost:3000
```

### Railway Production
In your Railway **client** service:
1. Go to **Variables** tab
2. Add: `VITE_API_URL` = `https://your-server-url.up.railway.app`
   (Replace with your actual server URL from Railway)

## Usage in Components

```javascript
import api from '../utils/api';

// Login example
const handleLogin = async (credentials) => {
    try {
        const data = await api.auth.login(credentials);
        // Handle success
    } catch (error) {
        // Handle error
    }
};

// Get sitters example
const fetchSitters = async () => {
    try {
        const sitters = await api.sitters.getAll({ city: 'Montevideo' });
        // Handle success
    } catch (error) {
        // Handle error
    }
};
```

## Next Steps

### Backend API Endpoints Needed
Your server currently only has `/api/health` and `/api/users`. You'll need to implement:

1. **Authentication**
   - `POST /api/auth/login`
   - `POST /api/auth/signup`

2. **Sitters**
   - `GET /api/sitters` (with query params for filtering)
   - `GET /api/sitters/:id`

3. **Bookings**
   - `POST /api/bookings`
   - `GET /api/bookings`
   - `GET /api/bookings/:id`

### Current Status
- ✅ API configuration created
- ✅ Environment variable support added
- ⏳ Backend endpoints need to be implemented
- ⏳ Frontend pages need to be updated to use API (currently using localStorage)

## Testing the Connection

Once you set the `VITE_API_URL` environment variable in Railway:
1. The client will automatically use it
2. Test with: `fetch(import.meta.env.VITE_API_URL + '/api/health')`
