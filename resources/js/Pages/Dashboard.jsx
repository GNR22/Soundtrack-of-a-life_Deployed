import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ThreeBackground from '@/Components/ThreeBackground';
import { useMemo, useState } from 'react';

export default function Dashboard({ auth, featured = [], trendingAlbums = [] }) {
    
    const { data, setData, get } = useForm({
        artist: '',
    });

    const [isMarqueePaused, setIsMarqueePaused] = useState(false);
    const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);

    const handleSearch = (e) => {
        e.preventDefault();
        if (data.artist.trim()) {
            get(route('artist.show', { artist: data.artist }));
        }
    };

    // Use trending albums from API
    const albumsToDisplay = trendingAlbums;

    // Get random featured artist for background
    const randomArtist = useMemo(() => {
        if (featured.length === 0) return null;
        return featured[Math.floor(Math.random() * featured.length)];
    }, [featured]);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="The Soundtrack of Life" />

            {/* --- THREE.JS BACKGROUND --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <ThreeBackground /> 
            </div>
            
            {/* --- MAIN SCROLL CONTAINER --- */}
            <div className="relative z-10 h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"> 
                
               {/* ========================== */}
{/* PAGE 1: SOUNDTRACK OF LIFE */}
{/* ========================== */}
<section className="min-h-screen flex flex-col justify-center snap-start p-6 relative overflow-hidden">         
    
    {/* Top Right Logout Button */}
    <div className="absolute top-6 right-6 z-50">
        <Link 
            href={route('logout')} 
            method="post" 
            as="button" 
            className="flex items-center gap-2 px-5 py-2.5 bg-black/30 hover:bg-rose-900/40 backdrop-blur-md border border-white/10 hover:border-rose-500/50 rounded-full text-white font-bold text-sm transition-all duration-300 hover:scale-105 shadow-xl"
        >
            <span>🚪</span> Log Out
        </Link>
    </div>

    <div className="mx-auto max-w-7xl w-full space-y-6 relative z-10">
        
        {/* Title for Page 1 */}
        <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">
                The Soundtrack of Life
            </h1>
            <p className="text-indigo-200 text-xl font-light tracking-wide">
                Welcome back, <span className="font-bold text-white">{auth.user.name}</span>.
            </p>
        </div>

        {/* Search & Links Grid */}
        {/* CHANGED: Removed 'items-center' so they stretch to equal height */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            
            {/* Explore / Search Box */}
            {/* CHANGED: Added 'h-full' */}
            <div className="bg-black/40 backdrop-blur-md shadow-2xl rounded-lg p-4 border border-white/10 h-full flex flex-col justify-center"> 
                <h3 className="text-sm font-bold mb-2 text-white">Explore Artists</h3> 
                <form onSubmit={handleSearch} className="flex flex-col gap-2">
                    <input 
                        type="text" 
                        value={data.artist}
                        onChange={e => setData('artist', e.target.value)}
                        placeholder="Search..."
                        className="w-full bg-white/10 border-white/20 text-white text-xs placeholder-gray-400 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-1.5 px-2"
                    />
                    <button 
                        type="submit"
                        className="w-full px-3 py-1.5 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition font-bold shadow-lg hover:shadow-indigo-500/50"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Collection Box */}
            {/* CHANGED: Added 'h-full' to match neighbor height */}
            <div className="bg-black/40 backdrop-blur-md shadow-2xl rounded-lg p-4 flex flex-col justify-center border border-white/10 h-full">
                <h3 className="text-sm font-bold mb-2 text-white">My Collection</h3>
                <Link 
                    href={route('story.index')} 
                    className="block text-center px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 rounded-lg font-bold text-indigo-300 text-xs transition border border-indigo-500/30 hover:scale-105"
                >
                    📖 Music Story
                </Link>
            </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="text-center mt-8 animate-bounce">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Scroll to Begin</p>
            <span className="text-white text-2xl">↓</span>
        </div>
    </div>
