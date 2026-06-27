import {MenuItemFilter, MenuItemResponse, MenuItemsFormData} from "@/types/menuItems.ts";

import {useCallback, useEffect, useState} from "react";
import {menuItemService} from "@/services/menuItemService.ts";

interface UseMenuItemReturn {
    menuItems: MenuItemResponse[];
    loading: boolean;
    error: string | null;
    menuItemFilter: MenuItemFilter;
    setMenuItemFilter: (filter: MenuItemFilter) => void;
    fetchMenuItems: (filter: MenuItemFilter) => Promise<void>;
    createMenuItems: (data: MenuItemsFormData) => Promise<void>;
    deleteMenuItems: (id: number) => Promise<void>;
}

export function useMenuItems(): UseMenuItemReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [menuItems, setMenuItems] = useState<MenuItemResponse[]>([]);
    const [menuItemFilter, setMenuItemFilter] = useState<MenuItemFilter>({
        categoryId: null,
        maxPrice: null,
        minPrice: null,
        name: null,
        orderBy: null,
        orderDirection: null,
        page: 1,
        size: 10,
        restaurantId: null
    });
    const fetchMenuItems = useCallback(async (menuItemFilter: MenuItemFilter) => {
        setLoading(true);
        setError(null);
        try {
            const response = await menuItemService.getMenuItems(menuItemFilter);
            setMenuItems(response.data);
        } catch {
            setError("Occurrió un error al cargar los platos");
        } finally {
            setLoading(false);
        }
    }, []);

    const createMenuItems = async (params: MenuItemsFormData) => {
        setLoading(true);
        setError(null);
        try {
            await menuItemService.createMenuItem(params);
        } catch {
            setError("Occurrió un error al guardar el plato")
        } finally {
            setLoading(false);
        }
    }

    const deleteMenuItems = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await menuItemService.deleteMenuItem(id);
        } catch {
            setError("Occurrió un error al eliminar el plato")
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchMenuItems(menuItemFilter)
    }, [menuItemFilter]);

    return {
        menuItems,
        loading,
        error,
        menuItemFilter,
        setMenuItemFilter,
        fetchMenuItems,
        createMenuItems,
        deleteMenuItems
    }
}