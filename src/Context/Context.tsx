import 
React, 
{ 
createContext, 
useCallback, 
useContext, 
useEffect, 
useMemo, 
useState, 
type JSX,
type Dispatch,
type SetStateAction,
} from "react"

import type { Card } from "../types/types"


interface ContextDataType {
    addInputTitleValue: string
    addInputCategoryValue: string
    card: Card[]
    category: string
    status : string
    filteredCards: Card[]
    streak: StreakData
}

interface ContextActionsType {
    addCard: (title: string, category: string) => void
    deleteCard: (id: string) => void
    deleteAll: () => void
    toggleIsCompleted: (id: string) => void
    
    setAddInputTitleValue: Dispatch<SetStateAction<string>>
    setAddInputCategoryValue: Dispatch<SetStateAction<string>>
    setCategory: Dispatch<SetStateAction<string>>
    setStatus: Dispatch<SetStateAction<string>>
}

interface ContextSearchType {
    setSearchInputValue: Dispatch<SetStateAction<string>>
    searchInputValue: string
}


interface StreakData {
    count: number
    lastCompletedDate: string | null
}

interface ContextProviderProps {
    children: React.ReactNode
}

const ContextData = createContext<ContextDataType | null>(null)
const ContextActions = createContext<ContextActionsType | null>(null)
const ContextSearch = createContext<ContextSearchType | null>(null)

export const ContextProvider = (props: ContextProviderProps): JSX.Element => {
    const { children } = props

    const keyCard = 'card'
    const keyStreak = 'streak'

    const [addInputTitleValue, setAddInputTitleValue] = useState('')

    const [addInputCategoryValue, setAddInputCategoryValue] = useState('')

    const [searchInputValue, setSearchInputValue] = useState('')

    const [category, setCategory] = useState('')

    const [status , setStatus ] = useState('')

    const [card, setCard] = useState<Card[]>(() => {
        try {
            const saved: string | null = localStorage.getItem(keyCard)
            if(saved) return JSON.parse(saved)
        } catch (error) {
            console.log(error)
        }
        return []
    })

    const [streak, setStreak] = useState<StreakData>(() => {
        try {
            const saved = localStorage.getItem(keyStreak)
            return saved ? JSON.parse(saved) : { count: 0, lastCompletedDate: null }
        } catch (error) {
            console.log(error)
        }
    })

    const getTodayString = (): string => {
        const today = new Date()
        return today.toISOString().split('T')[0]
    }

    const getYesterdayString = (): string => {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        return yesterday.toISOString().split('T')[0]
    }

    useEffect(() => {
        const today = getTodayString()
        const yesterday = getYesterdayString()
    
        setCard(prevCards => {
            let hasChanges = false
    
            const updatedCards = prevCards.map(item => {
                const lastDate = item.lastCompletedDate
                if (item.streak > 0 && lastDate && lastDate !== today && lastDate !== yesterday) {
                    hasChanges = true
                    return { 
                        ...item, 
                        streak: 0, 
                        lastCompletedDate: null,
                        isCompleted: false 
                    }
                }
                if (item.isCompleted && lastDate !== today) {
                    hasChanges = true
                    return { ...item, isCompleted: false }
                }
                return item
            })
    
            return hasChanges ? updatedCards : prevCards
        })
    }, [])

    const addCard = useCallback((title: string, category: string) => {
        setCard(prev => {
            const newCard: Card = {
                id: crypto.randomUUID(),
                title: title,
                isCompleted: false,
                streak: 0,
                category: category,
                lastCompletedDate: null
            }
            return [...prev, newCard]
        })
    }, [])

    useEffect(() => {
        localStorage.setItem(keyCard, JSON.stringify(card))
    }, [card])

    const deleteCard = useCallback((id: string) => {
        setCard(prev => prev.filter(card => card.id !== id))
    }, [])

    const deleteAll = useCallback(() => {
        if(card.length === 0) return
        const Confirm = confirm('Do you really want to delete all habits?')
        if(Confirm) setCard([])
    }, [card])

    const filteredCards = useMemo(() => {
        const activeCategory: string = category.trim().toLowerCase()
        const activeStatus: string = status.trim().toLowerCase()
        const searchValue: string = searchInputValue.trim().toLowerCase()
    
        return card.filter(item => {
            const matchesCategory = !activeCategory || activeCategory === 'all' || 
                item.category?.trim().toLowerCase() === activeCategory
    
            const matchesStatus = !activeStatus || activeStatus === 'all' ||
                (activeStatus === 'completed' && item.isCompleted) || 
                (activeStatus === 'incomplete' && !item.isCompleted)
    
            const matchesSearch = searchValue.length === 0 || 
                item.title.toLowerCase().includes(searchValue)
    
            return matchesCategory && matchesStatus && matchesSearch
        })
    }, [card, category, status, searchInputValue])
    
    const toggleIsCompleted = useCallback((id: string) => {
        const today = getTodayString()
        const yesterday = getYesterdayString()
    
        setCard(prevCards => prevCards.map(item => {
            if (item.id !== id) return item
            const nextIsCompleted = !item.isCompleted
            if (nextIsCompleted) {
                const lastDate = item.lastCompletedDate
                if (lastDate === today) {
                    return { ...item, isCompleted: nextIsCompleted }
                }
                const newStreak = lastDate === yesterday ? item.streak + 1 : 1
                return {
                    ...item,
                    isCompleted: nextIsCompleted,
                    streak: newStreak,
                    lastCompletedDate: today 
                }
            } 
            return {
                ...item,
                isCompleted: nextIsCompleted
            }
        }))
    }, [])

    const ContextDataValue = useMemo(() => ({
        card,
        addInputTitleValue,
        addInputCategoryValue,
        category,
        filteredCards,
        status,
        streak
    }), [card, addInputTitleValue, filteredCards, addInputCategoryValue, category, status, streak])

    const ContextSearchValue = useMemo(() => ({
        setSearchInputValue,
        searchInputValue
    }), [searchInputValue])

    const ContextActionsValue = useMemo(() => ({
        setAddInputTitleValue,
        setAddInputCategoryValue,
        setCategory,
        addCard,
        deleteCard,
        deleteAll,
        toggleIsCompleted,
        setStatus,
    }), [ 
        addCard, 
        deleteAll, 
        deleteCard, 
        setAddInputCategoryValue, 
        setAddInputTitleValue, 
        setCategory, 
        toggleIsCompleted, 
        setStatus])

    return (
        <ContextData.Provider value={ContextDataValue}>
            <ContextSearch.Provider value={ContextSearchValue}>
                <ContextActions.Provider value={ContextActionsValue}>
                    {children}
                </ContextActions.Provider>
            </ContextSearch.Provider>
        </ContextData.Provider>
    )
}


export const useContextData = (): ContextDataType => {
    const context = useContext(ContextData)
    if (!context) throw new Error("useContextData must be used within a ContextProvider")
    return context
}

export const useContextActions = (): ContextActionsType => {
    const context = useContext(ContextActions)
    if (!context) throw new Error("useContextActions must be used within a ContextProvider")
    return context
}

export const useContextSearch = (): ContextSearchType => {
    const context = useContext(ContextSearch)
    if (!context) throw new Error("useContextSearch must be used within a ContextProvider")
    return context
}