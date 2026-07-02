import type { JSX } from "react/jsx-runtime";
import { memo, useMemo } from "react";
import Button from "../ui/Button/Button";
import { useContextActions, useContextData, useContextSearch } from "../../Context/Context";

import styles from './HabitFilters.module.scss'

interface HabitFiltersProps {
    id1: string
    id2: string
}

const HabitFilters = (props: HabitFiltersProps): JSX.Element => {

    const { 
        id1,
        id2,
     } = props

     const { deleteAll, setCategory, setStatus } = useContextActions()
     const { card, category, status } = useContextData()
     const { setSearchInputValue } = useContextSearch()

    const uniqueCategories: string[] = useMemo(() => {
        return Array.from(new Set(card.map(item => item.category)))
    }, [card])

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nextStatus = e.target.value;
        
        setStatus(nextStatus)
        setSearchInputValue('')
    }

    const clearAllSelect = () => {
        if(category === 'all' && status === 'all') return
        setStatus('all')
        setCategory('all')
    }

    return (
        <div className={styles.div}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <label htmlFor={id1}>category:</label>

                    <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className={styles.select} 
                    name={id1} id={id1}>
                        <option value="all">all</option>
                        {uniqueCategories.map(category => (
                            <option value={category} key={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.section}>
                    <label htmlFor={id2}>filtration:</label>

                    <select
                    value={status}
                    onChange={handleStatusChange}
                    className={styles.select} 
                    name={id2} id={id2}>
                        <option value="all">all</option>
                        <option value="completed">completed</option>
                        <option value="incomplete">incomplete</option>
                    </select>
                </div>

                <Button
                    type="button"
                    className="clear"
                    onClick={clearAllSelect}
                    >
                    clear all selects
                </Button>

            </div>
                <Button
                type='button'
                className='deleteAll'
                onClick={() => deleteAll()}
                >
                delete All
                </Button>
        </div>
        
    )
}

export default memo(HabitFilters) 