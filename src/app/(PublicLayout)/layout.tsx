import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};
