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
    prod: string = 'https://moisesrp.pythonanywhere.com';
    dev: string = 'http://localhost:8000';
    baseurl = this.dev;
    getAll(token: string) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.get(`${this.baseurl}/api/todos/`);
    }
    createTodo(data: todotype, token: string) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.post(`${this.baseurl}/api/todos/`, data);
    }
    updateTodo(id: number, data: todotype, token: string) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.put(`${this.baseurl}/api/todos/${id}`, data);
    }
    deleteTodo(id: number, token: string) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.delete(`${this.baseurl}/api/todos/${id}`);
    }
    completeTodo(id: number, token: string) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        return axios.put(`${this.baseurl}/api/todos/${id}/complete`);
    }
    login(data: credentialstype) {
        return axios.post(`${this.baseurl}/api/login/`, data);
    }
    signup(data: credentialstype) {
        return axios.post(`${this.baseurl}/api/signup/`, data);
    }
}
export default new TodoDataService();
