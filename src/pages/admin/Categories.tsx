import {useState} from "react";
import {Category, Restaurant} from "@/types";
import {Button} from "@/components/ui/button.tsx";
import {Plus, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";

export function Categories() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [filter, setFilter] = useState("");
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Categorías</h2>
                    <p className="text-sm text-gray-500 text-muted-foreground">
                        Gestiona tus tipos de platos
                    </p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4"/>
                    Nueva categoría
                </Button>
            </div>
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                <Input
                    className="pl-10"
                    placeholder="Buscar categoría"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <Card>
                <CardHeader></CardHeader>
                <CardContent></CardContent>
            </Card>
        </div>
    );
}