/**
 * a To-Do List app
 * http://www.reactnativeexpress.com/data_component_state
 * 
 * @2018/04/14
 */

import React, { Component } from 'react'
import { AppRegistry, View } from 'react-native'
// include connect for App
import { connect } from 'react-redux'

import { actionCreators } from './Redux'

import List from './List'
import Input from './Input'
import Title from './Title'

export class App extends Component {

  state = {
    todos: ['Click to remove', 'Learn React Native', 'Write Code', 'Ship App'],
  }

  onAddTodo = (text) => {
    // const {todos} = this.state
    // this.setState({
    //   todos: [text, ...todos],
    // })

    this.props.dispatch(actionCreators.add(text))
  }

  onRemoveTodo = (index) => {
    // const {todos} = this.state
    // this.setState({
    //   todos: todos.filter((todo, i) => i !== index),
    // })

    this.props.dispatch(actionCreators.remove(index))
  }

  render() {
    // const {todos} = this.state
    const {todos} = this.props

    return (
      <View>
        <Title>
          To-Do List
        </Title>
        <Input
          placeholder={'Type a todo, then hit enter!'}
          onSubmitEditing={this.onAddTodo}
        />
        <List
          list={todos}
          onPressItem={this.onRemoveTodo}
        />
      </View>
    )
  }
}

// inject app state from redux
const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
});

// Wrap App component with Connect component, 
// and create interaction channel(props) for it.
const AppContainer = connect(
  mapStateToProps
)(App);

export default AppContainer;


