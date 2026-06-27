import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, UtensilsCrossed, ShoppingCart, TrendingUp } from "lucide-react";

const stats = [
    { title: "Restaurantes", value: "12", icon: Store, trend: "+2 este mes" },
    { title: "Platos", value: "86", icon: UtensilsCrossed, trend: "+15 este mes" },
    { title: "Pedidos hoy", value: "24", icon: ShoppingCart, trend: "+8 vs ayer" },
    { title: "Ingresos", value: "$1,240", icon: TrendingUp, trend: "+12% vs ayer" },
];

export function Dashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Resumen general de tu negocio
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">{stat.trend}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}