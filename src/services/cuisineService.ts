import {api} from "@/lib/apiService.ts";
import {Cuisine, PaginatedResponse} from "@/types";

const REQUEST_MAP = "cuisine-type";
export const cuisineService = {
    getCuisineTypeList: async (): Promise<PaginatedResponse<Cuisine>> => {
        const response = await api.get(REQUEST_MAP, {
            params: {
                page: 1,
                perPage: 30,
            },
        });
        return response.data;
    }
}