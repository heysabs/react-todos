import React from 'react';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBjZnwAk1ThpwG5D2qtwsWmYhTGb8vsupg",
  authDomain: "justdoit-47d64.firebaseapp.com",
  databaseURL: "https://justdoit-47d64.firebaseio.com",
  storageBucket: "justdoit-47d64.appspot.com",
};
firebase.initializeApp(config);

const todos = [
  {
    task: 'Do React tutorial',
    isCompleted: false
  },
  {
    task: 'Bake a cake',
    isCompleted: true
  }
];

export default class App extends React.Component {
  componentWillMount() {
    this.firebaseRef = firebase.database().ref().child('todo');
    this.firebaseRef.on('child_added', snap => {
      this.state.todos.push({
        index: snap.key,
        task: snap.val().task,
        isCompleted: snap.val().isCompleted
      });
      this.setState({ todos: this.state.todos });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  constructor(props) {
    super(props);

    this.state = {
      todos
    };
  }
  render() {
    return (
      <div>
        <img src="http://ih0.redbubble.net/image.93571148.9110/flat,800x800,075,f.jpg" height="300" />
        <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
        <TodosList
              todos={this.state.todos}
              toggleTask={this.toggleTask.bind(this)}
              saveTask={this.saveTask.bind(this)}
              deleteTask={this.deleteTask.bind(this)}
               />
      </div>
    );
  }
  toggleTask(task) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === task);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    this.setState({todos: this.state.todos});
  }

  createTask(task){
    this.firebaseRef.push({
      task,
      isCompleted: false
    });
    this.setState({ todos: this.state.todos });
  }

  saveTask(oldTask, newTask) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
    foundTodo.task = newTask;
    this.setState({ todos: this.state.todos })
  }

  deleteTask(taskToDelete, indexToDelete) {
    console.log(taskToDelete);
    firebase.database().ref('todo/' + indexToDelete). remove();
    _.remove(this.state.todos, todo => todo.task === taskToDelete);
    this.setState({ todos: this.state.todos});
  }
}
