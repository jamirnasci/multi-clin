import { useEffect, useState } from "react";
import { IPaciente } from "../types/IPaciente";

export async function usePaciente() {
    const [pacientes, setPacientes] = useState<Partial<IPaciente>[]>([]);
    const [loading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadPacientes = async () => {
            try {
                setIsLoading(true);
                const result = await fetch('/api/pacientes');
                const obj = await result.json();
                setPacientes(obj);
                setIsLoading(false);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error("Erro ao carregar pacientes"));
                }
                setIsLoading(false);
            }
        }
        loadPacientes();
    }, []);
    return { pacientes, loading, error , setPacientes};
}