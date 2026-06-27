import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Plus, Trash2} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useMenuItems} from "@/hooks/useMenuItem.ts";
import {MenuItemResponse, menuItemSchema, MenuItemsFormData} from "@/types/menuItems.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Badge} from "@/components/ui/badge.tsx";
import {useEffect} from "react";

export function MenuItemsDialog({editRestaurant, open, onOpenChange}) {
    const {
        menuItems,
        menuItemFilter,
        setMenuItemFilter,
        createMenuItems,
        deleteMenuItems,
        loading
    } = useMenuItems();

    const {
        register,
        reset,
        control,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<MenuItemsFormData>({
        resolver: zodResolver(menuItemSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            displayOrder: 1,
            isActive: true,
            category: "",
        }
    });
    const handleCreateMenuItem = () => {
        reset({
            name: "",
            description: "",
            category: "",
            displayOrder: 1,
            price: 0,
            isActive: true,
            restaurantId: editRestaurant?.id
        });
    }

    const handleSubmitMenuItem = async (data: MenuItemsFormData) => {
        await createMenuItems(data);
        const filter = {...menuItemFilter};
        setMenuItemFilter(filter);
    };
    const handleDeleteMenuItem = async (menuItem: MenuItemResponse) => {
        await deleteMenuItems(Number.parseInt(menuItem.id));
        const filter = {...menuItemFilter};
        setMenuItemFilter(filter);
    }

    useEffect(() => {
        if ( editRestaurant?.id) {
            const filter = { ...menuItemFilter };
            filter.restaurantId = Number.parseInt(editRestaurant.id);
            setMenuItemFilter(filter);
        }
    }, [editRestaurant]);
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-250 h-[450px] flex flex-col">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg font-bold tracking-tight">Menú de
                                    platos: {editRestaurant?.name}</p>
                                <p className="text-sm text-gray-500">
                                    Gestiona todos tus platos
                                </p>
                            </div>
                            <Button className="gap-2" onClick={handleCreateMenuItem}>
                                <Plus className="w-4 h-4"/>
                                Nuevo Plato
                            </Button>
                        </div>
                    </DialogHeader>
                    <Card className="h-full">
                        <CardContent >
                            <Table className="table-fixed w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-full uppercase">Plato</TableHead>
                                        <TableHead className="w-25 uppercase">Tipo</TableHead>
                                        <TableHead className="w-25 text-right uppercase">Precio</TableHead>
                                        <TableHead className="w-20 text-right uppercase">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {menuItems.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4}
                                                       className="text-center text-muted-foreground py-8">No
                                                se encontaron platos.</TableCell>
                                        </TableRow>
                                    ) : (
                                        menuItems.map((menuItem) => (
                                            <TableRow>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium"> {menuItem.name}</div>
                                                        <div
                                                            className="text-sm text-muted-foreground line-clamp-1"> {menuItem.description}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{menuItem.category.name}</TableCell>
                                                <TableCell className="text-right"> {menuItem.price}
                                                    <Badge> {editRestaurant?.currency}</Badge></TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-destructive hover:text-destructive"
                                                            onClick={() => handleDeleteMenuItem(menuItem)}
                                                        >
                                                            <Trash2 className="w-4 h-4"></Trash2>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
        </>
    );
}