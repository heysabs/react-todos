import React from 'react';
import TodosListHeader from './todos-list-header';

export default class TodosList extends React.Component {
  render() {
    console.log(this.props);
    return (
      <table>
        <TodosListHeader />
      </table>
    )
  }
}
