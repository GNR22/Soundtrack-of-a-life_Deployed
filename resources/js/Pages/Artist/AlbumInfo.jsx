import { Link, Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AlbumInfo({ auth, album }) {
    // Form for saving to 'My Music Story' database
    const { post, processing } = useForm({
        album_name: album.name,
        artist_name: album.artist,
        album_cover: album.image,
        track_count: album.tracks?.length || 0,

        // Spotify uses 'preview_url', not 'preview'
        preview_url: album.tracks?.[0]?.preview_url || null,
    });

    const [playing, setPlaying] = useState(null);

    const addToStory = () => {
        post("/story-items");
    };

    const playPreview = (url) => {
        if (!url) return;
        if (playing) playing.pause();
        const audio = new Audio(url);
        audio.play();
        setPlaying(audio);
    };

    // Helper to fetch lyrics via your Laravel API
    const fetchLyrics = async (trackName, btnElement) => {
        const originalText = btnElement.innerText;
        btnElement.innerText = '⌛...';
        btnElement.disabled = true;

        try {
            // Ask Laravel for the Genius URL
            const response = await fetch(route('lyrics.fetch', { 
                artist: album.artist, 
                track: trackName 
            }));
            const data = await response.json();
            
            // Open the official Genius URL
            window.open(data.url, '_blank');
        } catch (error) {
            alert('Could not fetch lyrics link.');
        } finally {
            // Reset button
            btnElement.innerText = originalText;
            btnElement.disabled = false;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{album.name} Dashboard</h2>}
        >
            <Head title={`${album.name} - ${album.artist}`} />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/*TOP NAVIGATION */}
                    <div className="flex justify-between items-center">
                        <Link href={route('dashboard')} className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center">
                            ← New Search
                        </Link>
                        <Link href={route('artist.albums', { artist: album.artist })} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                            Back to {album.artist} Albums
                        </Link>
                    </div>

                    {/*MAIN ALBUM HEADER */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <img
                            src={album.image || "https://via.placeholder.com/400"}
                            className="w-72 h-72 rounded-xl shadow-2xl object-cover transform hover:scale-105 transition duration-300"
                            alt={album.name}
                        />
                        <div className="flex-1 text-center md:text-left">
                            <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs">Spotify Verified Album</span>
                            <h1 className="text-5xl font-black text-gray-900 mt-2 mb-1">{album.name}</h1>
                            <p className="text-2xl text-gray-500 mb-8 font-medium">{album.artist}</p>
                            
                            <button
                                onClick={addToStory}
                                disabled={processing}
                                className="inline-flex items-center px-8 py-4 bg-indigo-600 border border-transparent rounded-full font-bold text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 shadow-lg shadow-indigo-200 transition"
                            >
                                {processing ? 'Saving...' : '✨ Add to My Story'}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/*TRACKLIST SECTION */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                                    💿 Tracks <span className="text-sm font-normal text-gray-400">({album.tracks?.length})</span>
                                </h2>
                                <div className="space-y-2">
                                    {album.tracks?.map((track, i) => (
                                        <div key={i} className="group p-4 rounded-xl flex justify-between items-center hover:bg-indigo-50 transition">
                                            <div className="flex items-center gap-4">
                                                <span className="text-gray-300 font-mono text-sm">{i + 1}</span>
                                                <p className="font-semibold text-gray-900">{track.name}</p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {/* Lyrics Button (Genius API) */}
                                                <button
                                                    onClick={(e) => fetchLyrics(track.name, e.currentTarget)}
                                                    className="px-3 py-1 bg-yellow-300 text-yellow-900 text-xs font-bold rounded hover:bg-yellow-400 transition shadow-sm"
                                                    title="View Lyrics on Genius"
                                                >
                                                    📝 Lyrics
                                                </button>

                                                {/* Audio Preview Button */}
                                                {track.preview_url ? (
                                                    <button
                                                        onClick={() => playPreview(track.preview_url)}
                                                        className="p-2 rounded-full text-indigo-600 hover:bg-white hover:shadow-sm transition"
                                                        title="Play Preview"
                                                    >
                                                        ▶️
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-300 text-xs italic">No audio</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/*METADATA SIDEBAR */}
                        <div className="space-y-8">
                            {/* Last.fm Bio */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                                    📜 Album Bio <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded">LAST.FM</span>
                                </h3>
                                <div 
                                    className="text-gray-600 text-sm leading-relaxed line-clamp-6 hover:line-clamp-none transition-all duration-500"
                                    dangerouslySetInnerHTML={{ __html: album.lastfm_info?.summary || 'No bio available for this release.' }} 
                                />
                            </div>

                            {/* MusicBrainz Context */}
                            <div className="bg-indigo-900 p-6 rounded-2xl shadow-xl text-white">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    🔍 Historical Context <span className="text-[10px] bg-indigo-700 px-1 rounded">MUSICBRAINZ</span>
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-indigo-300 text-[10px] uppercase font-bold">Official Release Data</p>
                                        <p className="text-sm">{album.history?.details || 'Retrieving historical metadata...'}</p>
                                    </div>
                                    <div className="pt-4 border-t border-indigo-800">
                                        <p className="text-indigo-300 text-[10px] uppercase font-bold">External Links</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="px-2 py-1 bg-indigo-800 rounded text-[10px]">Genius Verified</span>
                                            <span className="px-2 py-1 bg-indigo-800 rounded text-[10px]">MetaBrainz ID</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}