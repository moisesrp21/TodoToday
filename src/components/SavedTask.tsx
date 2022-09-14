import { BiEdit } from 'react-icons/bi';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TodoContext, todocontext } from './TodoList';
import { motion } from 'framer-motion';

import React from 'react';
type Props = {
    id: number;
    title: string;
    created: string;
    completed: boolean;
    toggleEditing: () => void;
    tocomplete: number;
    setToComplete: (n: number) => void;
};
const SavedTask = ({
    id,
    title,
    created,
    completed,
    toggleEditing,
    tocomplete,
    setToComplete,
}: Props) => {
    const todostore = React.useContext<todocontext>(TodoContext);
    const [isDone, setIsDone] = React.useState<boolean>(completed);
    //#4a4e56
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative flex flex-row gap-[10px] h-fit min-h-[60px] w-[95%] max-w-[900px] bg-transparent"
        >
            <div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        setToComplete(tocomplete === 0 ? 0 : tocomplete - 1);
                        todostore.delTodo(id);
                    }}
                    className="absolute top-[-15px] right-[5px] flex justify-center p-[3px] w-[50px] bg-[#9f0e0d] rounded-[20px] text-[1.1rem] text-bold"
                >
                    <RiDeleteBinLine />
                </motion.button>
                <div className="absolute flex justify-center top-[0] w-full">
                    <div className="w-[65%] md:w-[85%] border-t-[1px] border-[#363636]"></div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleEditing()}
                    className="absolute top-[-15px] left-[0px] flex justify-center p-[3px] w-[50px] bg-[#16171b] rounded-[20px] text-[1.1rem]"
                >
                    <BiEdit />
                </motion.button>
            </div>
            <div
                onClick={() => {
                    setIsDone(!isDone);
                    todostore.completeTodo(id, !isDone);
                }}
                className="flex flex-col items-start w-full h-full"
            >
                <div className="flex my-[20px] items-start gap-[10px] w-full">
                    <div className="flex items-center justify-start">
                        <button className="flex items-center justify-center w-[25px] h-[25px] rounded-[20px] shadow-md">
                            {isDone ? (
                                <RiCheckboxCircleLine className="text-[1.3rem] text-[#72bc44]" />
                            ) : (
                                <RiCheckboxBlankCircleLine className="text-[1.3rem] text-[#dff5ff] " />
                            )}
                        </button>
                    </div>
                    <div className="ml-[20px] flex w-[87%]">
                        <p
                            className={`bg-[#363636] shadow-md cursor-pointer whitespace-pre-line break-all font-sans text-[0.93rem] p-1 rounded-[5px] border-[2px] border-solid border-[#373737] ${
                                isDone ? 'line-through' : ''
                            }`}
                        >
                            {title}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SavedTask;
