import type { JSX } from 'react/jsx-runtime'
import type React from 'react'
import { memo, forwardRef } from 'react'

import styles from './Input.module.scss'

interface InputSearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'label' | 'labelClass'> {
    className?: string
    id: string
    label: string
    labelClass?: string
}

const resolveClass = (className: string | undefined): string => {
    if (!className) return ''
        
    return className.split(' ').map(cls => (styles && cls in styles ? styles[cls] : cls)).join(' ')
}

const Input = forwardRef<HTMLInputElement, InputSearchProps>((props: InputSearchProps, ref): JSX.Element => {

    const {id, className, labelClass, label, ...rest } = props

    return (
        <div className={styles.field}>
            <label 
            htmlFor={id}
            className={`${styles.label || ''} ${resolveClass(labelClass)}`.trim()}
            >
                {label}
            </label>

            <input
            id={id}
            ref={ref}
            className={`${styles.input || ''} ${resolveClass(className)}`.trim()}
            {...rest}
            />
        </div>
    )
})

export default memo(Input)