</section>


                {/* ========================== */}
                {/* PAGE 2: START YOUR JOURNEY */}
                {/* ========================== */}
                <section className="min-h-screen flex flex-col justify-center items-center snap-start p-6 bg-black/20">
                    <div className="text-center max-w-3xl bg-black/40 backdrop-blur-md p-12 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 mb-8">
                            Start Your Journey
                        </h2>
                        <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed font-light">
                            Create your own musical timeline. Discover new artists, 
                            track your listening history, and share your story with the world.
                        </p>
                        <Link 
                            href={route('story.index')}
                            className="inline-block px-10 py-5 bg-white text-indigo-900 font-bold rounded-full text-lg hover:bg-indigo-50 hover:scale-110 transition duration-300 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                        >
                            Get Started
                        </Link>
                    </div>
                </section>


                {/* ========================== */}
                {/* PAGE 3: TRENDING ARTISTS   */}
                {/* ========================== */}
                <section className="min-h-screen flex flex-col justify-center snap-start p-6 bg-gradient-to-b from-transparent to-black/40">
                    <div className="mx-auto max-w-7xl w-full">
                        <div className="bg-black/30 backdrop-blur-md shadow-2xl sm:rounded-2xl p-8 md:p-12 border border-white/10">
                            <h3 className="text-3xl font-bold mb-8 text-white border-b border-white/10 pb-4 flex items-center gap-3">
                                <span className="text-orange-500">🔥</span> Trending Now
                            </h3>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {featured.map((artist) => (
                                    <Link 
                                        key={artist.id}
                                        href={route('artist.show', { artist: artist.name })}
                                        className="block text-center transition-all duration-300 ease-in-out group"
                                    >
                                        {/* PICTURE CONTAINER */}
                                        <div className="
                                            relative overflow-hidden rounded-full aspect-square mb-5 mx-auto 
                                            w-32 h-32 md:w-48 md:h-48 
                                            shadow-2xl border-4 border-white/5
                                            
                                            /* TRANSITION */
                                            transition-all duration-300 ease-out
                                            
                                            /* POP UP LOGIC */
                                            hover:scale-125
                                            hover:z-50
                                            hover:shadow-[0_0_40px_rgba(99,102,241,0.8)]
                                            hover:border-indigo-400/50
                                        ">
                                            <img 
                                                src={artist.images?.[0]?.url || 'https://via.placeholder.com/300'} 
                                                alt={artist.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        <h4 className="font-bold text-xl text-white mt-4 group-hover:text-indigo-400 transition">
                                            {artist.name}
                                        </h4>
                                        <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">
                                            {Number(artist.followers?.total || 0).toLocaleString()} Fans
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                {/* ========================== */}
                {/* PAGE 4: TRENDING ALBUMS    */}
                {/* ========================== */}
                <section className="min-h-screen flex flex-col justify-center snap-start p-6 bg-black/40">
                    <style>{`
                        .coverflow-container {
                            perspective: 1200px;
                            width: 100%;
                            height: 450px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            margin: 40px 0;
                        }

                        .coverflow-wrapper {
                            position: relative;
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }

                        .coverflow-card {
                            position: absolute;
                            width: 280px;
                            height: 380px;
                            transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                            cursor: pointer;
                        }

                        .coverflow-card-inner {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            padding: 16px;
                            border-radius: 16px;
                            background: rgba(20, 20, 20, 0.8);
                            border: 2px solid rgba(167, 139, 250, 0.3);
                            backdrop-filter: blur(10px);
                            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                            transition: all 0.4s ease;
                        }

                        .coverflow-card.active .coverflow-card-inner {
                            border-color: rgba(167, 139, 250, 1);
                            background: rgba(20, 20, 20, 0.95);
                            box-shadow: 0 0 40px rgba(167, 139, 250, 0.5),
                                    inset 0 0 20px rgba(167, 139, 250, 0.1);
                            transform: scale(1.08);
                        }

                        .coverflow-card:hover .coverflow-card-inner {
                            border-color: rgba(167, 139, 250, 0.8);
                            box-shadow: 0 0 30px rgba(167, 139, 250, 0.4);
                        }

                        .album-cover-wrapper {
                            width: 100%;
                            aspect-ratio: 1;
                            border-radius: 12px;
                            overflow: hidden;
                            margin-bottom: 12px;
                            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
                            flex-shrink: 0;
                        }

                        .album-cover-img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            transition: transform 0.6s ease;
                        }

                        .coverflow-card.active .album-cover-img {
                            transform: scale(1.05);
                        }

                        .album-info {
                            display: flex;
                            flex-direction: column;
                            gap: 6px;
                            flex: 1;
                        }

                        .album-title {
                            font-size: 14px;
                            font-weight: 700;
                            color: white;
                            line-height: 1.3;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                        }

                        .album-artist {
                            font-size: 12px;
                            color: rgba(167, 139, 250, 0.8);
                            font-weight: 500;
                        }

                        .album-detail-pane {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            gap: 12px;
                            min-width: 350px;
                            padding: 24px;
                            background: rgba(20, 20, 20, 0.7);
                            border-radius: 16px;
                            border: 1px solid rgba(167, 139, 250, 0.2);
                            backdrop-filter: blur(10px);
                        }

                        .detail-title {
                            font-size: 24px;
                            font-weight: 700;
                            color: white;
                            margin-bottom: 8px;
                        }

                        .detail-artist {
                            font-size: 16px;
                            color: rgba(167, 139, 250, 1);
                            font-weight: 500;
                            margin-bottom: 12px;
                        }

                        .detail-section {
                            display: flex;
                            flex-direction: column;
                            gap: 4px;
                        }

                        .detail-label {
                            font-size: 11px;
                            color: rgba(255, 255, 255, 0.5);
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            font-weight: 600;
                        }

                        .detail-value {
                            font-size: 14px;
                            color: rgba(255, 255, 255, 0.9);
                            line-height: 1.5;
                        }

                        .carousel-controls {
                            display: flex;
                            gap: 12px;
                            justify-content: center;
                            margin-top: 20px;
                        }

                        .control-btn {
                            padding: 8px 16px;
                            border-radius: 8px;
                            border: 1px solid rgba(167, 139, 250, 0.5);
                            background: rgba(167, 139, 250, 0.1);
                            color: rgba(167, 139, 250, 1);
                            cursor: pointer;
                            font-weight: 600;
                            font-size: 12px;
                            transition: all 0.3s ease;
                        }

                        .control-btn:hover {
                            background: rgba(167, 139, 250, 0.2);
                            border-color: rgba(167, 139, 250, 1);
                            box-shadow: 0 0 15px rgba(167, 139, 250, 0.3);
                        }

                        .carousel-indicators {
                            display: flex;
                            gap: 6px;
                            justify-content: center;
                            margin-top: 12px;
                        }

                        .indicator-dot {
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: rgba(167, 139, 250, 0.3);
                            cursor: pointer;
                            transition: all 0.3s ease;
                        }

                        .indicator-dot.active {
                            width: 24px;
                            border-radius: 4px;
                            background: rgba(167, 139, 250, 1);
                            box-shadow: 0 0 15px rgba(167, 139, 250, 0.6);
                        }
                    `}</style>

                    <div className="mx-auto max-w-7xl w-full">
                        <h3 className="text-3xl font-bold mb-2 text-white border-b border-white/10 pb-4 flex items-center gap-3">
                            <span className="text-purple-500">💿</span> Trending Albums
                        </h3>

                        {/* Coverflow Carousel */}
                        <div className="flex gap-8 items-start">
                            {/* Coverflow Container */}
                            <div className="flex-1 min-w-[600px]">
                                <div className="coverflow-container">
                                    <div className="coverflow-wrapper">
                                        {albumsToDisplay.map((album, index) => {
                                            const offset = index - currentAlbumIndex;
                                            const isActive = offset === 0;
                                            const distance = Math.abs(offset);
                                            
                                            let rotateY = offset * 35;
                                            let translateZ = -distance * 100;
                                            let scale = 1 - distance * 0.15;
                                            let opacity = 1 - distance * 0.2;
                                            
                                            if (distance > 2) {
                                                opacity = 0;
                                                scale = 0;
                                            }

                                            return (
                                                <div
                                                    key={`${album.id}-${index}`}
                                                    className={`coverflow-card ${isActive ? 'active' : ''}`}
                                                    onClick={() => setCurrentAlbumIndex(index)}
                                                    style={{
                                                        transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                                                        opacity: opacity,
                                                        zIndex: isActive ? 10 : Math.max(0, 5 - distance),
                                                    }}
                                                >
                                                    <div className="coverflow-card-inner">
                                                        <div className="album-cover-wrapper">
                                                            <img
                                                                src={album.cover}
                                                                alt={album.title}
                                                                className="album-cover-img"
                                                            />
                                                        </div>
                                                        <div className="album-info">
                                                            <div className="album-title">{album.title}</div>
                                                            <div className="album-artist">{album.artist}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="carousel-controls">
                                    <button
                                        className="control-btn"
                                        onClick={() => setCurrentAlbumIndex((prev) => (prev - 1 + albumsToDisplay.length) % albumsToDisplay.length)}
                                    >
                                        ← Previous
                                    </button>
                                    <button
                                        className="control-btn"
                                        onClick={() => setCurrentAlbumIndex((prev) => (prev + 1) % albumsToDisplay.length)}
                                    >
                                        Next →
                                    </button>
                                </div>

                                {/* Indicators */}
                                <div className="carousel-indicators">
                                    {albumsToDisplay.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`indicator-dot ${index === currentAlbumIndex ? 'active' : ''}`}
                                            onClick={() => setCurrentAlbumIndex(index)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Album Detail Pane */}
                            <div className="album-detail-pane">
                                <div>
                                    <div className="detail-title">{albumsToDisplay[currentAlbumIndex]?.title}</div>
                                    <div className="detail-artist">{albumsToDisplay[currentAlbumIndex]?.artist}</div>
                                </div>

                                {/* Album Story from Last.FM */}
                                <div className="detail-section">
                                    <div className="detail-label">Album Story</div>
                                    <div className="detail-value">
                                        {albumsToDisplay[currentAlbumIndex]?.lastfmInfo?.wiki?.summary 
                                            ? albumsToDisplay[currentAlbumIndex].lastfmInfo.wiki.summary.substring(0, 200) + '...'
                                            : 'A curated album from the trending charts. Experience the latest sounds and discover your next favorite track.'}
                                    </div>
                                </div>

                                {/* Additional Info from Last.FM */}
                                {albumsToDisplay[currentAlbumIndex]?.lastfmInfo?.wiki?.published && (
                                    <div className="detail-section">
                                        <div className="detail-label">Published</div>
                                        <div className="detail-value">
                                            {new Date(albumsToDisplay[currentAlbumIndex].lastfmInfo.wiki.published).toLocaleDateString()}
                                        </div>
                                    </div>
                                )}

                                <div className="detail-section">
                                    <div className="detail-label">Release Year</div>
                                    <div className="detail-value">2024</div>
                                </div>

                                <div className="detail-section">
                                    <div className="detail-label">Genre</div>
                                    <div className="detail-value">Pop, Electronic, Hip-Hop</div>
                                </div>

                                {/* Track count from Last.FM */}
                                <div className="detail-section">
                                    <div className="detail-label">Tracks</div>
                                    <div className="detail-value">
                                        {albumsToDisplay[currentAlbumIndex]?.lastfmInfo?.tracks?.length || '12'} Tracks
                                    </div>
                                </div>

                                {/* Spotify Explore Button */}
                                <a 
                                    href={albumsToDisplay[currentAlbumIndex]?.spotifyUrl || '#'} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg text-center"
                                >
                                    🎵 Explore on Spotify
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer Area */}
                    <div className="absolute bottom-6 w-full text-center text-gray-500 text-sm left-0">
                        &copy; 2024 Soundtrack of Life. All rights reserved.
                    </div>
                </section>

            </div>
        </AuthenticatedLayout>
    );
}