"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GuestFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    // 🔑 Automatically inject role=ADMIN
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (!params.get("role")) {
            params.set("role", "ADMIN");
            router.replace(`?${params.toString()}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
            {/* Search - Takes priority space */}
            <div className="flex-1 min-w-0">
                <SearchFilter
                    paramName="searchTerm"
                    placeholder="Search admins..."

                />
            </div>

            {/* Additional filters - Collapsible on mobile */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="hidden md:flex items-center gap-2">
                    <SearchFilter
                        paramName="email"
                        placeholder="Email"

                    />
                    <SearchFilter
                        paramName="contactNumber"
                        placeholder="Contact"

                    />

                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 ml-auto">
                    <RefreshButton />
                    <ClearFiltersButton preserveParams={["role"]} />
                </div>
            </div>
        </div>
    );
};

export default GuestFilter;