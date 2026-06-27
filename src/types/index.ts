export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    perPage: number;
    results: number;
    totalResults: number;
    totalPages: number;
}

export interface Cuisine {
    id: number;
    name: string;
    description: string;
}

export interface Restaurant {
    id: string;
    name: string;
    address: string;
    email: string;
    phone: string;
    currency: string;
    cuisine: string;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    restaurant: string;
    category: string;
}

export interface Category {
    id: string;
    restaurantId: string;
    name: string;
    description?: string;
}

export interface Dish {
    id: string;
    restaurantId: string;
    categoryId: string;
    name: string;
    description: string;
    price: number;
    image: string;
    isAvailable: boolean;
}

export interface CartItem {
    dish: Dish;
    quantity: number;
}