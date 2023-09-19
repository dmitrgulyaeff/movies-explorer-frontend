import { ReactNode, useContext } from 'react';
import { AuthorizedContext } from '../../Contexts';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export default function ProtectedRoute({ children, AuthRequired }: { children: ReactNode, AuthRequired: boolean }) {
  const { isAuthorized } = useContext(AuthorizedContext);

  if (isAuthorized === AuthRequired) {
    return <>{children}</>;
  } 
  return <NotFoundPage/>
}
