import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Controller, useForm} from "react-hook-form";
import {menuItemSchema, MenuItemsFormData} from "@/types/menuItems.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Loader2} from "lucide-react";

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

    const onCreate = async (data: MenuItemsFormData) => {
        console.log(data)
    }

    return <>
        <Dialog open={isModalOpen} onOpenChange={isModalOpen}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>{editMenuItem ? "Modificar plato" : "Nuevo plato"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onCreate)}>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre del plato*</Label>
                        <Input id="name" placeholder="Tamal en cazuela" {...register("name")}/>
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Descripción*</Label>
                        <Textarea id="description"
                                  placeholder="Palto elaborado con harina de maiz tieno, preparado en..." {...register("description")}/>
                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category">Tipo de plato*</Label>
                        <Input id="category"
                               placeholder="Entrante" {...register("category")}/>
                        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="price">Precio*</Label>
                            <Input id="price" type="number" step="0.50"
                                   placeholder="0.00" {...register("price")}/>
                            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Orden</Label>
                            <Input id="price" type="number" step="1"
                                   placeholder="0.00" {...register("order")}/>
                            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Controller name="isAvailable" control={control} render={({field}) => (
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        )}/>
                        <Label>Disponible</Label>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
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