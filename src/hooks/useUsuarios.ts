import { useEffect, useState } from "react";
import { IUsuario } from "../types/IUsuario";

export function useUsuarios() {
    const [usuarios, setUsuarios] = useState<IUsuario[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const loadUsuarios = async () => {
            try {
                const result = await fetch('/api/adm/usuarios')
                const obj = await result.json()
                setUsuarios(obj)
            } catch (error) {
                if(error instanceof Error){
                    setError(error)
                }else{
                    setError(new Error('Falha ao buscar usuarios'))
                }
            } finally{
                setLoading(false)
            }
        }
        loadUsuarios()
    }, [])
    return {usuarios, loading, error}
}