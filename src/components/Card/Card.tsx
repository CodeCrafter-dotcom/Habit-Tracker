import type { JSX } from "react/jsx-runtime";
import Button from "../ui/Button/Button";
import { memo } from "react";
import type { Card } from "../../types/types";
import { useContextActions, useContextSearch } from "../../Context/Context";
import RouterLink from "../RouterLink/RouterLink";
import HighlightText from "../HighlightText";

import styles from './Card.module.scss'

interface CardProps {
    card: Card
}

const Card = (props: CardProps): JSX.Element => {
    const { card } = props

    const { deleteCard, toggleIsCompleted } = useContextActions()
    const { searchInputValue } = useContextSearch()

    return (
        <li className={`${styles.card} ${card.isCompleted ? styles.completed : ''}`}>
            <div className={styles.checkboxWrapper}>
                <input 
                    className={styles.checkbox} 
                    type="checkbox" 
                    name='isCompleted' 
                    id={card.id} 
                    checked={card.isCompleted}
                    onChange={() => toggleIsCompleted(card.id)}
                />
                <label htmlFor={card.id} className="visually-hidden">
                    {card.title}
                </label>
            </div>

            <div className={styles.contentBody}>
                <div className={styles.titleRow}>
                    <HighlightText search={searchInputValue}>
                        <RouterLink to={`/card/${card.id}`}className={`${styles.title} ${card.isCompleted ? styles.completedTitle : ''}`}>
                            {card.title}
                        </RouterLink>   
                    </HighlightText>
                </div>

                <div className={styles.metaRow}>
                    <span className={styles.badgeCategory}>
                        {card.category}
                    </span>
                    <span className={styles.streakInfo}>
                    🔥 Streak: <strong>{card.streak}</strong> {card.streak === 1 ? 'день' : card.streak > 1 && card.streak < 5 ? 'дня' : 'дней'}
                    </span>
                </div>
            </div>
            
            <Button
                type="button"
                className='delete'
                onClick={() => deleteCard(card.id)}
                aria-label="Удалить привычку"
            >
                ×    
            </Button>
        </li>
    )
}

export default memo(Card)
