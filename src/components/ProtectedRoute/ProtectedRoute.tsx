import { ReactNode, useContext } from 'react';
import { AuthorizedContext } from '../../Contexts';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthorized } = useContext(AuthorizedContext);

  if (isAuthorized) {
    return <>{children}</>;
  } 
  return <NotFoundPage/>
}
