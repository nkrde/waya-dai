<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# WayaX UI & Handover Documentation

This repository contains the complete frontend client code for WayaX, a premium SEBI-guided financial AI advisor dashboard. It has been built with **React**, **Vite**, **TypeScript**, **Framer Motion**, and **Tailwind CSS**.

---

## 🚀 One-Click Launch (Windows)

Simply double-click the **`start_app.bat`** file in the root folder of this project. It will:
1. Check for and install dependencies automatically (if not already installed).
2. Start the local Vite development server in the background.
3. Open your default web browser to the application at [http://localhost:5175](http://localhost:5175).

---

## 🛠️ Key Front-End Architecture

All main components are located under the `src/` directory.

### Core Entry Files
*   **[src/App.tsx](file:///C:/Users/lcppd/.gemini/antigravity/scratch/WayaX/src/App.tsx):** Monolithic main container coordinate controller. Manages state for chat histories, active chat sessions, portfolio holdings, FAQ panels, theme settings, and rendering layout coordinate math.
*   **[src/index.css](file:///C:/Users/lcppd/.gemini/antigravity/scratch/WayaX/src/index.css):** Global stylesheets containing core custom animation keyframes (e.g., background convective flames) and translucent white scrollbar styling.
*   **[src/types/index.ts](file:///C:/Users/lcppd/.gemini/antigravity/scratch/WayaX/src/types/index.ts) / `src/types.ts`:** Holds typescript interface definitions for `ChatHistory`, `ChatMessage`, `PortfolioStock`, `StockRecommendation`, and `UserProfile`.

### Layout Components
*   **[src/components/Sidebar.tsx](file:///C:/Users/lcppd/.gemini/antigravity/scratch/WayaX/src/components/Sidebar.tsx):** Left side navigation bar. Supports collapsed/icon-only layouts on desktop and overlay drawers on mobile.
*   **[src/components/FAQDrawer.tsx](file:///C:/Users/lcppd/.gemini/antigravity/scratch/WayaX/src/components/FAQDrawer.tsx):** Sliding panel on the right side containing categories of pre-selected advisory queries. Lists slice to show top 5 items by default with a "Show more" toggle.
*   **[src/components/PortfolioPanel.tsx](file:///C:/Users/lcppd/.gemini/antigravity/scratch/WayaX/src/components/PortfolioPanel.tsx):** Sliding panel on the left side (sits adjacent to Sidebar). Computes holdings values, profits, percentage returns, and handles manual addition/removal of stock tokens.
*   **[src/components/StockTable.tsx](file:///C:/Users/lcppd/.gemini/antigravity/scratch/WayaX/src/components/StockTable.tsx):** Renders interactive, SEBI-compliant tabular stock recommendation advisories in chat answers. Includes inner expandable panels for technical scores and fundamental ratios.

---

## ⚙️ Backend Integration Checklist (For Backend Developers)

Currently, the client operates entirely in a **mock state** by storing data locally. The following steps outline what needs database models and API endpoints.

### 1. Database Schema Guidelines

You will need the following database tables:

*   **Users / Profiles Table**
    *   Fields: `id`, `name`, `email`, `riskTolerance`, `investmentCapacity`, `avatarUrl`, `theme`
*   **Portfolio Holdings Table**
    *   Fields: `id`, `userId`, `ticker`, `stockName`, `quantity`, `buyPrice`, `currentPrice`, `purchaseDate`
*   **Chat Sessions Table**
    *   Fields: `id`, `userId`, `title`, `createdAt`, `updatedAt`
*   **Chat Messages Table**
    *   Fields: `id`, `sessionId`, `role` (user/assistant), `content`, `stockRecommendations` (JSON or relational child array), `timestamp`

### 2. Mock Local Storage to API Migration Points

Search for `localStorage` in **`App.tsx`** to replace mock loaders with API calls:

*   **User Profiles (`localStorage.getItem('wayax-profile')`):**
    *   *Frontend target:* Replace `saveProfileToLocalStorage` and profile initialization hooks with `GET /api/profile` and `POST /api/profile`.
*   **Portfolio Holdings (`localStorage.getItem('wayax-portfolio-stocks')`):**
    *   *Frontend target:* Replace manual hooks inside `handleManualAddStock` and `handleRemovePortfolioStock` with `GET /api/portfolio`, `POST /api/portfolio`, and `DELETE /api/portfolio/:id`.
*   **Chat History (`localStorage.getItem('wayax-chat-histories')`):**
    *   *Frontend target:* Replace `handleCreateNewChat`, `handleRenameChat`, and `handleDeleteChat` hooks with `GET /api/chats`, `POST /api/chats`, `PUT /api/chats/:id`, and `DELETE /api/chats/:id`.

### 3. AI Advisory Chat Completion endpoint

The chat box calls Gemini LLM to respond to queries and return recommendations. Set up an endpoint:
*   **Route:** `POST /api/chat`
*   **Payload:** `{ messages: ChatMessage[], riskProfile: UserProfile }`
*   **Output:** Returns string stream or JSON content. If the response contains stock recommendations, it should format them as structured JSON matching `StockRecommendation` to render the clean frontend [StockTable.tsx](file:///C:/Users/lcppd/.gemini/antigravity/scratch/WayaX/src/components/StockTable.tsx).