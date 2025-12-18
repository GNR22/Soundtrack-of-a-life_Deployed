# 🎵 The Soundtrack of a Life

**The Soundtrack of a Life** is a comprehensive, data-driven music encyclopedia and personal journaling application. It moves beyond simple music search by aggregating specialized data from **four major industry APIs** (Spotify, MusicBrainz, Last.fm, and Genius) to create a 360-degree view of an artist's career.

Users can explore music history, read biographies, view lyrics, and build their own **"Music Story"**—a personal collection of albums complete with ratings, favorites, and detailed written insights.

---

## 🚀 Key Features

### 🧠 The "Data Hub" Architecture
The application acts as a central brain, coordinating data from four distinct sources:
* **🟢 Spotify Integration:** Powers the core visual experience with high-res album covers, tracklists, and 30-second audio previews.
* **🔵 MusicBrainz:** Provides the "Historical Spine," offering accurate career timelines, artist origins, and release data.
* **🔴 Last.fm:** Adds narrative depth with rich artist biographies and album-level wiki summaries.
* **🟡 Genius:** Connects users to the cultural context of songs via verified lyric links and metadata.

### 📖 "My Music Story" (Personal Library)
A robust personal database feature that allows users to:
* **Save Albums:** Add any discovered album to a personal collection.
* **Rate & Favorite:** Rate albums (1-5 Stars) and toggle "Favorites" with a single click.
* **Journal Insights:** Write and save personal notes/memories attached to specific albums.
* **Manage Collection:** Full CRUD capabilities (Create, Read, Update, Delete) with real-time state management.

### ⚡ Interactive UI
* **Dashboard:** A dynamic landing page featuring a "Trending Artists" grid powered by live data.
* **Deep-Dive Album Views:** An encyclopedia-style layout displaying tracks, audio players, historical context, and bios in one view.
* **Smart Navigation:** "Back to Dashboard" and "Search Another" loops to keep users engaged.

---

## 🛠️ Tech Stack

**Backend**
* **Framework:** Laravel 11 (PHP 8.3)
* **Database:** MySQL (via XAMPP)
* **Architecture:** Service-Oriented (Dedicated Services for each API)

**Frontend**
* **Framework:** React
* **Glue:** Inertia.js (Monolith-feel SPA)
* **Styling:** Tailwind CSS

**Environment**
* **Server:** Apache (XAMPP)
* **Dependency Managers:** Composer (PHP), NPM (JS)

---

## ⚙️ Installation & Setup

### Prerequisites
* PHP >= 8.2
* Composer
* Node.js & NPM
* XAMPP (or any MySQL server)

### Step-by-Step Guide

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/soundtrack-of-a-life.git](https://github.com/your-username/soundtrack-of-a-life.git)
    cd soundtrack-of-a-life
    ```

2.  **Install Dependencies**
    ```bash
    composer install
    npm install
    ```

3.  **Environment Configuration**
    Copy the example environment file and generate your key:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4.  **Database Setup**
    * Open XAMPP Control Panel and start **Apache** and **MySQL**.
    * Create a database named `soundtrack` (or whatever matches your DB_DATABASE in .env).
    * Run the migrations:
    ```bash
    php artisan migrate
    ```

5.  **Run the Application**
    You need two terminals open:
    * Terminal 1 (Backend): `php artisan serve`
    * Terminal 2 (Frontend): `npm run dev`

    Visit `http://127.0.0.1:8000` in your browser.

---

## 🔑 API Configuration (.env)

This project requires credentials for all four music services. Add these to your `.env` file:

```env
# 🟢 SPOTIFY (Visuals & Audio)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# 🔴 LAST.FM (Bios & Narratives)
LASTFM_API_KEY=your_lastfm_api_key

# 🔵 MUSICBRAINZ (History & Metadata)
# No Key required, but User-Agent is mandatory to prevent blocking
MUSICBRAINZ_USER_AGENT="SoundtrackOfALife/1.0"
MUSICBRAINZ_USER_AGENT_EMAIL="your-email@example.com"

# 🟡 GENIUS (Lyrics & Context)
GENIUS_ACCESS_TOKEN=your_genius_access_token



📂 Project Structure
The project follows a strict Service-Controller pattern to keep logic clean:

Controllers: Handle HTTP requests and Inertia responses.

MusicController.php: The "Brain" that calls the services.

StoryItemController.php: Handles database saves (ratings/notes).

Services: Handle API communication.

app/Services/SpotifyService.php

app/Services/MusicBrainzService.php

app/Services/LastfmService.php

app/Services/GeniusService.php

Models:

StoryItem.php: The core model linking Users to Albums.