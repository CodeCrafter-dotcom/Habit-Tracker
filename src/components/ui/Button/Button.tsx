import type React from "react"
import type { JSX } from "react/jsx-runtime"

import styles from './Button.module.scss'

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    className?: string
}

const resolveClass = (className: string | undefined): string => {
    if (!className) return ''

    return className.split(' ').map(cls => (styles && cls in styles ? styles[cls] : cls)).join(' ')
}

const Button = (props: ButtonProps): JSX.Element => {

    const {children, className, ...rest } = props
    
    return (
        <button
        {...rest}
        className={`${styles.button || ''} ${resolveClass(className)}`}
        >
        {children}
        </button>
    )
}

export default Button