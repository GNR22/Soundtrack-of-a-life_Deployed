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

An interactive music discovery and personal music journal application built with Laravel 11, React (Inertia.js), and PostgreSQL. The platform combines data from Spotify, Last.fm, MusicBrainz, and Genius to help users explore artists, albums, music history, and build their own personalized music story.

---

## 🚀 Live Demo

https://soundtrack-of-a-life-deployed.vercel.app

---

## ✨ Features

* Browse trending artists and albums
* View artist profiles, discographies, and album details
* Explore historical music information through MusicBrainz
* Read artist biographies and album information from Last.fm
* Access song metadata and lyric links
* Create a personal music collection with ratings and notes
* Interactive dashboard with Three.js visual effects
* Cloud-hosted PostgreSQL database using Neon DB
* Smart caching system for improved performance

---

## 🛠️ Tech Stack

### Frontend

* React
* Inertia.js
* Tailwind CSS
* Three.js

### Backend

* Laravel 11
* PHP 8.2+

### Database

* PostgreSQL (Neon DB)

### APIs

* Spotify Web API
* Last.fm API
* MusicBrainz API
* Genius API

### Deployment

* Vercel

---

## 📂 Project Structure

| File Path                                    | Purpose                                            |
| -------------------------------------------- | -------------------------------------------------- |
| app/Http/Controllers/MusicController.php     | Main controller that coordinates all music APIs    |
| app/Http/Controllers/StoryItemController.php | Handles CRUD operations for user music collections |
| app/Services/SpotifyService.php              | Spotify integration                                |
| app/Services/LastfmService.php               | Artist biographies and album information           |
| app/Services/MusicBrainzService.php          | Historical music metadata                          |
| app/Services/GeniusService.php               | Lyrics and song metadata                           |
| resources/js/Pages/Dashboard.jsx             | Trending artists dashboard                         |
| resources/js/Pages/Artist/Show.jsx           | Artist profile page                                |
| resources/js/Pages/Artist/Albums.jsx         | Artist discography page                            |
| resources/js/Pages/Artist/AlbumInfo.jsx      | Detailed album information page                    |
| resources/js/Pages/Artist/History.jsx        | Historical music timeline                          |
| resources/js/Pages/Story/Index.jsx           | Personal music collection page                     |
| routes/web.php                               | Application routes                                 |

---

## 🗄️ Database Setup

This project uses Neon PostgreSQL.

Update your `.env` file:

```env
DB_CONNECTION=pgsql
DB_HOST=your-neon-host
DB_PORT=5432
DB_DATABASE=your-database
DB_USERNAME=your-username
DB_PASSWORD=your-password
```

If migration issues occur, you may import the provided SQL schema directly into Neon using the SQL Editor.

---

## ⚡ Performance Optimizations

### File-Based Sessions

```env
SESSION_DRIVER=file
```

Reduces login latency by avoiding unnecessary cloud database requests.

### File-Based Cache

```env
CACHE_STORE=file
```

Stores temporary data locally for faster application response times.

### Extended PHP Execution Time

Added:

```php
set_time_limit(120);
```

to allow slower network requests sufficient time to complete.

### Smart API Caching

Implemented using:

```php
Cache::remember()
```

Benefits:

* Trending artists cached for 1 hour
* Album information cached for 24 hours
* Faster page loads
* Reduced API calls
* Improved reliability

---

## ⚙️ Local Installation

Install dependencies:

```bash
composer install
npm install
```

Clear caches:

```bash
php artisan optimize:clear
```

Run backend:

```bash
php artisan serve
```

Run frontend:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:8000
```

If Dashboard access fails, register a new account first.

---
## 🗄️ Database Setup

This project supports two database configurations:

### Option 1: Local MySQL (phpMyAdmin/XAMPP)

A complete MySQL database dump is included for users who want to run the application locally using XAMPP and phpMyAdmin.

Steps:

1. Start Apache and MySQL in XAMPP.
2. Open phpMyAdmin.
3. Create a database named:

```sql
soundtrack
```

4. Import the provided MySQL SQL dump file.
5. Update your `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=soundtrack
DB_USERNAME=root
DB_PASSWORD=
```

The MySQL dump contains:

* users
* story_items
* sessions
* cache
* cache_locks
* migrations
* password_reset_tokens

along with sample data and foreign key relationships.

---

### Option 2: Neon PostgreSQL (Recommended)

The project was migrated from MySQL to Neon PostgreSQL for cloud-based deployment.

If Laravel migrations fail or encounter compatibility issues, you may import the provided PostgreSQL migration script directly into the Neon SQL Editor.

Steps:

1. Create a Neon project.
2. Open the SQL Editor.
3. Paste and execute the provided PostgreSQL script.
4. Update your `.env` file:

```env
DB_CONNECTION=pgsql
DB_HOST=ep-noisy-meadow-adqcsvhi-pooler.c-2.us-east-1.aws.neon.tech
DB_PORT=5432
DB_DATABASE=soundtrackoflife
DB_USERNAME=neondb_owner
DB_PASSWORD=your_password
```

The PostgreSQL script creates:

* users
* story_items
* sessions
* cache
* cache_locks
* migrations
* password_reset_tokens

and inserts migration history records so Laravel recognizes the database as already migrated.

This bypasses migration issues and allows the application to run immediately after configuration.

---

### Migration Notes

The original application was developed using MySQL and phpMyAdmin. During deployment, the database was migrated to Neon PostgreSQL.

Key adjustments included:

* Converting MySQL AUTO_INCREMENT fields to PostgreSQL IDENTITY columns.
* Converting tinyint(1) fields to BOOLEAN.
* Recreating indexes and foreign key constraints.
* Updating Laravel database configuration to use PostgreSQL.
* Importing migration history records to maintain Laravel compatibility.

Both database versions are provided for educational purposes and easier local development.


## 🐛 Known Issues

### Spotify Playback

Spotify may not play full tracks unless you are logged into Spotify in the same browser.

### Login Redirect

Occasionally clicking Login may result in a 404 error.

Solution:

* Refresh the page
* Navigate back to Dashboard

---

## 👨‍💻 Developers

* Ryan Ranada
* Vanessa Arcadio
* Erica Del Carmen

---

## 🙏 Credits

* Three.js for 3D visual effects
* Spotify Web API
* Last.fm API
* MusicBrainz API
* Genius API
* Neon PostgreSQL
* Laravel Framework
