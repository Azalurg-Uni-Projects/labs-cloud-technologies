import axios from "axios";
import * as actions from './actions';

export const getTodoList = () => {
    return async dispatch => {
        try{
            const response = await axios.get(`http://todo-app-k8s.com/api/todo`);
            if(response.status === 200)
                dispatch(actions.todoGetAction(response.data));
        }catch(error) {
            console.log(error)
        }
    }
}

export const addTodo = (todo) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://todo-app-k8s.com/api/todo`, todo);
            if(response.status === 200) 
                dispatch(actions.todoAddAction(response.data));
        } catch(ex) {
            console.log(ex)
        }
    }
}

export const editTodo = (todo) => {
    return async dispatch => {
        try {
            const response = await axios.put(`http://todo-app-k8s.com/api/todo/${todo._id}`, todo);
            if(response.status === 201){
                dispatch(actions.todoEditAction(response.data));
            } else {
                console.log(response.status);
            }
                
        } catch(ex) {
            console.log(ex)
        }
    }
}

export const deleteTodo = (todo) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`http://todo-app-k8s.com/api/todo/${todo._id}`);
            if(response.status === 200) 
                dispatch(actions.todoDeleteAction(response.data));
        } catch(ex) {
            console.log(ex)
        }
    }
}


// todo ...