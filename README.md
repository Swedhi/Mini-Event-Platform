## Mini Event Platform (MERN)

**Full-stack mini event platform** built as a MERN stack to handle user authentication,event creation,and RSVPs.  
Users can register/login, create and manage events, and RSVP with capacity enforcement.

### 1. Tech Stack

- **Frontend**: React + Vite, React Router, Axios
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Auth**: JWT (JSON Web Tokens), password hashing with bcrypt

### 2. Project Structure

- `server/` – Express API (auth, events, RSVP)
- `client/` – React SPA

### 3. Backend Setup (`server`)

1. Install dependencies:

```bash
cd server
npm install
```

2. Create a `.env` file inside `server` with:

```bash
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=super_secret_jwt_key
PORT=5000
```

3. Run the API in development:

```bash
npm run dev
```

The API will be available at `http://localhost:5000/api`.

### 4. Frontend Setup (`client`)

1. Install dependencies:

```bash
cd client
npm install
```

2. (Optional) Create `client/.env` to override API base URL:

```bash
VITE_API_BASE_URL=https://your-deployed-backend.com/api
```

3. Run the React app:

```bash
npm run dev
```

The app will start on `http://localhost:3000`.

### 5. Core Features

- **User Authentication**
  - Register and login with JWT-based auth.
  - Only authenticated users can create/manage their own events.

- **Event Management (CRUD)**
  - Create events with title, description, date & time, location, capacity, category, and optional image URL.
  - Public list and detail views for all events.
  - Authenticated users can edit/delete only events they created.
  - "My Events" dashboard listing events created by the logged-in user.

- **RSVP System**
  - Authenticated users can RSVP to events.
  - **Capacity enforcement**: prevents RSVPs beyond max capacity.
  - **Duplicate prevention**: the same user cannot RSVP twice to the same event.
  - Shows current attendees vs capacity.

- **Responsive UI**
  - Modern, dark-themed layout.
  - Optimized for desktop and mobile.

### 6. Deployment Notes

- Deploy **backend** to Render/railway/other Node host.
- Deploy **frontend** to Netlify/Vercel and set `VITE_API_BASE_URL` accordingly.
- Ensure CORS is allowed from the frontend origin in the backend if you lock it down.

### 7. Scripts Summary

- `server`:
  - `npm run dev` – start backend with nodemon
  - `npm start` – start backend with Node
- `client`:
  - `npm run dev` – start React dev server
  - `npm run build` – production build
  - `npm run preview` – preview production build

