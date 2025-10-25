🌦️ StormWatch – AI-Driven Weather Forecast & Alert Automation System

A smart weather forecast and alert automation platform built using React, n8n, OpenWeather API, and OpenAI GPT-4, providing users with personalized daily forecasts and AI-generated weather summaries.

🧠 Overview

StormWatch is a lightweight, AI-powered weather automation system that helps users stay informed about upcoming weather conditions.
The app collects 3-hourly forecast data for a selected city, analyzes it using OpenAI GPT-4, and generates personalized time-frame summaries (Morning, Afternoon, Evening, Night) along with friendly daily advice.
Automation is handled entirely through n8n, which fetches weather data and delivers forecast emails automatically each evening.

🚀 Features

🌦️ Fetch 3-hour interval forecasts via OpenWeather API
🤖 Use OpenAI GPT-4 to generate human-like weather summaries
🕕 Automated daily forecast emails sent through n8n workflows
💡 Personalized user advice based on weather patterns
🌍 Location-based forecast (user inputs city)
⚡ Simple, fast UI built with React (Vite)
📧 Supports SMTP or Gmail app password integration

🛠️ Tech Stack

Category -> Technologies
Frontend ->	React (Vite), Tailwind CSS
Automation ->	n8n Workflow Automation
APIs ->	OpenWeather API, OpenAI GPT-4 API
Email -> Delivery	Gmail / SMTP
Hosting ->	Local 

⚙️ System Workflow

[User enters city]
        ↓
[OpenWeather API → Fetch 3-hourly forecast]
        ↓
[n8n workflow → Send data to OpenAI API]
        ↓
[OpenAI → Analyze & generate summary]
        ↓
[n8n → Send daily forecast email at 6PM]

📬 Daily Email Example

Subject: 🌤️ Tomorrow’s Forecast for Colombo – Clear Skies with Evening Rain

Body (HTML):

🌅 Morning: Clear skies and sunshine (30°C)
🌇 Afternoon: Hot, high UV levels ☀️
🌆 Evening: Light rain expected 🌧️
🌙 Night: Cloudy with mild winds
📊 Avg Temp: 28°C | High: 31°C | Low: 26°C
💡 Advice: Carry an umbrella and drink plenty of water.

🧩 n8n Workflow Summary

Node	Purpose
🕕 Schedule Trigger 	    ->    Run daily at 6 PM
🌦️ HTTP Request 	         ->    Fetch weather forecast
🤖 AI Agent (OpenAI) 	    ->    Analyze and generate AI-based summary
🧠 Structured Output Parser ->	  Format AI response into subject & body
📧 Gmail Node               ->    Send personalized forecast email
🔗 Webhook                  ->    Receive user data (name, email, city)
📄 Google Sheet  	        ->    Append user and forecast data

🧠 AI Prompt Example

You are an intelligent weather assistant named "StormAI".
Analyze the 3-hourly forecast and generate:
1. A time-frame–based summary (Morning, Afternoon, Evening, Night)
2. Average / high / low temperature
3. Key condition trends (Rain / Clear / Cloudy)
4. Friendly daily advice
Return result as JSON:
{
  "subject": "...",
  "body": "<html>...</html>"
}

🧪 How to Run Locally

Clone the Repository

git clone https://github.com/yourusername/stormwatch.git
cd stormwatch

Install Dependencies

npm install

Create .env File

VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_OPENAI_API_KEY=your_openai_api_key

Run the App
npm run dev

Open in Browser

http://localhost:5173/


📚 Future Enhancements

🌦️ Extend to 5-day AI forecast summaries
🛰️ Auto-detect location via GPS
📊 Add graphical weather trends
🔔 Add WhatsApp / Telegram notifications
🗣️ Multi-language support (Sinhala, Tamil, English)