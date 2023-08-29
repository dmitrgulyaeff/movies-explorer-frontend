import './App.css';
import {
  PopupContext,
  AuthorizedContext,
  MoviesContext,
  CurrentUserContext,
  PathnameContext,
  TokenContext,
} from '../../Contexts';
import { Movie, MovieBd, User } from '../../utils/types';
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
import Profile from '../Profile/Profile';

export default function App() {
  const { pathname, hash } = useLocation();

  const [isPopupOpened, setPopupOpened] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthorized, setAuthorized] = useState<boolean>(false);
  const [yaMovies, setYaMovies] = useState<Movie[]>([]);
  const [savedMovies, setSavedMovies] = useState<MovieBd[]>([]);
  const [currentUser, setCurrentUser] = useState<User>({'_id': '', 'email': '', 'name': ''});

  const resetStates = () => {
    setPopupOpened(false);
    setToken(localStorage.getItem('token'));
    setAuthorized(false);
    setYaMovies([]);
    setSavedMovies([]);
    setCurrentUser({'_id': '', 'email': '', 'name': ''});
  }

  async function checkAuthorization(token: string) {
    await localStorage.setItem('token', token);
    // одним запросом два зайца, проверяю токен + получаю инфу о пользователе
    const response = await mainApi.getUser();
    if (response.ok) {
      setAuthorized(true);
      const responseData = await response.json() as User;
      setCurrentUser(responseData);
    } else {
      setAuthorized(false);
    }
  }

  useEffect(() => {
    if (token) {
      checkAuthorization(token);
    } else {
      setAuthorized(false);
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ setToken }}>
      <PopupContext.Provider value={{ isPopupOpened, setPopupOpened }}>
        <AuthorizedContext.Provider value={{ isAuthorized, setAuthorized }}>
          <MoviesContext.Provider
            value={{ yaMovies, setYaMovies, savedMovies, setSavedMovies }}
          >
            <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
              <PathnameContext.Provider value={{ pathname, hash }}>
                <Navigation />
                <Header />
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/saved-movies" element={<Movies />} />
                  <Route path="/signup" element={<Register />} />
                  <Route path="/signin" element={<Login />} />
                  <Route path="/profile" element={<Profile  resetStates={resetStates} />} />
                </Routes>
                <Footer />
              </PathnameContext.Provider>
            </CurrentUserContext.Provider>
          </MoviesContext.Provider>
        </AuthorizedContext.Provider>
      </PopupContext.Provider>
    </TokenContext.Provider>
  );
}
