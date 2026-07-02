import type { JSX } from "react/jsx-runtime"
import Input from '../ui/Input/Input'
import Button from "../ui/Button/Button"
import { memo, type FormEvent, useState, useRef } from "react"
import { useContextActions, useContextData } from "../../Context/Context"

import styles from './AddFormCard.module.scss'

const AddFormCard = (): JSX.Element => {
    const { setAddInputTitleValue, setAddInputCategoryValue, addCard } = useContextActions()
    const { addInputTitleValue, addInputCategoryValue } = useContextData()

    const [isTitleError, setIsTitleError] = useState(false)
    const [isCategoryError, setIsCategoryError] = useState(false)

    const inputTitleRef = useRef<HTMLInputElement>(null)
    const inputCategoryRef = useRef<HTMLInputElement>(null)

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        const isTitleEmpty = addInputTitleValue.trim().length === 0
        const isCategoryEmpty = addInputCategoryValue.trim().length === 0
        
        if (isTitleEmpty || isCategoryEmpty) {
            if (isTitleEmpty) {
                setIsTitleError(true)
                inputTitleRef.current?.focus()
                setTimeout(() => setIsTitleError(false), 400)
            }
            if (isCategoryEmpty) {
                setIsCategoryError(true)

                if (!isTitleEmpty) {
                    inputCategoryRef.current?.focus()
                }
                
                setTimeout(() => setIsCategoryError(false), 400)
            }
            return
        }

        addCard(addInputTitleValue, addInputCategoryValue)
        setIsTitleError(false)
        setAddInputTitleValue('')
        setAddInputCategoryValue('')
        inputTitleRef.current?.focus()
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.div}>
                <Input
                    type="text"
                    id="id-2"
                    className={isTitleError ? 'error' : ''}
                    placeholder={isTitleError ? 'habit' : " "}
                    label="habit"
                    onChange={(e) => setAddInputTitleValue(e.target.value)}
                    value={addInputTitleValue} 
                    ref={inputTitleRef}
                    autoComplete="off"
                />

                <Input
                    type="text"
                    id="id-3"
                    className={isCategoryError ? 'error' : ''}
                    placeholder={isCategoryError ? 'category' : " "}
                    label="category"
                    onChange={(e) => setAddInputCategoryValue(e.target.value)}
                    value={addInputCategoryValue} 
                    ref={inputCategoryRef}
                    autoComplete="off"
                />
            </div>

            <Button className='addCard' type="submit">
                create a habit
            </Button>
        </form>
    )
}

export default memo(AddFormCard)
