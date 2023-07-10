
import NavTab from "../NavTab/NavTab"
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from "../AboutMe/AboutMe";

export default function Main() {
  return (
    <main className="main">
      <NavTab/>
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  )
};