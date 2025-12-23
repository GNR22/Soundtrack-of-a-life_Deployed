import { Link, Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function AlbumInfo({ auth, album }) {
    const { post, processing } = useForm({
        album_name: album.name,
        artist_name: album.artist,
        album_cover: album.image,
        track_count: album.tracks?.length || 0,
        preview_url: album.tracks?.[0]?.preview_url || null,
    });

    const [activeTrackId, setActiveTrackId] = useState(null);
    
    // NEW: State to control the Lyrics Pop-up
    const [lyricsModal, setLyricsModal] = useState({ 
        isOpen: false, 
        text: '', 
        trackName: '' 
    });

    const addToStory = () => {
        post("/story-items");
    };

    const fetchLyrics = async (trackName, btnElement) => {
        const originalText = btnElement.innerText;
        btnElement.innerText = '...';
        btnElement.disabled = true;

        try {
            // Fetch text from your new Laravel endpoint
            const response = await fetch(route('lyrics.fetch', { 
                artist: album.artist, 
                track: trackName 
            }));
            const data = await response.json();
            
            // Open the Modal with the text
            setLyricsModal({
                isOpen: true,
                text: data.lyrics, // This comes from the controller we just wrote
                trackName: trackName
            });

        } catch (error) {
            alert('Could not load lyrics.');
        } finally {
            btnElement.innerText = originalText;
            btnElement.disabled = false;
        }
    };

    const closeLyrics = () => {
        setLyricsModal({ ...lyricsModal, isOpen: false });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{album.name} Dashboard</h2>}
        >
            <Head title={`${album.name} - ${album.artist}`} />

            {/* --- NEW: LYRICS MODAL OVERLAY --- */}
            {lyricsModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4 animate-fade-in transition-all">
                    {/* Modal Box */}
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden transform scale-100 transition-all">
                        
                        {/* Header */}
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{lyricsModal.trackName}</h3>
                                <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide">{album.artist}</p>
                            </div>
                            <button 
                                onClick={closeLyrics}
                                className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        {/* Scrolling Content */}
                        <div className="p-8 overflow-y-auto bg-white custom-scrollbar">
                            <pre className="whitespace-pre-wrap font-sans text-gray-700 text-lg leading-relaxed text-center">
                                {lyricsModal.text}
                            </pre>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                            <button 
                                onClick={closeLyrics}
                                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform hover:-translate-y-0.5"
                            >
                                Close Lyrics
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                        <Link href={route('dashboard')} className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center">
                            ← New Search
                        </Link>
                        <Link href={route('artist.albums', { artist: album.artist })} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                            Back to {album.artist} Albums
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <img src={album.image || "https://via.placeholder.com/400"} className="w-72 h-72 rounded-xl shadow-2xl object-cover transform hover:scale-105 transition duration-300" alt={album.name} />
                        <div className="flex-1 text-center md:text-left">
                            <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs">Spotify Verified Album</span>
                            <h1 className="text-5xl font-black text-gray-900 mt-2 mb-1">{album.name}</h1>
                            <p className="text-2xl text-gray-500 mb-8 font-medium">{album.artist}</p>
                            <button onClick={addToStory} disabled={processing} className="inline-flex items-center px-8 py-4 bg-indigo-600 border border-transparent rounded-full font-bold text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 shadow-lg shadow-indigo-200 transition">
                                {processing ? 'Saving...' : '✨ Add to My Story'}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Tracks */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                                    💿 Tracks <span className="text-sm font-normal text-gray-400">({album.tracks?.length})</span>
                                </h2>
                                <div className="space-y-4">
                                    {album.tracks?.map((track, i) => (
                                        <div key={i} className={`group p-4 rounded-xl border transition ${activeTrackId === track.id ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-transparent hover:bg-gray-50'}`}>
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-gray-300 font-mono text-sm">{i + 1}</span>
                                                    <p className={`font-semibold ${activeTrackId === track.id ? 'text-indigo-700' : 'text-gray-900'}`}>{track.name}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {/* LYRICS BUTTON */}
                                                    <button onClick={(e) => fetchLyrics(track.name, e.currentTarget)} className="px-3 py-1 bg-yellow-300 text-yellow-900 text-xs font-bold rounded hover:bg-yellow-400 transition shadow-sm">
                                                        📝 Lyrics
                                                    </button>
                                                    {activeTrackId !== track.id && (
                                                        <button onClick={() => setActiveTrackId(track.id)} className="p-2 rounded-full text-indigo-600 hover:bg-indigo-100 transition">▶️ Play</button>
                                                    )}
                                                </div>
                                            </div>
                                            {activeTrackId === track.id && (
                                                <div className="mt-3 animate-fade-in">
                                                    <iframe src={`https://open.spotify.com/embed/track/${track.id}`} width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media" className="rounded-lg shadow-sm"></iframe>
                                                    <button onClick={() => setActiveTrackId(null)} className="text-xs text-red-500 hover:text-red-700 mt-2 ml-1">Close Player</button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">📜 Album Bio <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded">LAST.FM</span></h3>
                                <div className="text-gray-600 text-sm leading-relaxed line-clamp-6 hover:line-clamp-none transition-all duration-500" dangerouslySetInnerHTML={{ __html: album.lastfm_info?.summary || 'No bio available.' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}