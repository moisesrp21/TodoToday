import React from 'react';
import { BiEdit } from 'react-icons/bi';

const EditButton = () => {
    return (
        <button className="absolute top-[-15px] left-[0px] flex justify-center p-[3px] w-[50px] bg-[#16171b] rounded-[20px] text-[1.1rem]">
            <BiEdit />
        </button>
    );
};

export default EditButton;
