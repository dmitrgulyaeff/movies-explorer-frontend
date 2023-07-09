import './App.css'
import { PopupContext, AuthorizedContext } from '../../Contexts'
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import { useState } from 'react'

export default function App() {
  const [isPopupOpened, setPopupOpened] = useState(false); 
  const [isAuthorized, setAuthorized] = useState(false); 
  return (
    <PopupContext.Provider value={{isPopupOpened, setPopupOpened}}>
      <AuthorizedContext.Provider value={{isAuthorized, setAuthorized}}>
        <Navigation />
        <Header />
      </AuthorizedContext.Provider>
    </PopupContext.Provider>
  )
};
