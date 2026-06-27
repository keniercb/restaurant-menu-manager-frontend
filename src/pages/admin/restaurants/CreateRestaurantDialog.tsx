import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Controller, useForm} from "react-hook-form";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Loader2} from "lucide-react";
import {useCuisine} from "@/hooks/useCuisine.ts";
import {useRestaurant} from "@/hooks/useRestaurant.ts";
import {RestaurantFormData, restaurantSchema} from "@/lib/schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";

export function CreateRestaurantDialog({editRestaurant, open, onOpenChange}) {
    const {cuisines} = useCuisine();
    const {
        restaurants,
        loading,
        error,
        fetchRestaurants,
        createRestaurant,
    } = useRestaurant();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors, isSubmitting},
    } = useForm<RestaurantFormData>({
        resolver: zodResolver(restaurantSchema),
        defaultValues: {
            name: "",
            address: "",
            phone: "",
            email: "",
            cuisine: ""
        }
    });
    const onSubmit = async (data: RestaurantFormData) => {

        if (editRestaurant) {
            console.log(data);
        } else {
            await createRestaurant(data);

        }
        onOpenChange(false);
        reset();
        await fetchRestaurants();
    }
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-125">
                    <DialogHeader>
                        <DialogTitle>{editRestaurant ? "Modificar restaurante" : "Nuevo restaurante"}</DialogTitle>
                    </DialogHeader>
                    <form className="space-y-4 py-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre*</Label>
                            <Input id="name" placeholder="La Casa del Tamal" {...register("name")}/>
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Dirección*</Label>
                            <Input id="address"
                                   placeholder="Calle Real #415 e/ Tabena y Rey" {...register("address")}/>
                            {errors.address && (
                                <p className="text-sm text-red-500">{errors.address.message}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <Label htmlFor="phone" className="py-2">Tipo de Cocina</Label>
                                <Controller
                                    name="cuisine"
                                    control={control}
                                    render={({field}) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="cuisineType">
                                                <SelectValue placeholder="Selecciona un tipo de cocina"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {cuisines.map((type) => (
                                                        <SelectItem key={type.id} value={type.id.toString()}>
                                                            {type.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.cuisine && (
                                    <p className="text-sm text-red-500">{errors.cuisine.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <Label htmlFor="phone">Teléfono</Label>
                                <Input
                                    id="phone"
                                    placeholder="+53 5555-1234"
                                    {...register("phone")}
                                />
                                {errors.phone && (
                                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="user@gmail.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin"/>}
                                {editRestaurant ? "Guardar cambios" : "Crear restaurante"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}