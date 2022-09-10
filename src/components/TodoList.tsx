import React, { useEffect } from 'react';
import Task from './Task';
import AddTodo from '../pages/AddTodo';
import { todotype } from '../services/requests';
import request from '../services/requests';
import { StoreContext, contexttype } from '../App';
import Header from '../components/Header';

export interface todocontext {
    addTodo: (tast: todotype) => void;
    delTodo: (id: number) => void;
    editTodo: (task: todotype) => void;
    completeTodo: (id: number, isCompleted: boolean) => void;
    getId: () => number;
    getTodos: () => todotype[];
}
export let TodoContext: React.Context<todocontext>;
const TodoList = () => {
    const store = React.useContext<contexttype>(StoreContext);
    let user = store.getUser();
    let token = user?.token ? user?.token : '';
    const [todos, setTodos] = React.useState<Array<todotype>>([]);
    const [completed, setCompleted] = React.useState(0);
    const update = async () => {
        if (user !== null) {
            await request.getAll(token).then((res) => {
                setTodos(res.data);
                let count = 0;
                res.data.forEach((ele: todotype) => {
                    if (ele.completed) count++;
                });
                setCompleted(count);
            });
        }
    };
    const state = {
        getTodos: () => {
            return todos;
        },
        addTodo: (task: todotype) => {
            request
                .createTodo(task, token)
                .then(() => {
                    update();
                })
                .catch((e) => {});
        },
        delTodo: (id: number) => {
            setTodos(
                todos.filter((e) => {
                    return e.id !== id;
                }),
            );
            request
                .deleteTodo(id, token)
                .then((res) => {})
                .catch((e) => {});
        },
        editTodo: (task: todotype) => {
            setTodos(
                todos.map((e) => {
                    return e.id !== task.id ? e : task;
                }),
            );
            request
                .updateTodo(task.id, task, token)
                .then((res) => {})
                .catch((e) => {});
        },
        completeTodo: (id: number, isCompleted: boolean) => {
            if (isCompleted) setCompleted(completed + 1);
            else setCompleted(completed - 1);
            request
                .completeTodo(id, token)
                .then((res) => {})
                .catch((e) => {});
        },
        getId: () => {
            if (todos.length <= 0) return 1;
            else return todos[0].id + 1;
        },
    };
    TodoContext = React.createContext<todocontext>(state);
    useEffect(() => {
        update();
        //eslint-disable-next-line
    }, []);
    return (
        <div>
            <Header todos={todos} completed={completed} />
            <div className="flex flex-1 flex-col items-center">
                <AddTodo />
                <div className="flex flex-col w-full h-full gap-[30px] items-center mt-[40px]">
                    {todos.map((task) => {
                        return (
                            <Task
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                created={task.created}
                                completed={task.completed}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TodoList;
