import {useCallback, useEffect, useState} from "react";
import {Restaurant} from "@/types";
import {restaurantService} from "@/services/restaurantService.ts";
import {RestaurantFormData} from "@/lib/schemas.ts";

interface UseRestaurantReturn {
    restaurants: Restaurant[];
    loading: boolean;
    loadRestaurants:boolean;
    error: string | null;
    fetchRestaurants: () => Promise<void>;
    setLoadRestaurants: (load: boolean) => void;
    createRestaurant: (data: RestaurantFormData) => Promise<void>;
}

export function useRestaurant(): UseRestaurantReturn {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadRestaurants, setLoadRestaurants] = useState(false);
    const [error, setError] = useState("");

    const fetchRestaurants = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const data = await restaurantService.getRestaurants();
            setRestaurants(data.data);
        } catch {
            setError("Ha ocurrido un error al cargar los restaurantes.");
        } finally {
            setLoading(false);
        }
    }, []);

    const createRestaurant = async (data: RestaurantFormData) => {
        setLoading(true);
        try {
            await restaurantService.postRestaurant(data)
        } catch {
            setError("Ha ocurrido un error al crear el restaurante.");
        }
    }

    useEffect(() => {
        if (loadRestaurants) {
            fetchRestaurants();
        }
    }, [loadRestaurants]);
    return {
        loading,
        error,
        restaurants,
        fetchRestaurants,
        createRestaurant,
        setLoadRestaurants
    }
}