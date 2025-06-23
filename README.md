# ☀️ Weathery – React Weather App

Weathery is a simple and visually appealing weather app built with React and Tailwind CSS. It fetches real-time weather data from the WeatherAPI and updates the UI dynamically based on weather conditions. The app also includes visual effects like rain and snow to enhance user experience.

## 🚀 Features

* 🔍 Search weather by city name
* 🎨 Dynamic background and styles based on weather and time (day/night)
* 💧 Weather effects (rain/snow animations)
* 📊 Displays temperature, humidity, wind speed, and UV index
* ⌨️ Press Enter to fetch weather (keyboard support)
* 🌍 Suggestions for Sri Lankan cities (optional feature)

## 🛠️ Tech Stack

* [React](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [WeatherAPI](https://www.weatherapi.com/)
* [Vercel](https://vercel.com/) for deployment

## ⚙️ Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/weathery.git
cd weathery
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root of your project and add your WeatherAPI key:

```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

> ⚠️ Make sure the variable name starts with `REACT_APP_`, otherwise Create React App won’t expose it to the frontend.

### Step 4: Start the Development Server

```bash
npm start
```

Visit `http://localhost:3000` to view the app in your browser.

## 🧑‍💻 Development Notes

* The background changes depending on the weather and time (day/night).
* Includes animated effects for rainy and snowy conditions.
* Pressing the Enter key also fetches the weather data.
* Weather API requests must use `https://` to avoid mixed content issues during deployment on HTTPS domains like Vercel.
* Git branch mismatch (`master` vs `main`) was resolved during deployment.

## 📦 Deployment

This app is deployed using Vercel.

**Live Site:**
👉 [https://weathery.vercel.app](https://weathery.vercel.app)

> Note: During deployment, ensure that environment variables (like `REACT_APP_WEATHER_API_KEY`) are set via Vercel’s dashboard under **Project Settings → Environment Variables**.


