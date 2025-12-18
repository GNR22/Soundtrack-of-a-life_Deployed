import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, artist }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{artist.name}</h2>}
        >
            <Head title={artist.name} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8 text-center">
                        
                        {/* Navigation Row */}
                        <div className="mb-6 flex justify-start">
                            <Link
                                href={route('dashboard')}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center"
                            >
                                ← Back to Dashboard (Search Another)
                            </Link>
                        </div>

                        {/* Artist Image */}
                        {artist.image ? (
                            <img 
                                src={artist.image} 
                                alt={artist.name} 
                                className="w-64 h-64 mx-auto rounded-full object-cover shadow-lg mb-6 border-4 border-gray-100"
                            />
                        ) : (
                            <div className="w-64 h-64 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-6 shadow-inner">
                                <span className="text-gray-400">No Image Available</span>
                            </div>
                        )}

                        <h1 className="text-5xl font-black text-gray-900 mb-2">{artist.name}</h1>
                        
                        <div className="flex justify-center gap-8 mb-8 text-gray-600 font-medium">
                            <div>
                                <p className="text-2xl text-indigo-600">{Number(artist.listeners || 0).toLocaleString()}</p>
                                <p className="text-sm uppercase tracking-widest">Followers</p>
                            </div>
                            {artist.playcount > 0 && (
                                <div>
                                    <p className="text-2xl text-indigo-600">{Number(artist.playcount).toLocaleString()}</p>
                                    <p className="text-sm uppercase tracking-widest">Playcount</p>
                                </div>
                            )}
                        </div>

                        <div className="border-t pt-8">
                            <Link
                                href={`/artist/${encodeURIComponent(artist.name)}/albums`}
                                className="inline-flex items-center px-6 py-3 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 transition duration-150 ease-in-out"
                            >
                                💿 View Albums
                            </Link>

                            {/* --- HISTORY BUTTON --- */}
<Link
    href={route('artist.history', { artist: artist.name })}
    className="inline-flex items-center px-6 py-3 bg-white border-2 border-indigo-600 rounded-md font-semibold text-indigo-600 hover:bg-indigo-50 transition duration-150 ease-in-out"
>
    📜 View Career History
</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}