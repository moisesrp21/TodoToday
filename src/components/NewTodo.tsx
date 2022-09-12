import React from 'react';
import { TodoContext, todocontext } from './TodoList';
const NewTodo = () => {
    const [text, setText] = React.useState('');
    const [height, setHeight] = React.useState(0);
    const todostore = React.useContext<todocontext>(TodoContext);
    const ref = React.useRef<HTMLTextAreaElement>(null);
    const node = ref.current;
    const save = () => {
        let node = ref.current;
        if (node) {
            console.log(node.value);
            todostore.addTodo({
                id: todostore.getId(),
                title: node.value,
                created: new Date().toString(),
                completed: false,
            });
            node.value = '';
        }
    };
    React.useLayoutEffect(() => {
        if (node) {
            node.style.height = 'auto';
            node.style.height = node.scrollHeight + 'px';
            if (node.scrollHeight !== height) setHeight(node.scrollHeight);
        }
        // eslint-disable-next-line
    }, [text]);
    React.useLayoutEffect(() => {
        if (node) {
            const resizeObserver = new ResizeObserver((es) => {
                todostore.size();
            });
            resizeObserver.observe(node);
        }
        // eslint-disable-next-line
    }, [node]);
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
                        rows={1}
                        ref={ref}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        autoFocus
                        className="bg-[#353739] w-[95%] h-auto leading-[22px] p-3 rounded-[5px] overflow-hidden resize-none border-[2px] border-solid border-[#373737] focus:outline-none focus:shadow-outline"
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default NewTodo;
