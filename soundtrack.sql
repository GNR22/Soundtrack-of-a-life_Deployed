-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 23, 2025 at 02:26 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: soundtrack
--
CREATE DATABASE IF NOT EXISTS soundtrack DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE soundtrack;

-- --------------------------------------------------------

--
-- Table structure for table cache
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  value mediumtext NOT NULL,
  expiration int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table cache
--

INSERT INTO cache (`key`, value, expiration) VALUES
('laravel-cache-spotify_token', 's:139:\"BQCnzsuRP7OXq8H2-FBQ83VWqGRV_T3Od2_Ga2VtBjGkQ6ZGvt5t1R-BO24vH56Cr9-OVeRpcT44EZ_f7QwOVo0-g6yaQ-CO3DkbBo4R2IpI2kqd1CQwjA9NC4IaNJBeF7BPm6WPlpk\";', 1766455931);

-- --------------------------------------------------------

--
-- Table structure for table cache_locks
--

CREATE TABLE cache_locks (
  `key` varchar(255) NOT NULL,
  owner varchar(255) NOT NULL,
  expiration int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table migrations
--

CREATE TABLE migrations (
  id int(10) UNSIGNED NOT NULL,
  migration varchar(255) NOT NULL,
  batch int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table migrations
--

INSERT INTO migrations (id, migration, batch) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_12_10_174539_create_stories_table', 1),
(5, '2025_12_11_040549_create_story_items_table', 1),
(6, '2025_12_11_041136_add_fields_to_story_items_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table password_reset_tokens
--

CREATE TABLE password_reset_tokens (
  email varchar(255) NOT NULL,
  token varchar(255) NOT NULL,
  created_at timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table sessions
--

CREATE TABLE sessions (
  id varchar(255) NOT NULL,
  user_id bigint(20) UNSIGNED DEFAULT NULL,
  ip_address varchar(45) DEFAULT NULL,
  user_agent text DEFAULT NULL,
  payload longtext NOT NULL,
  last_activity int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table sessions
--

INSERT INTO sessions (id, user_id, ip_address, user_agent, payload, last_activity) VALUES
('1F9EiPXBZ3NqOAQru0FdHDtgTZG5WMmTJv8d9JgM', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiMGE0WmRrU2hpanRJVzM4RjVCUHRtYzcxOVhuaXRqSHNtRkg5YmJEdCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYXNoYm9hcmQiO3M6NToicm91dGUiO3M6OToiZGFzaGJvYXJkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1766452820),
('X30HkmQP4Y9r9hwcEyN2hM5sTDYAsNiUZnzo477S', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiQmtWcFBPMmhZUE1WZ1gyNFZRSEFLelFGUEdVY25sWFZHaVNnQmw0RCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NTE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcnRpc3QvQXZyaWwlMjBMYXZpZ25lL2FsYnVtcyI7czo1OiJyb3V0ZSI7czoxMzoiYXJ0aXN0LmFsYnVtcyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1766198207);

-- --------------------------------------------------------

--
-- Table structure for table story_items
--

CREATE TABLE story_items (
  id bigint(20) UNSIGNED NOT NULL,
  user_id bigint(20) UNSIGNED NOT NULL,
  album_id varchar(255) DEFAULT NULL,
  album_name varchar(255) NOT NULL,
  artist_name varchar(255) NOT NULL,
  album_cover varchar(255) DEFAULT NULL,
  favorite tinyint(1) NOT NULL DEFAULT 0,
  rating int(11) DEFAULT NULL,
  notes varchar(1000) DEFAULT NULL,
  track_count int(11) DEFAULT NULL,
  preview_url varchar(255) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table story_items
--

INSERT INTO story_items (id, user_id, album_id, album_name, artist_name, album_cover, favorite, rating, notes, track_count, preview_url, created_at, updated_at) VALUES
(15, 1, NULL, 'Let Go', 'Avril Lavigne', 'https://i.scdn.co/image/ab67616d0000b273f7ec724fbf97a30869d06240', 1, 5, 'all my life ive been good but now', 13, NULL, '2025-12-19 18:35:05', '2025-12-19 18:35:32');

-- --------------------------------------------------------

--
-- Table structure for table users
--

CREATE TABLE users (
  id bigint(20) UNSIGNED NOT NULL,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  email_verified_at timestamp NULL DEFAULT NULL,
  password varchar(255) NOT NULL,
  remember_token varchar(100) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table users
--

INSERT INTO users (id, name, email, email_verified_at, password, remember_token, created_at, updated_at) VALUES
(1, 'Ryan', 'dhantranada70@gmail.com', NULL, '$2y$12$mGzJV8GtfTfemUGTNP7DGegrrluOun51ZnIqqkJyj.BQOJ8ayODeK', NULL, '2025-12-17 18:40:18', '2025-12-17 18:40:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table cache
--
ALTER TABLE cache
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table cache_locks
--
ALTER TABLE cache_locks
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table migrations
--
ALTER TABLE migrations
  ADD PRIMARY KEY (id);

--
-- Indexes for table password_reset_tokens
--
ALTER TABLE password_reset_tokens
  ADD PRIMARY KEY (email);

--
-- Indexes for table sessions
--
ALTER TABLE sessions
  ADD PRIMARY KEY (id),
  ADD KEY sessions_user_id_index (user_id),
  ADD KEY sessions_last_activity_index (last_activity);

--
-- Indexes for table story_items
--
ALTER TABLE story_items
  ADD PRIMARY KEY (id),
  ADD KEY story_items_user_id_foreign (user_id);

--
-- Indexes for table users
--
ALTER TABLE users
  ADD PRIMARY KEY (id),
  ADD UNIQUE KEY users_email_unique (email);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table migrations
--
ALTER TABLE migrations
  MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table story_items
--
ALTER TABLE story_items
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table users
--
ALTER TABLE users
  MODIFY id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table story_items
--
ALTER TABLE story_items
  ADD CONSTRAINT story_items_user_id_foreign FOREIGN KEY (user_id) REFERENCES `users` (id) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
