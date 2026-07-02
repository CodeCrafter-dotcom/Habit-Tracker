import type { JSX } from 'react/jsx-runtime'
import Button from '../../ui/Button/Button'
import RouterLink from '../../RouterLink/RouterLink'
import Input from '../../ui/Input/Input'
import { useContextSearch } from '../../../Context/Context'
import { memo } from 'react'

import styles from './Header.module.scss'

interface HeaderProps {
    onProfileClick: () => void
}

const HeaderSearchInput = memo((): JSX.Element => {
    const { searchInputValue, setSearchInputValue } = useContextSearch()

    return (
        <Input
            id='id-1'
            type='search'
            placeholder='Search...'
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            label='search'
            labelClass='visually-hidden'
        />
    )
})


const Header = (props: HeaderProps): JSX.Element => {

    const { onProfileClick  } = props
    
    return (
        <header className={styles.header}>
            <RouterLink to='/'>Habit Tracker</RouterLink>

            <HeaderSearchInput/>

            <Button
            className='profile'
            type='button'
            onClick={onProfileClick}
            >profile</Button>
        </header>
    )
}

export default memo(Header)