import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Story({ auth, items }) {
    // Local state to track note changes before saving
    // We use an object where keys are item IDs: { 1: "My note...", 5: "Another note..." }
    const [notes, setNotes] = useState({});

    // Helper to update local state when typing
    const handleNoteChange = (id, value) => {
        setNotes(prev => ({ ...prev, [id]: value }));
    };

    // Helper to save the specific note
    const saveNote = (id, currentNote) => {
        // If user hasn't typed anything new, don't send a request
        if (notes[id] === undefined) return;

        router.patch(`/story-items/${id}`, 
            { notes: notes[id] },
            { preserveScroll: true }
        );
        
       
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Music Story</h2>}
        >
            <Head title="My Story" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Navigation Row */}
                    <div className="mb-6">
                        <Link
                            href={route('dashboard')}
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 transition ease-in-out duration-150"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>

                    {items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item) => (
                                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                                    {/* Album Cover */}
                                    <div className="relative">
                                        <img 
                                            src={item.album_cover || "/api/placeholder/400/400"} 
                                            alt={item.album_name}
                                            className="w-full h-48 object-cover"
                                        />
                                        {item.favorite && (
                                            <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm">
                                                💜
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="text-lg font-bold text-gray-900 truncate">{item.album_name}</h3>
                                        <p className="text-gray-600 mb-4">{item.artist_name}</p>

                                        {/* Interaction Bar (Ratings & Favorites) */}
                                        <div className="flex items-center justify-between gap-2 mb-4">
                                            <select
                                                className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                value={item.rating ?? ''}
                                                onChange={e => router.patch(`/story-items/${item.id}`, { rating: e.target.value }, { preserveScroll: true })}
                                            >
                                                <option value="">Rate</option>
                                                {[1, 2, 3, 4, 5].map(r => (
                                                    <option key={r} value={r}>{r} ⭐</option>
                                                ))}
                                            </select>

                                            <button
                                                className={`text-sm px-3 py-1 rounded-md border transition ${item.favorite ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                                                onClick={() => router.patch(`/story-items/${item.id}`, { favorite: !item.favorite }, { preserveScroll: true })}
                                            >
                                                {item.favorite ? '💜 Favorite' : '🤍 Favorite'}
                                            </button>
                                        </div>

                                        {/* Notes Section with SAVE Button */}
                                        <div className="mb-4">
                                            <textarea
                                                placeholder="Write your thoughts..."
                                                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mb-2 h-20 resize-none"
                                                // Use local state if user is typing, otherwise fallback to database value
                                                value={notes[item.id] !== undefined ? notes[item.id] : (item.notes || '')}
                                                onChange={(e) => handleNoteChange(item.id, e.target.value)}
                                            />
                                            <button
                                                onClick={() => saveNote(item.id)}
                                                // Disable if user hasn't typed changes to avoid spamming the server
                                                disabled={notes[item.id] === undefined || notes[item.id] === item.notes}
                                                className="w-full py-1 bg-indigo-600 text-white text-xs font-bold uppercase rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                            >
                                                Save Insight
                                            </button>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end">
                                            <button
                                                onClick={() => {
                                                    if (confirm('Remove this album from your story?')) {
                                                        router.delete(`/story-items/${item.id}`, { preserveScroll: true });
                                                    }
                                                }}
                                                className="text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-widest"
                                            >
                                                Delete Entry
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
                            <p className="text-gray-500 text-lg mb-4">Your story is empty.</p>
                            <Link 
                                href={route('dashboard')} 
                                className="text-indigo-600 font-bold hover:underline"
                            >
                                Start searching for music to add!
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}