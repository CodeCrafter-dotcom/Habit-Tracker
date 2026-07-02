import type { JSX } from "react/jsx-runtime";
import { useContextData } from "../../Context/Context";
import Button from "../ui/Button/Button";

import styles from './Profile.module.scss'

interface ProfileProps {
    onClose: () => void;
}

const Profile = (props: ProfileProps): JSX.Element => {

    const { onClose } = props

    const { card } = useContextData()

    const totalHabits = card.length
    const completedToday = card.filter(item => item.isCompleted).length

    const bestStreak = card.length > 0 ? Math.max(...card.map(item => item.streak)) : 0

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <Button className="close" type="button" onClick={onClose}>×</Button>

                <div>
                    <h1>My profile</h1>
                </div>

                <div className={styles.statistics}>
                    <h2>Statistics</h2>
                    
                    <div className={styles.statisticsText}>
                        <p>📋 Total habits in the list: <strong>{totalHabits}</strong></p>
                        <p>✅ Completed today: <strong>{completedToday}</strong></p>
                        <p>🏆 Мy best streak record: <strong>{bestStreak}</strong></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile