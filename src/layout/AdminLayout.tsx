import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    LayoutDashboard,
    Store,
    UtensilsCrossed,
    Tags,
    ShoppingCart
} from "lucide-react";

const navItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/restaurants", label: "Restaurantes", icon: Store },
    { path: "/admin/categories", label: "Categorías", icon: Tags },
    { path: "/admin/dishes", label: "Platos", icon: UtensilsCrossed },
    { path: "/admin/orders", label: "Pedidos", icon: ShoppingCart },
];

export function AdminLayout() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-card p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h1 className="font-bold text-xl">Admin Panel</h1>
                </div>

                <nav className="space-y-1 flex-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link key={item.path} to={item.path}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className="w-full justify-start gap-2"
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                <Separator className="my-4" />
                <Link to="/">
                    <Button variant="outline" className="w-full">
                        Ver Marketplace
                    </Button>
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}