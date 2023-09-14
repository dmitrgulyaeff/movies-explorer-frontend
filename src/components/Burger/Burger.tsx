import { useContext } from 'react';
import { PopupContext } from '../../Contexts';
import './Burger.css';

import classNames from 'classnames';



export default function Burger() {
  const {isPopupOpened: isActive, setPopupOpened: setActive} = useContext(PopupContext);

  const firstStylesClass = classNames('burger__slice burger__slice_pos_first', {burger__slice_pos_first_active: isActive});
  const secondStylesClass = classNames('burger__slice burger__slice_pos_second', {burger__slice_pos_second_active: isActive});
  const thirdStylesClass = classNames('burger__slice burger__slice_pos_third', {burger__slice_pos_third_active: isActive});

  const crossStylesClass = classNames('burger__sub-slice burger__sub-slice_pos_cross', { 'burger__sub-slice_pos_cross_active': isActive});

  const burgerHandler = () => {
    setActive(!isActive);
  }

  return (
      <button className={classNames('burger', {'burger_active' : isActive})} onClick={burgerHandler}>
          <span className={firstStylesClass} />
          <span className={secondStylesClass}>
            <span className={crossStylesClass} />
          </span>
          <span className={thirdStylesClass} />
      </button>
  );
}
