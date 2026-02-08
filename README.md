# 🚗 RentalCar — Premium Vehicle Booking App

**RentalCar** is a high-performance web application designed for searching, filtering, and booking rental vehicles. This project was developed as a technical solution for a car rental service, focusing on clean code (DRY principle), strict typing, and a seamless user experience.

🔗 **Live Demo:** [View Live Project](https://rental-car-p16d.vercel.app)

---

## ✨ Features

- 🏎️ **Extensive Car Catalog:** Browse a diverse fleet with detailed specifications and rental conditions.
- 🔍 **Server-Side Filtering:** Advanced search by **Brand**, **Price**, and **Mileage** (Min/Max) performed directly on the backend for maximum accuracy.
- 📑 **Backend Pagination:** "Load More" functionality implemented with server-side pagination to handle large datasets efficiently.
- ⭐ **Favorites System:** Save your preferred cars to a personal list. Data persists using **Zustand + LocalStorage**, remaining available after page refreshes.
- 📱 **Responsive Design:** A desktop-first approach with high-fidelity adherence to the Figma layout.
- 🔢 **UI Formatting:** Professional data presentation, including mileage formatting with space separators (e.g., `5 000 km`).
- 📅 **Rental Form:** Fully functional booking form on the car details page with success notifications via **React Hot Toast**.
- ⚡ **Performance Optimized:** Includes **Loaders** for all asynchronous actions and optimized image loading.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (Global state for cars, filters, and favorites)
- **Data Fetching:** [Axios](https://axios-http.com/) & [TanStack Query v5](https://tanstack.com/query/latest)
- **Styling:** CSS Modules
- **Notifications:** React Hot Toast
- **API:** [Official RentalCar API](https://car-rental-api.goit.global/api-docs/)

---

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/rental-car.git
   cd rental-car
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

- `app/`: Next.js Pages & Layouts (/, /catalog, /catalog/:id)
- `components/`: Atomic UI components (SearchBox, CarCard, Form, etc.)
- `store/`: Zustand store definitions
- `lib/`: Axios instance and API service logic
- `type/`: Centralized TypeScript interfaces
- `public/`: Static assets like SVG sprites.

---

## 👤 Author

**VitaliiDevX**

- [GitHub](https://github.com/VitaliiDevX)
- [LinkedIn](www.linkedin.com/in/vitalii-ishchenko-dev)
