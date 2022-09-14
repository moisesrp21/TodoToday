import React from 'react';
import { StoreContext, contexttype } from '../App';
import Footer from '../components/Footer';
import request from '../services/requests';
import { BiUser } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, SetError] = React.useState(['*', '*', '*']);
    const store = React.useContext<contexttype>(StoreContext);
    const login = async () => {
        let error = ['*', '*', '*'];
        let isValid = true;
        if (username.length === 0) {
            isValid = false;
            error[1] = 'must enter username';
        }
        if (password.length === 0) {
            isValid = false;
            error[2] = 'must enter password';
        }
        if (isValid) {
            let data = {
                username: username,
                password: password,
            };
            await request
                .login(data)
                .then((res) => {
                    store.setUser({
                        token: res.data.token,
                        username: username,
                    });
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user', username);
                    store.getNav()?.('/');
                })
                .catch((e) => {
                    error[0] = e.response.data.error;
                });
        }
        SetError(error);
    };
    const signup = () => {
        store.getNav()?.('/signup');
    };
    const warningcss = (n: number) =>
        `text-white text-xs text-center italic w-full mb-[10px] px-[7px] py-[5px] rounded-lg bg-red-500 ${
            error[n].length === 1 ? 'opacity-0' : 'opacity-1'
        }`;
    const warninginputcss = (n: number) =>
        `text-white text-xs italic w-fit ml-auto my-[10px] px-[7px] py-[5px] rounded-lg bg-red-500 ${
            error[n].length === 1 ? 'opacity-0' : 'opacity-1'
        }`;
    const inputdivcss = (n: number) =>
        `flex flex-row items-center shadow appearance-none border-[1px]  rounded-[8px] w-[93%] md:w-full ${
            error[n].length === 1 ? 'border-[#464646]' : 'border-red-500'
        }`;
    const inputfieldcss = `text-[#e2e2e2] bg-transparent leading-tight w-full h-full py-2 px-3 focus:outline-none focus:shadow-outline`;
    const buttoncss = `w-full hover:bg-[#d4d4d4] text-white hover:text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline`;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, type: 'esaeInOut' }}
            className="flex flex-col h-screen w-screen items-center bg-[#282828]"
        >
            <div className="relative flex flex-col w-full max-w-sm h-[60%] min-h-[400px] md:h-[50%] justify-center items-center mt-[80px]">
                <form className="bg-[#212121] w-fit min-w-[330px] h-fit shadow-md rounded-[15px] px-[30px] pt-6 pb-8 mb-4">
                    <p className={warningcss(0)}>{error[0]}</p>
                    <div className={inputdivcss(1)}>
                        <BiUser className="text-[#dee2e3] text-[1.5rem] mx-[8px]" />
                        <input
                            className={inputfieldcss}
                            id="Username"
                            type="text"
                            placeholder={'Username'}
                            value={username}
                            autoFocus
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <p className={warninginputcss(1)}>{error[1]}</p>
                    <div className={inputdivcss(2)}>
                        <RiLockPasswordLine className="text-[#dee2e3] text-[1.5rem] mx-[8px]" />
                        <input
                            className={inputfieldcss}
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <p className={warninginputcss(2)}>{error[2]}</p>
                    <div className="flex flex-col gap-5 items-center justify-between">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex justify-center w-[70%] border-[1px] border-[#d4d4d4]"
                        >
                            <button
                                className={buttoncss}
                                type="button"
                                onClick={login}
                            >
                                Sign In
                            </button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex justify-center w-[70%] border-[1px] border-[#d4d4d4]"
                        >
                            <button
                                className={buttoncss}
                                type="button"
                                onClick={signup}
                            >
                                Sign Up
                            </button>
                        </motion.div>
                    </div>
                </form>
                <Footer />
            </div>
        </motion.div>
    );
};
export default Login;
