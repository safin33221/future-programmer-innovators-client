/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

const DialogUserSearch = ({ onResults }: { onResults: (u: any[]) => void }) => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!debouncedQuery) {
                onResults([]);
                return;
            }

            setLoading(true);
            const res = await fetch(
                `/api/users?searchTerm=${debouncedQuery}&limit=20`
            );
            const data = await res.json();
            onResults(data.data || []);
            setLoading(false);
        };

        fetchUsers();
    }, [debouncedQuery, onResults]);

    return (
        <div className="flex gap-2">
            <Input
                placeholder="Search user..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button disabled={loading}>
                <Search className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default DialogUserSearch;
