import { useNavigate, useParams, useLocation } from 'react-router';

export const useRouterCustom = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { pathname } = useLocation();

  const navigateToRoute = (routeName) => {
    navigate(routeName);
  };

  return [navigateToRoute, params, pathname];
};
