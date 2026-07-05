import {api} from "@/lib/apiService.ts";
import {RestaurantFormData} from "@/lib/schemas.ts";
import {PaginatedResponse, Restaurant} from "@/types";

const REQUEST_MAP = "restaurant";
export const restaurantService = {
    getRestaurants: async (): Promise<PaginatedResponse<Restaurant>> => {
        const response = await api.get(REQUEST_MAP, {
            params: {
                page: 1,
                perPage: 10,
            }
        });
        return response.data;
    }
    ,
    postRestaurant: async (data: RestaurantFormData) => {
        await api.post(REQUEST_MAP, {
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            cuisineId: data.cuisine,
            currencyId: 1
        });
    },
    deleteRestaurant: async (data: Restaurant) => {
        await api.delete(`${REQUEST_MAP}/${data.id}`, {})
    }
}