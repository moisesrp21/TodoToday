import React from 'react';
import TodoList from '../components/TodoList';
import { StoreContext, contexttype } from '../App';
import Login from './Login';

const Main = () => {
    const store = React.useContext<contexttype>(StoreContext);
    return <>{store.getUser() ? <TodoList /> : <Login />}</>;
};

export default Main;
