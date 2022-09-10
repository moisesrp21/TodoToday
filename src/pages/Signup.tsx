import React from 'react';
import Footer from '../components/Footer';
import { StoreContext, contexttype } from '../App';
import request from '../services/requests';

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

    return (
        <div className="flex flex-col w-full max-w-xs h-[50vh] justify-start">
            <form className="bg-[#323641] shadow-md rounded-[20px] px-[30px] pt-6 pb-8 mb-4 mt-[3rem]">
                <div className="flex flex-col">
                    <p
                        className={`text-white text-xs italic w-fit ml-auto my-[20px] px-[7px] py-[5px] rounded-lg bg-red-500 ${
                            error[3].length === 1 ? 'opacity-0' : 'opacity-1'
                        }`}
                    >
                        {error[3]}
                    </p>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-[#dee2e3] text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className={`shadow appearance-none border rounded-[20px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            error[0].length === 1 ? '' : 'border-red-500'
                        }`}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <p
                        className={`text-white text-xs italic w-fit ml-auto mt-[5px] px-[5px] rounded-lg bg-red-500 ${
                            error[0].length === 1 ? 'opacity-0' : 'opacity-1'
                        }`}
                    >
                        {error[0]}
                    </p>
                </div>
                <div className="mb-9"></div>
                <div className="flex flex-col mb-6 gap-4">
                    <div>
                        <label
                            className="block text-[#dee2e3] text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className={`shadow appearance-none border rounded-[20px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                error[1].length === 1 ? '' : 'border-red-500'
                            }`}
                            type="password"
                            placeholder="***********"
                            value={password1}
                            onChange={(e) => {
                                setPassword1(e.target.value);
                            }}
                        />
                        <p
                            className={`text-white text-xs italic w-fit ml-auto mt-[5px] px-[5px] rounded-lg bg-red-500 ${
                                error[1].length === 1
                                    ? 'opacity-0'
                                    : 'opacity-1'
                            }`}
                        >
                            {error[1]}
                        </p>
                    </div>
                    <div>
                        <label
                            className="block text-[#dee2e3] text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Confirm Password
                        </label>
                        <input
                            className={`shadow appearance-none border rounded-[20px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                error[2].length === 1 ? '' : 'border-red-500'
                            }`}
                            type="password"
                            placeholder="***********"
                            value={password2}
                            onChange={(e) => {
                                setPassword2(e.target.value);
                            }}
                        />
                        <p
                            className={`text-white text-xs italic w-fit ml-auto mt-[5px] px-[5px] rounded-lg bg-red-500 ${
                                error[2].length === 1
                                    ? 'opacity-0'
                                    : 'opacity-1'
                            }`}
                        >
                            {error[2]}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-[#ff7460] hover:bg-[#d0545e] text-white font-bold py-2 px-4 rounded-[10px] focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={create}
                    >
                        Create
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-[10px] focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={login}
                    >
                        Login
                    </button>
                </div>
            </form>
            <Footer />
        </div>
    );
};

export default Signup;
