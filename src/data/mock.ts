import { Restaurant, Category, Dish } from "@/types";

export const mockRestaurants: Restaurant[] = [
    {
        id: "1",
        name: "La Casa de la Pasta",
        description: "Auténtica cocina italiana con ingredientes frescos",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
        address: "Calle Principal 123",
        phone: "+53 5555-1234",
        rating: 4.8,
        categories: [],
    },
    {
        id: "2",
        name: "Sakura Sushi Bar",
        description: "El mejor sushi de la ciudad",
        image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800",
        address: "Avenida del Mar 456",
        phone: "+53 5555-5678",
        rating: 4.9,
        categories: [],
    },
];

export const mockCategories: Category[] = [
    { id: "c1", restaurantId: "1", name: "Entradas", description: "Para empezar" },
    { id: "c2", restaurantId: "1", name: "Pastas", description: "Hechas a mano" },
    { id: "c3", restaurantId: "2", name: "Rollos", description: "Sushi fresco" },
];

export const mockDishes: Dish[] = [
    {
        id: "d1",
        restaurantId: "1",
        categoryId: "c1",
        name: "Bruschetta",
        description: "Pan tostado con tomate, albahaca y aceite de oliva",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1572695157369-0f5e0f7f6b8f?w=400",
        isAvailable: true,
    },
    {
        id: "d2",
        restaurantId: "1",
        categoryId: "c2",
        name: "Fettuccine Alfredo",
        description: "Pasta con salsa cremosa de queso parmesano",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1551183053-bf91b1dca034?w=400",
        isAvailable: true,
    },
    {
        id: "d3",
        restaurantId: "2",
        categoryId: "c3",
        name: "California Roll",
        description: "Cangrejo, aguacate y pepino",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
        isAvailable: true,
    },
];