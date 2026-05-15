import { useEffect, useState } from "react";
import { IColaborador } from "../types/IColaborador";

export function useColaboradores() {
    const [colaboradores, setColaboradores] = useState<IColaborador[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const loadColaboradores = async () => {
            try {
                const result = await fetch('/api/colaboradores')
                const obj = await result.json()
                setColaboradores(obj)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err)
                } else {
                    setError(new Error('Falha ao carregar colaboradores'))
                }
            } finally{
                setLoading(false)
            }
        }
        loadColaboradores()
    }, [])
    return{colaboradores, loading, error}
}