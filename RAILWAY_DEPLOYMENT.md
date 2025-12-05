# Railway Deployment Guide

This guide explains how to deploy the **Mascotas Uruguay** application to [Railway](https://railway.app/).

The project is structured to be deployed as **two separate services**:
1.  **Server (Backend)**: Node.js/Express API with PostgreSQL.
2.  **Client (Frontend)**: React/Vite application serving static files.

---

## 1. Project Setup in Railway

1.  Create a new **Project** in Railway.
2.  Provision a **PostgreSQL** database service within this project.

---

## 2. Deploying the Server

The server is located in the `server/` directory.

### Steps:
1.  **New Service**: Click "New" > "GitHub Repo" > Select your repository.
2.  **Configuration**:
    - Go to **Settings** > **Root Directory** and set it to `/server`.
    - Go to **Variables** and add the following:
        - `DATABASE_URL`: (Reference your PostgreSQL service variable)
        - `JWT_SECRET`: (Set a secure secret key)
        - `CLIENT_URL`: `https://<your-client-url>.up.railway.app` (You will update this after deploying the client)
        - `NODE_ENV`: `production`
        - `PORT`: `3000` (Optional, Railway sets this automatically)

### Verification:
- The deployment logs should show migrations running (`npx prisma migrate deploy`) and the server starting.
- Note the **Public Domain** generated for the server (e.g., `server-production.up.railway.app`).

---

## 3. Deploying the Client

The client is located in the `client/` directory.

### Steps:
1.  **New Service**: Click "New" > "GitHub Repo" > Select your repository (again).
2.  **Configuration**:
    - Go to **Settings** > **Root Directory** and set it to `/client`.
    - Go to **Variables** and add:
        - `VITE_API_URL`: `https://<your-server-url>.up.railway.app` (Paste the Server URL from step 2)
3.  **Build Command**:
    - Railway's Nixpacks should automatically detect `npm run build`.
    - **Crucial**: `VITE_API_URL` must be set **before** the build runs because Vite embeds it into the static files.

### Verification:
- Wait for the build to complete.
- Open the **Public Domain** for the client.
- Try to **Login** or **Sign Up**. If it works, the connection to the server is successful.

---

## 4. Finalizing Configuration

1.  **Update Server CORS**:
    - Go back to your **Server Service** > **Variables**.
    - Update `CLIENT_URL` with the actual URL of your deployed Client.
    - Redeploy the Server.

## Troubleshooting

-   **502 Bad Gateway on Client**:
    -   Check if the Client is trying to connect to `localhost`. Open the browser console and check the network requests.
    -   Ensure `VITE_API_URL` was set correctly in the Client variables *before* the last build. Trigger a redeploy if needed.

-   **CORS Errors**:
    -   Ensure the Server's `CLIENT_URL` matches the Client's domain exactly (no trailing slash).
