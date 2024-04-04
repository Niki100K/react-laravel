import React, { createContext, useEffect, useRef, useState } from 'react'

export const AppContext = createContext()
export const AppProvider = ({ children }) => {
    let renderLimit = useRef(true)
    const API = 'http://127.0.0.1:8000'
    const [gamesData, setGamesData] = useState([])
    const [userCart, setUserCart] = useState([])

    const handleFetchGames = async () => {
        try {
            const response = await fetch(`${API}/api/games`);
            const data = await response.json();
            setGamesData(data || [])
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (renderLimit.current) {
            handleFetchGames()
            renderLimit.current = false
        }
    }, [])

    return (
        <AppContext.Provider value={{API, gamesData, setGamesData, userCart, setUserCart}}>
            {children}
        </AppContext.Provider>
    )
}