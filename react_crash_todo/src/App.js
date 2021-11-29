import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
//import { v4 } from 'uuid';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com')
      .then(res => this.setState({todos: res.data}));
  }

  // Toggle complete.
  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }) });
  }

  // Delete todo.
  delTodo = (id) => {
    /*
    this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)] });
    */
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  // Add todo.
  addTodo = (title) => {
    /*
    const newTodo = {
      id: v4(),
      title: title,
      completed: false,
    }
    this.setState({todos: [...this.state.todos, newTodo] });
    */
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title:title, completed: false,
    })
      .then(res => this.setState({todos: [...this.state.todos, res.data]} ));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header/>
            <Routes>
              <Route path="/" render={(props) => {
                return(
                  <React.Fragment>
                    <AddTodo addTodo={this.addTodo}/>
                    <Todos todos={this.state.todos} 
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}/>
                  </React.Fragment>
                );
              }}/>
              <Route path="/about" element={<About/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
