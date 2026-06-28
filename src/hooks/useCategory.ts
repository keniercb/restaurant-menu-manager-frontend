import {MenuCategoryResponse} from "@/types/menuCategory.ts";
import {useEffect, useState} from "react";
import {menuCategoryService} from "@/services/menuCategoryService.ts";

interface UseCategoryReturn {
    categories: MenuCategoryResponse[];
    fetchCategories: () => Promise<void>;
    loading: boolean;
    error: string | null;
    setReloadCategories(reload: boolean): void;
}

export const useCategory = (): UseCategoryReturn => {
    const [categories, setCategories] = useState<MenuCategoryResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);
    const [reloadCategories, setReloadCategories] = useState<boolean>(false);
    const fetchCategories = async () => {
        const data = await menuCategoryService.fetchMenuCategories();
        setCategories(data.data)
    }

    useEffect(() => {
        if (reloadCategories) {
            fetchCategories();
        }
    }, [reloadCategories])
    return {
        categories,
        loading,
        error,
        fetchCategories,
        setReloadCategories
    }
}