import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import PropTypes from 'prop-types';

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

function RequireAuth({ children }) {
  const { authed } = useAuth();
  const localAuthParsed = JSON.parse(localStorage.getItem("authed"));
  const isUserAuthed = authed || localAuthParsed;
  const location = useLocation();

  return isUserAuthed === true ? children : <Navigate to="/sign-in" replace state={{path: location.pathname}} />;
}


export default RequireAuth