import { Footer } from "@/components/common/Footer";
import NavbarWrapper from "@/components/common/NavbarWrapper";

import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <NavbarWrapper />
            {children}
            <Footer />
        </div>
    );
};
