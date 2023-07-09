import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavTab from "../NavTab/NavTab"
import AboutProject from '../AboutProject/AboutProject';

export default function Main() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash){
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <main className="main">
      <NavTab/>
      <AboutProject />
    </main>
  )
};