
import NavTab from "../NavTab/NavTab"
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

export default function Main() {
  return (
    <main>
      <NavTab/>
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio/>
    </main>
  )
};