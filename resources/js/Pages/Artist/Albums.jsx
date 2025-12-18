import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';

export default function Albums({ auth, albums, artist }) {
    const albumList = albums?.albums?.items || [];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Albums by {artist}</h2>}
        >
            <Head title={`Albums - ${artist}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Navigation Row */}
                    <div className="mb-8">
                        <Link
                            href={route('dashboard')}
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 transition ease-in-out duration-150"
                        >
                            🔍 Search Another Artist
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {albumList.length > 0 ? (
                            albumList.map((album) => (
                                <div key={album.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                                    <img 
                                        src={album.images?.[0]?.url || 'https://via.placeholder.com/300'} 
                                        alt={album.name} 
                                        className="w-full aspect-square object-cover rounded shadow-sm mb-4"
                                    />
                                    <h3 className="font-bold text-gray-900 truncate" title={album.name}>
                                        {album.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {album.release_date?.split('-')[0]}
                                    </p>
                                    
                                    <Link
    href={route('artist.album', { artist: artist, album: album.id })}
    className="..."
>
    View Details
</Link>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
                                <p className="text-gray-500">No albums found for this artist.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}