import type { JSX } from "react/jsx-runtime";
import { useContextData, useContextSearch } from "../../Context/Context";
import Card from "../Card/Card";

import styles from './CardContainer.module.scss'

const CardContainer = (): JSX.Element => {
    const { filteredCards, card, status } = useContextData() 
    const { searchInputValue } = useContextSearch()

    const filteredCardsLength = filteredCards.length === 0

    return (
        <ul className={`${styles.div} ${filteredCardsLength ? styles.center : ''}`}>
            
            {card.length === 0 && (
                <p>Your habit list is empty 😴</p>
            )}

            {searchInputValue.length > 0 && filteredCardsLength && (
                 <p>No habits found matching your criteria 🔍</p>
            )}

            {filteredCardsLength && status === 'completed' && (
                <p>No completed habits</p>
            )}

            {filteredCardsLength && status === 'incomplete' && (
                <p>No incomplete habits</p>
            )}

            {filteredCards.length > 0 && (
                filteredCards.map((habit) => (
                    <Card key={habit.id} card={habit} />
                ))
            )}
        </ul>
    )
}

export default CardContainer
