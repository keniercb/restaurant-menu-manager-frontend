import {useState} from "react";
import {Restaurant} from "@/types";
import {Button} from "@/components/ui/button.tsx";
import {Plus, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {MenuItemsDialog} from "@/pages/admin/restaurants/MenuItemsDialog.tsx";
import {CreateRestaurantDialog} from "@/pages/admin/restaurants/CreateRestaurantDialog.tsx";
import {RestaurantsTable} from "@/pages/admin/restaurants/RestaurantsTable.tsx";

export function RestaurantsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editRestaurant, setEditRestaurant] = useState<Restaurant | null>(null);
    const [filter, setFilter] = useState("");


    const [isMenuItemOpen, setIsMenuItemOpen] = useState(false);

    const handleCreate = () => {
        setEditRestaurant(null);
        setIsModalOpen(true);
    };
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Restaurantes</h2>
                    <p className="text-sm text-gray-500">
                        Gestiona la informacion de todos tus restaurantes
                    </p>
                </div>
                <Button className="gap-2" onClick={handleCreate}>
                    <Plus className="w-4 h-4"/>
                    Nuevo restaurant
                </Button>
            </div>
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                <Input
                    className="pl-10"
                    placeholder="Buscar restaurante"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <RestaurantsTable
                setEditRestaurant={setEditRestaurant}
                setIsMenuItemOpen={setIsMenuItemOpen}
            />
            <CreateRestaurantDialog
                editRestaurant={editRestaurant}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
            <MenuItemsDialog
                open={isMenuItemOpen}
                onOpenChange={setIsMenuItemOpen}
                editRestaurant={editRestaurant}
            />
        </div>
    );
}
