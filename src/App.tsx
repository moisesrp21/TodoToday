import React from 'react';
//import pages
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Routes, Route, NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { usertype } from './services/requests';

export type contexttype = {
    getUser: () => usertype | null;
    setUser: (u: usertype) => void;
    getNav: () => NavigateFunction | null;
};
export let StoreContext: React.Context<contexttype>;
function App() {
    const [user, setUser] = React.useState<usertype>(null);
    const navigate = useNavigate();
    const store: contexttype = {
        getUser: () => {
            return user;
        },
        setUser: (u: usertype) => {
            setUser(u);
        },
        getNav: () => {
            return navigate;
        },
    };
    React.useEffect(() => {
        let username = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        if (
            username !== '' &&
            username !== null &&
            token !== '' &&
            token !== null
        ) {
            setUser({
                username: username,
                token: token,
            });
        }
    }, []);
    StoreContext = React.createContext<contexttype>(store);
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
}

export default App;
