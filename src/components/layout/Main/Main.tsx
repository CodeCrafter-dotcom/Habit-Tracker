import type { JSX } from "react/jsx-runtime";
import HabitFilters from "../../HabitFilters/HabitFilters";
import AddFormCard from "../../AddFormCard/AddFormCard";
import CardContainer from "../../CardContainer/CardContainer";

import styles from './Main.module.scss'
import { memo } from "react";

const Main = (): JSX.Element => {
    
    return (
        <main>
            <section className={styles.section}>
                <AddFormCard/>
                <CardContainer/>
            </section>

            <section className={styles.section}>
                <HabitFilters
                id1="category"
                id2="filtration"
                />
            </section>
        </main>
    )
}

export default memo(Main)