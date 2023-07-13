import './MiniHeader.css';
import { ReactComponent as Logo } from '../../images/icons/logo.svg';
import { NavLink } from 'react-router-dom';

interface MiniHeaderProps {
  hello: string;
}

export default function MiniHeader({ hello }: MiniHeaderProps) {
  return (
    <header  className="mini-head">
      <NavLink to='/'>
        <Logo className="mini-head__logo" />
      </NavLink>
      <h1 className="mini-head__topic">{hello}</h1>
    </header >
  );
}
