import './App.css';
import { PopupContext, AuthorizedContext, MoviesContext, CurrentUserContext, PathnameContext } from '../../Contexts';
import { Movie } from '../../utils/types';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import Register from '../Register/Register';
import Login from '../Login/Login';

export default function App() {
  const { pathname, hash } = useLocation();

  const [isPopupOpened, setPopupOpened] = useState(false);
  const [isAuthorized, setAuthorized] = useState<boolean>();
  const [yaMovies, setYaMovies] = useState<Movie[]>();
  const [savedMovies, setSavedMovies] = useState<Movie[]>();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    async function checkAuthorization () {
      if (!isAuthorized) { 
        // одним запросом два зайца, проверяю токен + получаю инфу о пользователе
        const response = await mainApi.getUser();
        if (response.ok) {
          setAuthorized(true);
          const responseData = await response.json();
          setCurrentUser({user: responseData})
        } else {
          setAuthorized(false);
        }
      }
    }
    checkAuthorization()
  }, [isAuthorized])


  return (
    <PopupContext.Provider value={{ isPopupOpened, setPopupOpened }}>
      <AuthorizedContext.Provider value={{ isAuthorized, setAuthorized }}>
        <MoviesContext.Provider value={{yaMovies, setYaMovies, savedMovies, setSavedMovies}}>
          <CurrentUserContext.Provider value={currentUser}>
            <PathnameContext.Provider value={{pathname, hash}}>
            <Navigation />
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/saved-movies" element={<Movies />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/signin" element={<Login />} />
            </Routes>
            <Footer />
            </PathnameContext.Provider>
          </CurrentUserContext.Provider>
        </MoviesContext.Provider>
      </AuthorizedContext.Provider>
    </PopupContext.Provider>
  );
}
