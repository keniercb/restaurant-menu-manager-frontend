import {z} from "zod";

export const restaurantSchema = z.object({
    id: z.number().optional(),
    name: z.string()
        .min(5, 'El nombre debe tener al menos 5 caracteres')
        .max(100, 'El nombre no debe exceder los 100 caracteres'),
    email: z.email({message: "Correo electronico inválido"}),
    phone: z.string().regex(/^\+?[\d\s-]{8,}$/, "Formato de teléfono inválido"),
    address: z.string().min(5, 'La direccion debe contener al menos 5 caracteres'),
    cuisine: z.string("El tipo de cocina es obligatorio"),
    currency: z.number().optional(),
});


export type RestaurantFormData = z.infer<typeof restaurantSchema>;
