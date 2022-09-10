import { BiEdit } from 'react-icons/bi';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TodoContext, todocontext } from './TodoList';
import React from 'react';
type Props = {
    id: number;
    title: string;
    created: string;
    completed: boolean;
    toggleEditing: () => void;
};
const SavedTask = ({ id, title, created, completed, toggleEditing }: Props) => {
    const todostore = React.useContext<todocontext>(TodoContext);
    const [isDone, setIsDone] = React.useState<boolean>(completed);
    return (
        <div className="relative flex flex-row gap-[10px] h-fit min-h-[60px] w-[95%] max-w-[1000px] rounded-[20px] bg-[#4a4e56] shadow-md">
            <div>
                <button
                    onClick={() => {
                        todostore.delTodo(id);
                    }}
                    className="absolute top-[-15px] right-[5px] flex justify-center p-[3px] w-[50px] bg-[#9f0e0d] rounded-[20px] text-[1.1rem] text-bold"
                >
                    <RiDeleteBinLine />
                </button>
                <button
                    onClick={() => toggleEditing()}
                    className="absolute top-[-15px] left-[0px] flex justify-center p-[3px] w-[50px] bg-[#16171b] rounded-[20px] text-[1.1rem]"
                >
                    <BiEdit />
                </button>
            </div>
            <div
                onClick={() => {
                    setIsDone(!isDone);
                    todostore.completeTodo(id, !isDone);
                }}
                className="flex flex-col items-start w-full h-full"
            >
                <div className="flex my-[20px] flex-row gap-[10px]">
                    <div className="flex flex-col items-center justify-start h-[100%] mx-[5px]">
                        <button>
                            {isDone ? (
                                <RiCheckboxCircleLine className="text-[1.3rem] text-[#b3cba7]" />
                            ) : (
                                <RiCheckboxBlankCircleLine className="text-[1.3rem] text-[#dff5ff]" />
                            )}
                        </button>
                    </div>
                    <pre
                        className={`whitespace-pre-line font-sans text-[0.93rem] ${
                            isDone ? 'line-through' : ''
                        }`}
                    >
                        {title}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default SavedTask;
