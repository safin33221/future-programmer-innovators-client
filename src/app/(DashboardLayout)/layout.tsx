import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">

            <DashboardSidebar />
            {/* Main Content Area */}
            <div className="flex flex-1 flex-col">

                <h1>dashboard Navbar</h1>
                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};
