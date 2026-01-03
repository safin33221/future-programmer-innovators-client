import DashboardNavbar from "@/components/modules/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 h-full overflow-y-auto border-r max-md:hidden">
                <DashboardSidebar />
            </aside>

            {/* Main Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Navbar */}
                <div className="shrink-0">
                    <DashboardNavbar />
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 mt-16">
                    {children}
                </main>
            </div>
        </div>
    );
}

