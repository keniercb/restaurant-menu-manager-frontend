import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Controller, useForm} from "react-hook-form";
import {menuItemSchema, MenuItemsFormData} from "@/types/menuItems.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Loader2} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useMenuItems} from "@/hooks/useMenuItem.ts";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useCategory} from "@/hooks/useCategory.ts";
import {useEffect} from "react";

export function CreateMenuItemDialog({isModalOpen, setIsModalOpen, editRestaurant, editMenuItem}) {
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
            category: "",
            order: 1,
            isAvailable: true
        }
    });
    const {
        createMenuItems,
    } = useMenuItems();
    const {
        setReloadCategories,
        categories
    } = useCategory();

    const onCreate = async (data: MenuItemsFormData) => {
        console.log(data)
        reset({
            name: "",
            description: "",
            price: 0,
            category: "",
            order: 1,
            isAvailable: true
        })
        data.restaurantId = editRestaurant.id;
        await createMenuItems(data);
        setIsModalOpen(false);
    }
    useEffect(() => {
        if (isModalOpen)
            setReloadCategories(true)
    }, [isModalOpen]);
    return <>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-125"
                           onInteractOutside={(e) => e.stopPropagation()}
                           onEscapeKeyDown={(e) => e.stopPropagation()}
            >
                <DialogHeader>
                    <DialogTitle>{editMenuItem ? "Modificar plato" : "Nuevo plato"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onCreate)}>
                    <div className="grid gap-2 pb-2">
                        <Label htmlFor="name">Nombre del plato*</Label>
                        <Input id="name" placeholder="Tamal en cazuela" {...register("name")}/>
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="grid gap-2 pb-2">
                        <Label htmlFor="description">Descripción*</Label>
                        <Textarea id="description"
                                  placeholder="Palto elaborado con harina de maiz tieno, preparado en..." {...register("description")}/>
                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                    </div>
                    <div className="grid gap-2 pb-2">
                        <Label htmlFor="category">Tipo de plato*</Label>
                        <Controller
                            name="category"
                            control={control}
                            render={({field}) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Selecciona un tipo de plato"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {categories.map((type) => (
                                                <SelectItem key={type.id} value={type.id.toString()}>
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Precio*</Label>
                            <Input id="price" type="number" step="0.50"
                                   placeholder="0.00" {...register("price", {valueAsNumber: true})}/>
                            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="order">Orden</Label>
                            <Input id="order" type="number" step="1"
                                   placeholder="1" {...register("order", {valueAsNumber: true})}/>
                            {errors.order && <p className="text-sm text-red-500">{errors.order.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 py-4">
                        <Controller
                            name="isAvailable"
                            control={control}
                            render={({field: {value, onChange}}) => (
                                <Checkbox
                                    id="isAvailable"
                                    checked={value ?? false}
                                    onCheckedChange={(checked) => {
                                        console.log(checked)
                                        onChange(checked)
                                    }}
                                />
                            )}
                        />
                        <Label htmlFor="isAvailable">Disponible</Label>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(false)
                            }}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>}
                            {editRestaurant ? "Guardar cambios" : "Crear plato"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>;
}