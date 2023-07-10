import './App.css'
import { PopupContext, AuthorizedContext } from '../../Contexts'
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'
import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'

export default function App() {
  const [isPopupOpened, setPopupOpened] = useState(false); 
  const [isAuthorized, setAuthorized] = useState(false); 
  return (
    <PopupContext.Provider value={{isPopupOpened, setPopupOpened}}>
      <AuthorizedContext.Provider value={{isAuthorized, setAuthorized}}>
        <Navigation />
        <Header />
        <Routes>
          <Route path='/' element={<Main/>}/>
        </Routes>
        <Footer />
      </AuthorizedContext.Provider>
    </PopupContext.Provider>
  )
};
