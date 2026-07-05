import {Cuisine} from "@/types";
import {useCallback, useEffect, useState} from "react";
import {cuisineService} from "@/services/cuisineService.ts";

interface UseCuisineReturn {
    cuisines: Cuisine[];
    loading: boolean;
    error: string | null;
    fetchCuisines: () => Promise<void>;
    setLoadCuisines: (load: boolean) => void;
}

export function useCuisine(): UseCuisineReturn {
    const [cuisines, setCuisines] = useState<Cuisine[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadCuisines, setLoadCuisines] = useState(false);
    const fetchCuisines = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await cuisineService.getCuisineTypeList();
            setCuisines(response.data);
        } catch {
            setError("Ocurrió un error al cargar los tipos de cocinas");
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        if (loadCuisines)
            fetchCuisines()
    }, [loadCuisines]);

    return {
        cuisines,
        loading,
        error,
        fetchCuisines,
        setLoadCuisines
    }
}