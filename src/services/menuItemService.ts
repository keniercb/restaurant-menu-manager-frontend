import {PaginatedResponse} from "@/types";
import {MenuItemFilter, MenuItemResponse, MenuItemsFormData} from "@/types/menuItems.ts";
import {api} from "@/lib/apiService.ts";


const REQUEST_MAP = "menu-item";

export const menuItemService = {
    getMenuItems: async (params: MenuItemFilter): Promise<PaginatedResponse<MenuItemResponse>> => {
        const response = await api.get(REQUEST_MAP, {
            params: params,
        });
        return response.data;
    },
    createMenuItem: async (data: MenuItemsFormData): Promise<void> => {
        await api.post(REQUEST_MAP, {
            name: data.name,
            description: data.description,
            price: data.price,
            isAvailable: data.isAvailable,
            restaurantId: data.restaurantId,
            categoryId: data.category,
            displayOrder: data.order,
        });
    },
    deleteMenuItem: async (id: number): Promise<void> => {
        await api.delete(REQUEST_MAP + `/${id}`);
    }
}
