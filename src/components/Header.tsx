import React from 'react';
import { contexttype, StoreContext } from '../App';
import { BsCheck2Circle } from 'react-icons/bs';
import '@fontsource/harmattan';
import { todotype } from '../services/requests';
import { AiOutlineUser } from 'react-icons/ai';
import { motion } from 'framer-motion';
interface Props {
    todos: todotype[];
    completed: number;
}
const Header = ({ todos, completed }: Props) => {
    const store = React.useContext<contexttype>(StoreContext);
    let isLoggedIn = store.getUser() !== null;
    const logout = () => {
        store.setUser(null);
        localStorage.setItem('token', '');
        localStorage.setItem('user', '');
        store.getNav()?.('/login');
    };
    return (
        <div className="flex flex-row items-center h-fit min-h-[50px] justify-around rounded-[15px] bg-[#1f1f1f] font-['Harmattan'] text-[1.4rem]">
            <div
                className={`flex items-center px-[10px] gap-[5px] rounded-[20px] h-[50%] bg-[#3f4553] ${
                    isLoggedIn ? 'opacity-1' : 'opacity-0'
                }
                `}
            >
                <BsCheck2Circle />
                <p className="align-middle pt-[3px] text-center text text-[1.2rem] md:text-[1.3rem] font-['Harmattan']">
                    {`${completed}/${todos.length}`}
                </p>
            </div>
            <div
                className={`
                    flex items-center px-[10px] h-[50%] border-b-[1px]  text-[1.1rem] border-[#5c657b]
                    ${isLoggedIn ? 'opacity-1' : 'opacity-0'}
                    `}
            >
                <AiOutlineUser className="text-[1.1rem] mb-[4px]" />
                <p
                    className={
                        'flex flex-row align-middle text-center mx-[5px] text text-[1.2rem] text-[#ededed] md:text-[1.5rem] font-["Harmattan"]'
                    }
                >
                    {store.getUser()?.username}
                </p>
            </div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`
                flex items-center px-[10px] rounded-[20px] h-[50%] text-[1.2rem] mt-[3px] ${
                    isLoggedIn ? 'bg-[#9f0e0d]' : 'bg-[#72bc44]'
                }
                `}
                onClick={logout}
            >
                {isLoggedIn ? 'Log out' : 'Log in'}
            </motion.button>
        </div>
    );
};

export default Header;
