import {createContext } from 'react';

interface PopupContextType {
  isPopupOpened: boolean;
  setPopupOpened: (x: boolean) => void;
}

interface AuthorizedContextType {
  isAuthorized: boolean;
  setAuthorized: (x: boolean) => void;
}

export const PopupContext = createContext<PopupContextType>({} as PopupContextType);
export const AuthorizedContext = createContext<AuthorizedContextType>({} as AuthorizedContextType);
