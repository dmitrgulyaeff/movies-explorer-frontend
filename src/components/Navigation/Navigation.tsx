import './Navigation.css';
import { PopupContext, AuthorizedContext } from '../../Contexts';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

interface NavigationProps {}

export default function Navigation(props: NavigationProps) {
  const {isPopupOpened, setPopupOpened } = useContext(PopupContext);
  const {isAuthorized } = useContext(AuthorizedContext);
  
  const { pathname } = useLocation();

  const rootStylesClass = classNames('aside__nav-link', {'aside__nav-link_active' : pathname === '/'})
  const moviesStylesClass = classNames('aside__nav-link', {'aside__nav-link_active' : pathname === '/movies'})
  const savedMoviesStylesClass = classNames('aside__nav-link', {'aside__nav-link_active' : pathname === '/saved-movies'})


  const signinStylesClass = classNames('aside__nav-link', {'aside__nav-link_active' : pathname === '/signin'})
  const signupStylesClass = classNames('aside__nav-link', {'aside__nav-link_active' : pathname === '/signup'})

  const closeHandler = () => {setPopupOpened(false)}
  return (
    <section className={classNames("popup", {popup_opened: isPopupOpened})} >
      <aside className={classNames("aside", {aside_opened: isPopupOpened})}>
        <nav className="aside__nav">
          <ul className="aside__ul">
            {isAuthorized ? 
            <>
              <li className="aside__li">
                <Link onClick={closeHandler} className={rootStylesClass} to={'/'}>
                  Главная
                </Link>
              </li>
              <li className="aside__li">
                <Link onClick={closeHandler} className={moviesStylesClass} to={'/movies'}>
                  Фильмы
                </Link>
              </li>
              <li className="aside__li">
                <Link onClick={closeHandler} className={savedMoviesStylesClass} to={'/saved-movies'}>
                  Сохранённые фильмы
                </Link>
              </li>
              <li className="aside__li aside__li_to_profile">
                <Link onClick={closeHandler} className="aside__nav-link aside__nav-link_to_profile" to={'/profile'} />
              </li>
            </>: 
            <>
               <li className="aside__li">
                <Link onClick={closeHandler} className={signinStylesClass} to={'/signin'}>
                Войти
                </Link>
              </li>
              <li className="aside__li">
                <Link onClick={closeHandler} className={signupStylesClass} to={'/signup'}>
                Регистрация
                </Link>
              </li>
             
            </>
            }
          </ul>
        </nav>
      </aside>
    </section>
  );
}
