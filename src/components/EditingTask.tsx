import React from 'react';
import { TodoContext, todocontext } from './TodoList';
interface Props {
    id: number;
    value: string;
    toggleEditing: () => void;
}
const EditingTask = ({ id, value, toggleEditing }: Props) => {
    const [title, setTitle] = React.useState(value);
    const todostore = React.useContext<todocontext>(TodoContext);
    const ref = React.createRef<HTMLTextAreaElement>();
    const initH: number = 24;
    function adjustsize(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        const node = ref.current;
        if (node) {
            if (e.key === 'Enter') {
                node.style.height = initH + node.scrollHeight + 'px';
            } else {
                node.style.height = '0px';
                node.style.height = node.scrollHeight + 'px';
            }
        }
    }
    React.useEffect(() => {
        const node = ref.current;
        if (node) {
            node.style.height = node.scrollHeight + 'px';
        }
        // eslint-disable-next-line
    }, []);
    const save = () => {
        todostore.editTodo({
            id: id,
            title: title,
            created: new Date().toString(),
            completed: false,
        });
        toggleEditing();
    };
    return (
        <div className="relative flex flex-row gap-[10px] h-fit w-[95%] max-w-[1000px] rounded-[20px] bg-transparent p-2">
            <div>
                <button
                    onClick={save}
                    className="absolute top-[-15px] left-[0px] flex justify-center p-[1px] w-[50px] bg-[#72bc44] rounded-[20px] text-[0.9rem]"
                >
                    <p>save</p>
                </button>
            </div>
            <div className="flex flex-col items-center w-full">
                <div className="flex m-2 flex-row items-center justify-center w-full h-fit">
                    <textarea
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        ref={ref}
                        autoFocus
                        className="bg-[#353739] w-[95%] h-auto leading-[22px] p-3 rounded-[5px] overflow-hidden resize-none border-[2px] border-solid border-[#373737] focus:outline-none focus:shadow-outline"
                        onKeyDown={(
                            e: React.KeyboardEvent<HTMLTextAreaElement>,
                        ) => adjustsize(e)}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default EditingTask;
