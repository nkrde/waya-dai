<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.
https://ai.studio/apps/a6640487-5312-4cca-ba2a-46ee204c4d22

## One-Click Launch (Windows)

Simply double-click the **`start_app.bat`** file in the root folder of this project. It will:
1. Check for and install dependencies automatically (if not already installed).
2. Open your default web browser to the application at [http://localhost:5175](http://localhost:5175).
3. Start the local Vite development server in the background.

## Manual Launch (Cross-Platform)

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key.
3. Run the app:
   `npm run dev`
4. Access the app at [http://localhost:5175](http://localhost:5175).