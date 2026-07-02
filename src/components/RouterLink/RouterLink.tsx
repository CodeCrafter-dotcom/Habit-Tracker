import {type ReactNode, type MouseEvent, type JSX, type AnchorHTMLAttributes, memo,  } from 'react'

import styles from './RouterLink.module.scss'


interface RouterLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
    to: string
    children: ReactNode
    className?: string
}

const resolveClass = (className: string | undefined): string => {
    if (!className) return ''

    return className.split(' ').map(cls => (styles && cls in styles ? styles[cls] : cls)).join(' ')
}

const RouterLink = (props: RouterLinkProps): JSX.Element => {
    const {
        to,
        children,
        className,
        ...rest
    } = props
    

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (event.metaKey || event.ctrlKey) return
        event.preventDefault()
        window.history.pushState({}, '', to)
        window.dispatchEvent(new PopStateEvent('popstate'))
    }

    return (
        <a href={to} onClick={handleClick} className={`${styles.link || ''} ${resolveClass(className)}`} {...rest}>
            {children}
        </a>
    )
}

export default memo(RouterLink)