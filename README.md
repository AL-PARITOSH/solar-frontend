# Solar Panel Dust and Snow Detection

This is a modern, responsive React frontend designed to interface with a Python backend (Keras CNN + YOLOv8) for solar panel condition detection. 

## Features
- **Dark Theme UI**: Specialized rich aesthetics tailored for a "Solar Energy" motif.
- **Micro-Animations**: Uses `framer-motion` for smooth layout transitions and data bar progression.
- **Drag & Drop Upload**: Seamless file input handling.
- **Production-ready Mock**: `src/api/predict.ts` contains a drop-in replacement layout once the backend is ready.

## Quick Start (Local Development)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` to see the site.

## Building for Production

When you are ready to compile the frontend for production, run:
```bash
npm run build
```
This generates optimized static files in the `dist` folder. You can preview them locally using:
```bash
npm run preview
```

## Deployment to Vercel & Backend Integration

This template is configured natively to deploy on Vercel seamlessly (as Vite projects have zero-config on Vercel). 

**Connecting to the Backend API (Docker/Render):**
1. Navigate to `src/api/predict.ts`.
2. Locate the function `predictSolarCondition()`. 
3. Uncomment the fetching block underneath `// REAL IMPLEMENTATION`, and delete/comment the mock logic.
4. **Environment Variables**:
   In Vercel (or via `.env` locally), add the environment variable `VITE_API_BASE_URL` pointing to your Render deployment.
   - Example: `VITE_API_BASE_URL=https://my-backend-app.onrender.com`

**Environment Variable Configuration in Vercel:**
Go to your **Vercel Project Dashboard** -> **Settings** -> **Environment Variables**.
Add a new variable:
- **Key**: `VITE_API_BASE_URL`
- **Value**: `<Your Render API URL>`
- Ensure it is checked for the **Production** environment.

Deploy normally! Vercel will automatically read this URL during runtime through `import.meta.env.VITE_API_BASE_URL`.
