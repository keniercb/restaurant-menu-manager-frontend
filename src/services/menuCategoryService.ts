import {PaginatedResponse} from "@/types";
import {MenuCategoryResponse} from "@/types/menuCategory.ts";
import {api} from "@/lib/apiService.ts";

const REQUEST_MAP = "/menu-category";

export const menuCategoryService = {
    fetchMenuCategories: async (): Promise<PaginatedResponse<MenuCategoryResponse>> => {
        const response = await api.get(REQUEST_MAP);
        return response.data;
    }
}