import { useState, useContext } from 'react';
import { PopupContext } from '../../Contexts';
import './Burger.css';

import classNames from 'classnames';



export default function Burger() {
  const {isPopupOpened: isActive, setPopupOpened: setActive} = useContext(PopupContext);

  const burgerStylesClass = classNames('burger__menu', {burger__menu_active: isActive});
  const firstStylesClass = classNames('burger__slice burger__slice_pos_first', {burger__slice_pos_first_active: isActive});
  const secondStylesClass = classNames('burger__slice burger__slice_pos_second', {burger__slice_pos_second_active: isActive});
  const thirdStylesClass = classNames('burger__slice burger__slice_pos_third', {burger__slice_pos_third_active: isActive});
  const crossStylesClass = classNames('burger__slice burger__slice_pos_cross', {burger__slice_pos_cross_active: isActive});

  const burgerHandler = () => {
    setActive(!isActive);
  }

  return (
      <button className={'burger'} onClick={burgerHandler}>
        <div className={burgerStylesClass}>
          <div className={firstStylesClass}></div>
          <div className={secondStylesClass}>
            <div className={crossStylesClass}></div>
          </div>
          <div className={thirdStylesClass}></div>
        </div>
      </button>
  );
}
