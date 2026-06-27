import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, Plus, Trash2, UtensilsCrossed} from "lucide-react";
import {useRestaurant} from "@/hooks/useRestaurant.ts";
import {Restaurant} from "@/types";
import {useEffect} from "react";

export function RestaurantsTable({setEditRestaurant, setIsMenuItemOpen, isModalDialogOpen}) {
    const {
        restaurants,
        loading,
        error,
        fetchRestaurants,
        createRestaurant,
    } = useRestaurant();

    const handleEdit = async (restaurant: Restaurant) => {
        setEditRestaurant(restaurant);
        setIsMenuItemOpen(true);
    }
    const handleDelete = (restaurant: Restaurant) => {
    }
    useEffect(() => {
        fetchRestaurants();
    }, [isModalDialogOpen]);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Restaurantes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="uppercase">Restaurant</TableHead>
                                <TableHead className="uppercase">Especialidad</TableHead>
                                <TableHead className="uppercase">Dirección</TableHead>
                                <TableHead className="uppercase">Teléfono</TableHead>
                                <TableHead className="uppercase">Email</TableHead>
                                <TableHead className="uppercase">Moneda de cobro</TableHead>
                                <TableHead className="text-right uppercase">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {restaurants?.length == 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                        No se encontraron restaurantes
                                    </TableCell>
                                </TableRow>
                            ) : (
                                restaurants.map((restaurant) => (<TableRow>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium"> {restaurant.name}</div>
                                            <div
                                                className="text-sm text-muted-foreground line-clamp-1"> {restaurant.address}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{restaurant.cuisine.name}</TableCell>
                                    <TableCell>{restaurant.address}</TableCell>
                                    <TableCell>{restaurant.phone}</TableCell>
                                    <TableCell>{restaurant.email}</TableCell>
                                    <TableCell>{restaurant.currency}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(restaurant)}
                                            >
                                                <UtensilsCrossed className="w-4 h-4"></UtensilsCrossed>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(restaurant)}
                                            >
                                                <Trash2 className="w-4 h-4"></Trash2>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>))

                            )}

                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}