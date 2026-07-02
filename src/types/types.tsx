export interface Card {
    id: string
    title: string
    isCompleted: boolean
    streak: number
    category: string
    lastCompletedDate: string | null
}