import React from 'react';
import NewTodo from '../components/NewTodo';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineMinus } from 'react-icons/ai';
import { motion } from 'framer-motion';
const AddTodo = () => {
    const [isAdding, setIsAdding] = React.useState<boolean>(false);
    return (
        <div className="flex gap-6 flex-col w-full items-center mt-[20px]">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                    setIsAdding(!isAdding);
                }}
                className="flex items-center rounded-[20px] mr-[30px] ml-auto px-[20px] py-[5px] bg-[#16171b] text-[1rem] w-[60px]"
            >
                {isAdding ? (
                    <AiOutlineMinus />
                ) : (
                    <IoMdAdd className="text-white" />
                )}
            </motion.button>
            {isAdding ? <NewTodo /> : ''}
        </div>
    );
};

export default AddTodo;
