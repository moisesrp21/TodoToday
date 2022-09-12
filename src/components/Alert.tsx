import React from 'react';
import { Link } from 'react-router-dom';

const Alert = () => {
    return (
        <div className="w-[100%] flex justify-center">
            <div className="w-[90%] h-fit min-h-[80px]  bg-[#cce5ff] backdrop-blue-[2px] p-5 border-[3px] border-[#2b65d0] rounded-[20px] flex flex-col items-center text-[#004085]">
                <p className="">You are not logged in. </p>
                <div className="flex flex-row">
                    Please
                    <Link className="text-red-600" to={'/login'}>
                        &nbsp;Login&nbsp;&nbsp;
                    </Link>
                    <p>to see your todos</p>
                </div>
            </div>
        </div>
    );
};

export default Alert;
