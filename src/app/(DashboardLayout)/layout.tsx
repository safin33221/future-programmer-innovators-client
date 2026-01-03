import DashboardNavbar from "@/components/modules/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/dashboard/DashboardSidebar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">

            <DashboardSidebar />
            {/* Main Content Area */}
            <div className="flex flex-1 flex-col">

                <DashboardNavbar />
                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};
