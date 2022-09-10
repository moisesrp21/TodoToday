import axios from 'axios';

export type todotype = {
    id: number;
    title: string;
    created: string;
    completed: boolean;
};
export type usertype = {
    token: string;
    username: string;
} | null;

type credentialstype = {
    username: string;
    password: string;
};

class TodoDataService {
    getAll(token: string) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.get('https://moisesrp.pythonanywhere.com/api/todos/');
    }
    createTodo(data: todotype, token: string) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.post(
            'https://moisesrp.pythonanywhere.com/api/todos/',
            data,
        );
    }
    updateTodo(id: number, data: todotype, token: string) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.put(
            `https://moisesrp.pythonanywhere.com/api/todos/${id}`,
            data,
        );
    }
    deleteTodo(id: number, token: string) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.delete(
            `https://moisesrp.pythonanywhere.com/api/todos/${id}`,
        );
    }
    completeTodo(id: number, token: string) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.put(
            `https://moisesrp.pythonanywhere.com/api/todos/${id}/complete`,
        );
    }
    login(data: credentialstype) {
        return axios.post(
            'https://moisesrp.pythonanywhere.com/api/login/',
            data,
        );
    }
    signup(data: credentialstype) {
        return axios.post(
            'https://moisesrp.pythonanywhere.com/api/signup/',
            data,
        );
    }
}
export default new TodoDataService();
