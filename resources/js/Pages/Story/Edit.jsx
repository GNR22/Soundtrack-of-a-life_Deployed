import React from "react";
import { useForm } from "@inertiajs/react";

export default function Edit({ item }) {
    const { data, setData, patch, processing } = useForm({
        notes: item.notes ?? "",
        rating: item.rating ?? 3,
        favorite: item.favorite ?? false,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(`/story-items/${item.id}`);
    };

    return (
        <div className="p-8 max-w-xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-4">Edit Album</h1>

            <form onSubmit={submit} className="space-y-4">
                <textarea
                    className="w-full p-3 rounded text-black"
                    placeholder="Your thoughts..."
                    value={data.notes}
                    onChange={e => setData("notes", e.target.value)}
                />

                <select
                    className="w-full p-2 rounded text-black"
                    value={data.rating}
                    onChange={e => setData("rating", e.target.value)}
                >
                    {[1,2,3,4,5].map(n => (
                        <option key={n} value={n}>{n} ⭐</option>
                    ))}
                </select>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={data.favorite}
                        onChange={e => setData("favorite", e.target.checked)}
                    />
                    Favorite
                </label>

                <button
                    disabled={processing}
                    className="btn-neon"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
