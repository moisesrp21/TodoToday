import React from 'react';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';
import Alert from '../components/Alert';
import { StoreContext, contexttype } from '../App';

const Main = () => {
    const store = React.useContext<contexttype>(StoreContext);
    let empty = 'h-[100%] md:h-[90%]';
    return (
        <div className="flex justify-center w-full h-full">
            <div
                className={`flex flex-col w-[99%] md:w-[85%] max-w-[1200px] ${empty} text-white rounded-[20px]`}
            >
                {store.getUser() ? <TodoList /> : <Alert />}
                <Footer />
            </div>
        </div>
    );
};

export default Main;
