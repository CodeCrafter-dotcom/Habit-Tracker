import type { JSX } from "react/jsx-runtime";
import { useState } from "react"
import Header from "../components/layout/Header/Header"
import Main from "../components/layout/Main/Main"
import Profile from "../components/Profile/Profile"


const CardsPages = (): JSX.Element => {

    const [isProfileOpen, setIsProfileOpen] = useState(false)

    return (
        <>
            <Header onProfileClick={() => setIsProfileOpen(true)}/>
            <Main/>
            {isProfileOpen && <Profile onClose={() => setIsProfileOpen(false)}/>}
        </>
  )
}
export default CardsPages