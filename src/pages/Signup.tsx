import React from 'react';
import Footer from '../components/Footer';
import { StoreContext, contexttype } from '../App';
import request from '../services/requests';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BiUser } from 'react-icons/bi';

const Signup = () => {
    const [username, setUsername] = React.useState('');
    const [password1, setPassword1] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [error, setError] = React.useState(['*', '*', '*', '*']);
    const store = React.useContext<contexttype>(StoreContext);
    const login = () => {
        store.getNav()?.('/login');
    };
    const create = async () => {
        let error = ['*', '*', '*', '*'];
        let isValid = true;
        if (username.length === 0) {
            error[0] = 'enter username';
            isValid = false;
        }
        if (password1.length === 0) {
            error[1] = 'enter password';
            isValid = false;
        }
        if (password2 !== password1) {
            error[2] = 'wrong confirmation';
            isValid = false;
        }
        if (isValid) {
            await request
                .signup({
                    username: username,
                    password: password1,
                })
                .then((res) => {
                    let data = {
                        username: username,
                        token: res.data.token,
                    };
                    store.setUser(data);
                    localStorage.setItem('user', data.username);
                    localStorage.setItem('token', data.token);
                    store.getNav()?.('/');
                })
                .catch((e) => {
                    error[3] = e.response.data.error;
                });
        }
        setError(error);
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
        `flex flex-row items-center shadow appearance-none border-[1px]  rounded-[8px] w-full ${
            error[n].length === 1 ? 'border-[#464646]' : 'border-red-500'
        }`;
    const inputfieldcss = `text-[#e2e2e2] bg-transparent leading-tight w-full h-full py-2 px-3 focus:outline-none focus:shadow-outline`;
    const buttoncss = `w-full hover:bg-[#d4d4d4] text-white hover:text-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline`;
    return (
        <div className="flex flex-col h-screen w-screen items-center bg-[#282828]">
            <div className="flex flex-col w-full max-w-sm h-[60%] md:h-[50%] justify-center items-center mt-[80px]">
                <form className="bg-[#212121] w-full shadow-md rounded-[15px] px-[30px] pt-6 pb-8 mb-4">
                    <p className={warningcss(3)}>{error[3]}</p>
                    <div className={inputdivcss(0)}>
                        <BiUser className="text-[#dee2e3] text-[1.5rem] mx-[8px]" />
                        <input
                            className={inputfieldcss}
                            type="text"
                            placeholder="Username"
                            value={username}
                            autoFocus
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <p className={warninginputcss(0)}>{error[0]}</p>
                    <div className={inputdivcss(1)}>
                        <RiLockPasswordLine className="text-[#dee2e3] text-[1.5rem] mx-[8px]" />
                        <input
                            className={inputfieldcss}
                            type="password"
                            placeholder="Password"
                            value={password1}
                            onChange={(e) => {
                                setPassword1(e.target.value);
                            }}
                        />
                    </div>
                    <p className={warninginputcss(1)}>{error[1]}</p>
                    <div className={inputdivcss(2)}>
                        <RiLockPasswordLine className="text-[#dee2e3] text-[1.5rem] mx-[8px]" />
                        <input
                            className={inputfieldcss}
                            type="password"
                            placeholder="Confirm Password"
                            value={password2}
                            onChange={(e) => {
                                setPassword2(e.target.value);
                            }}
                        />
                    </div>
                    <p className={warninginputcss(2)}>{error[2]}</p>
                    <div className="flex flex-col gap-5 items-center justify-between">
                        <div className="flex justify-center w-[70%] border-[1px] border-[#d4d4d4]">
                            <button
                                className={buttoncss}
                                type="button"
                                onClick={create}
                            >
                                Create
                            </button>
                        </div>
                        <div className="flex justify-center w-[70%] border-[1px] border-[#d4d4d4]">
                            <button
                                className={buttoncss}
                                type="button"
                                onClick={login}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </form>
                <Footer />
            </div>
        </div>
    );
};

export default Signup;
