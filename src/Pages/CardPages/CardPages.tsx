import type { JSX } from "react"
import { useContextData } from "../../Context/Context"
import Button from "../../components/ui/Button/Button"

import styles from './CardPages.module.scss'

interface CardPagesProps {
    params?: {
        id: string
    }
}

const TaskPage = (props: CardPagesProps): JSX.Element => {
    const { params } = props
    const { card } = useContextData()
    
    const idFromUrl = params?.id
    const currentCard = card.find(item => item.id === idFromUrl)

    const handleBack = () => {
        window.history.back()
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.taskCard}>
                <Button className='backButton' onClick={handleBack}>
                    ← Back
                </Button>

                <h1>Task Details</h1>
                
                {currentCard ? (
                    <div>
                        <div className={styles.taskTitle}>{currentCard.title}</div>
                        <div className={styles.taskInfoGroup}>               
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Category</span>
                                <span className={styles.badgeCategory}>{currentCard.category || 'General'}</span>
                            </div>                
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Streak</span>
                                <span className={styles.streakCount}>🔥 {currentCard.streak || 0}</span>
                            </div>                
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Status</span>
                                <span className={currentCard.isCompleted ? styles.statusCompleted : styles.statusPending}>
                                    {currentCard.isCompleted ? "Completed" : "In Progress"}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p style={{ color: '#64748b', textAlign: 'center' }}>Task not found</p>
                )}
            </div>
        </div>
    )
}

export default TaskPage
