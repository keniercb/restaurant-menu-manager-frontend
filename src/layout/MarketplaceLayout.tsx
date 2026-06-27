import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Store } from "lucide-react";

export function MarketplaceLayout() {
    return (
        <div className="min-h-screen bg-background">
            {/* Navbar */}
            <header className="border-b bg-card sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    <Link to="/" className="flex items-center gap-2">
                        <Store className="w-6 h-6 text-primary" />
                        <span className="font-bold text-xl">FoodMarket</span>
                    </Link>

                    <div className="flex-1 max-w-md relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar restaurantes o platos..."
                            className="pl-10"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Link to="/admin">
                            <Button variant="ghost" size="sm">
                                Admin
                            </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="gap-2">
                            <ShoppingCart className="w-4 h-4" />
                            <span className="hidden sm:inline">Carrito</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}