import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types';

const authContext = createContext();

export function useAuth() {
  const [authed, setAuthed] = useState(false);

  return {
    authed, 
    login() {
        return new Promise((res) => {
            localStorage.setItem("authed", JSON.stringify(true));
            setAuthed(true);
            res();
        });
    },
    signup(userData) {
        return new Promise((res) => {
            localStorage.setItem("authed", JSON.stringify(true));
            localStorage.setItem("user", JSON.stringify(userData));
            setAuthed(true);
            res();
        })
    },
    logout() {
        return new Promise((res) => {
          localStorage.setItem("authed", JSON.stringify(false));
        //   localStorage.setItem("user", JSON.stringify({}));
          setAuthed(false);
          res();
        });
    }
  }
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export function AuthProvider({children}) {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export default function AuthConsumer() {
    return useContext(authContext);
} 