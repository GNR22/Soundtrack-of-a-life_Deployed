# 🎵 The Soundtrack of a Life

**The Soundtrack of a Life** is an interactive, web-based musical journey that allows users to explore trending music, track their personal listening history, and curate a digital "soundtrack" of their memories.

Built with **Laravel 11** and **React (Inertia.js)**, this project demonstrates a modern, service-oriented architecture that aggregates data from multiple external APIs (Spotify, Last.fm, MusicBrainz) into a seamless user experience.

## 🚀 Live Demo
**[View the Live Application](https://soundtrack-of-a-life-deployed.vercel.app)**

## ✨ Key Features
* **Interactive Dashboard:** Features a 3D animated background (Three.js) and a "Coverflow" style album browser.
* **Multi-API Integration:**
    * **Spotify:** Core data, album artwork, and trending charts.
    * **Last.fm:** Detailed artist biographies and album stories.
    * **MusicBrainz:** Historical context and metadata.
    * **Lyrics.ovh:** On-demand lyrics fetching.
* **Cloud-Native Database:** Fully migrated from local MySQL to **Neon DB (PostgreSQL)** for high-performance, serverless data management.
* **Smart Caching:** Implemented aggressive caching strategies (Redis/Database) to minimize API latency and handle high traffic.
* **Service-Oriented Architecture:** Backend logic is decoupled into dedicated Service classes for maintainability and scalability.

## 🛠️ Tech Stack
* **Frontend:** React, Inertia.js, Tailwind CSS, Three.js
* **Backend:** Laravel 11, PHP 8.2+
* **Database:** PostgreSQL (Hosted on Neon DB)
* **Deployment:** Vercel (Serverless Functions)

## ⚙️ Local Development Setup

Follow these steps to run the project locally on your machine.

### 1. Prerequisites
* PHP 8.2 or higher
* Composer
* Node.js & NPM
* **PostgreSQL Driver:** Ensure `extension=pdo_pgsql` and `extension=pgsql` are uncommented in your `php.ini`.

### 2. Installation
Clone the repository:
```bash
git clone [https://github.com/your-username/soundtrack-of-a-life.git](https://github.com/your-username/soundtrack-of-a-life.git)
cd soundtrack-of-a-life



Install dependencies:
composer install
npm install


Here is the updated README.md file. I have added the "Known Issues & Bugs" section specifically detailing the Spotify playback limitation, as you requested.

You can copy this directly into your file.

Markdown

# 🎵 The Soundtrack of a Life

**The Soundtrack of a Life** is an interactive, web-based musical journey that allows users to explore trending music, track their personal listening history, and curate a digital "soundtrack" of their memories.

Built with **Laravel 11** and **React (Inertia.js)**, this project demonstrates a modern, service-oriented architecture that aggregates data from multiple external APIs (Spotify, Last.fm, MusicBrainz) into a seamless user experience.

## 🚀 Live Demo
**[View the Live Application](https://soundtrack-of-a-life-deployed.vercel.app)**

## ✨ Key Features
* **Interactive Dashboard:** Features a 3D animated background (Three.js) and a "Coverflow" style album browser.
* **Multi-API Integration:**
    * **Spotify:** Core data, album artwork, and trending charts.
    * **Last.fm:** Detailed artist biographies and album stories.
    * **MusicBrainz:** Historical context and metadata.
    * **Lyrics.ovh:** On-demand lyrics fetching.
* **Cloud-Native Database:** Fully migrated from local MySQL to **Neon DB (PostgreSQL)** for high-performance, serverless data management.
* **Smart Caching:** Implemented aggressive caching strategies (Redis/Database) to minimize API latency and handle high traffic.
* **Service-Oriented Architecture:** Backend logic is decoupled into dedicated Service classes for maintainability and scalability.

## 🛠️ Tech Stack
* **Frontend:** React, Inertia.js, Tailwind CSS, Three.js
* **Backend:** Laravel 11, PHP 8.2+
* **Database:** PostgreSQL (Hosted on Neon DB)
* **Deployment:** Vercel (Serverless Functions)

## ⚙️ Local Development Setup

Follow these steps to run the project locally on your machine.

### 1. Prerequisites
* PHP 8.2 or higher
* Composer
* Node.js & NPM
* **PostgreSQL Driver:** Ensure `extension=pdo_pgsql` and `extension=pgsql` are uncommented in your `php.ini`.

### 2. Installation
Clone the repository:
```bash
git clone [https://github.com/your-username/soundtrack-of-a-life.git](https://github.com/your-username/soundtrack-of-a-life.git)
cd soundtrack-of-a-life
Install dependencies:

Bash

composer install
npm install
3. Environment Configuration
Copy the example environment file:
cp .env.example .env

Configure Neon DB: Open .env and update the database section with your Neon Connection String:
DB_CONNECTION=pgsql
DB_HOST=ep-noisy-meadow-123456.us-east-1.aws.neon.tech
DB_PORT=5432
DB_DATABASE=soundtrackoflife
DB_USERNAME=neondb_owner
DB_PASSWORD=your_neon_password


Configure API Keys: You will need API keys for the music services:
SPOTIFY_CLIENT_ID=your_id
SPOTIFY_CLIENT_SECRET=your_secret
LASTFM_KEY=your_key


4. Database Setup
Since we are using Neon, you don't need a local database server running. Just run the migrations to create tables in the cloud:
type: 
php artisan migrate


5. Run the Application
You will need two terminals running:

Terminal 1 (Backend):
Bash
php artisan serve


Terminal 2 (Frontend):
Bash

npm run dev
Visit http://localhost:8000 to see the app.


☁️ Deployment (Vercel)
This project is configured for deployment on Vercel using a serverless architecture.

vercel.json: Configures the PHP runtime and routing.

api/index.php: Serves as a bridge to forward serverless requests to Laravel's public entry point.

AppServiceProvider.php: Forces HTTPS scheme production to prevent "Mixed Content" errors.

To deploy:

Push code to GitHub.

Import project into Vercel.

Set the Framework Preset to Other.

Add Environment Variables (Copy APP_KEY, DB_*, and API keys from local .env).

Critical: Set SESSION_DRIVER and CACHE_STORE to database or cookie in Vercel settings.

🐛 Known Issues & Bugs
Spotify Full Playback Limitations:
-Not playing the full track? sign in your spotify in the browser it should sync with the system.
-Login button issue (if you click it it will output error 404 just refresh it and it will go to dashboard)

🤝 Credits
Developed by 
Ryan Ranada
Vanessa Arcadio
Erica Del Carmen 

Background 3D effects powered by Three.js.
Music data provided by Spotify Web API.
Metadata provided by MusicBrainz and Last.fm.