import { useNavigate, useParams, useLocation } from 'react-router-dom';

export function withRouter(Component) {
  function Wrapper(props) {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    return <Component {...props} router={{ navigate, params, location }} />;
  }

  return Wrapper;
}
