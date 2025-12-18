import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';


export default function Dashboard({ auth, featured = [] }) {
    
    const { data, setData, get } = useForm({
        artist: '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (data.artist.trim()) {
            get(route('artist.show', { artist: data.artist }));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Music Explorer</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* TOP SECTION: SEARCH & LINKS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Search Section */}
                        <div className="bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4 text-gray-800">Find an Artist</h3>
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={data.artist}
                                    onChange={e => setData('artist', e.target.value)}
                                    placeholder="Search e.g. Ariana Grande"
                                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition font-bold"
                                >
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Navigation Section */}
                        <div className="bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Links</h3>
                            <div className="flex gap-3">
                                <Link 
                                    href={route('story.index')} 
                                    className="flex-1 text-center px-4 py-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg font-semibold text-indigo-700 transition border border-indigo-100"
                                >
                                    📖 My Music Story
                                </Link>
                                
                                <Link 
                                    href={route('profile.edit')} 
                                    className="flex-1 text-center px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg font-semibold text-gray-700 transition border border-gray-200"
                                >
                                    👤 Settings
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* NEW SECTION: FEATURED ARTISTS GRID */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-8">
                        <h3 className="text-xl font-bold mb-6 text-gray-800">🔥 Trending Artists</h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {featured.map((artist) => (
                                <Link 
                                    key={artist.id}
                                    href={route('artist.show', { artist: artist.name })}
                                    className="group block text-center"
                                >
                                    <div className="relative overflow-hidden rounded-full aspect-square mb-4 mx-auto w-32 h-32 md:w-40 md:h-40 shadow-md">
                                        <img 
                                            src={artist.images?.[0]?.url || 'https://via.placeholder.com/300'} 
                                            alt={artist.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                        />
                                    </div>
                                    <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition">
                                        {artist.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                                        {Number(artist.followers?.total || 0).toLocaleString()} Fans
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}