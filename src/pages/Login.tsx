import React from 'react';
import { StoreContext, contexttype } from '../App';
import Footer from '../components/Footer';
import request from '../services/requests';

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
    return (
        <div className="flex flex-col w-full max-w-xs h-[60%] md:h-[50%] justify-center items-center">
            <form className="bg-[#323641] w-full shadow-md rounded-[20px] px-[30px] pt-6 pb-8 mb-4">
                <p
                    className={`text-white text-xs text-center italic w-fit ml-auto mb-[10px] px-[7px] py-[5px] rounded-lg bg-red-500 ${
                        error[0].length === 1 ? 'opacity-0' : 'opacity-1'
                    }`}
                >
                    {error[0]}
                </p>
                <div className="mb-4">
                    <label
                        className="block text-[#dee2e3] text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded-[20px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                <p
                    className={`text-white text-xs italic w-fit ml-auto my-[10px] px-[7px] py-[5px] rounded-lg bg-red-500 ${
                        error[1].length === 1 ? 'opacity-0' : 'opacity-1'
                    }`}
                >
                    {error[1]}
                </p>
                <div className="mb-6">
                    <label
                        className="block text-[#dee2e3] text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded-[20px] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <p
                        className={`text-white text-xs italic w-fit ml-auto mt-[10px] px-[7px] py-[5px] rounded-lg bg-red-500 ${
                            error[2].length === 1 ? 'opacity-0' : 'opacity-1'
                        }`}
                    >
                        {error[2]}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-[#ff7460] hover:bg-[#d0545e] text-white font-bold py-2 px-4 rounded-[10px] focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={login}
                    >
                        Sign In
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-[10px] focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={signup}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
            <Footer />
        </div>
    );
};
export default Login;
