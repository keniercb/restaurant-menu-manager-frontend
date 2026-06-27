import {z} from "zod";

export const menuItemSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(5, 'El nombre debe tener al menos 5 caracteres')
        .max(100, "El nombre no puede exceder los 100 caracteres"),
    description: z.string().max(255, "La descripción no puede exceder los 255 caracteres"),
    price: z.number().min(0.1, "El precio es obligatorio"),
    category: z.string("El tipo de plato es obligatorio"),
    order: z.number().min(1, "El orden debe ser mayor que cero").optional(),
    isAvailable: z.boolean().optional(),
});
export type MenuItemsFormData = z.infer<typeof menuItemSchema>;

export interface MenuItemResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    restaurant: string;
    category: string;
    displayOrder: number;
}

export interface MenuItemFilter {
    page: number | null;
    size: number | null;
    orderBy: string | null;
    orderDirection: string | null;
    restaurantId: number | null;
    categoryId: number | null;
    name: string | null;
    minPrice: number | null;
    maxPrice: number | null;
}