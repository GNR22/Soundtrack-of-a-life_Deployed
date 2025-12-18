import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function History({ auth, history, artistName }) {
    if (!history) {
        return (
            <AuthenticatedLayout user={auth.user}>
                 <div className="py-12 text-center text-gray-500">
                    No historical data found for {artistName}.
                 </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Career History: {history.name}</h2>}
        >
            <Head title={`${history.name} - History`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Navigation */}
                    <div className="mb-6">
                         <Link href={route('artist.show', { artist: artistName })} className="text-indigo-600 hover:underline">
                            ← Back to Artist Profile
                        </Link>
                    </div>

                    {/* Metadata Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 mb-8 border-l-4 border-indigo-500">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">Type</p>
                                <p className="font-bold text-lg">{history.type}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">Origin</p>
                                <p className="font-bold text-lg">{history.country}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">Active Since</p>
                                <p className="font-bold text-lg">{history.life_span.begin}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest">Status</p>
                                <p className="font-bold text-lg">{history.life_span.end}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            {history.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">#{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Discography Timeline</h3>
                    <div className="relative border-l-2 border-indigo-200 ml-4 space-y-8">
                        {history.releases.map((release) => (
                            <div key={release.id} className="relative pl-8">
                                {/* Dot on the timeline */}
                                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow"></div>
                                
                                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                                                {release.year}
                                            </span>
                                            <h4 className="text-lg font-bold mt-1">{release.title}</h4>
                                            <p className="text-sm text-gray-500">{release.type} • Released: {release.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}