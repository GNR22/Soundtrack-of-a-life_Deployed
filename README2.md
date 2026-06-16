<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).


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
