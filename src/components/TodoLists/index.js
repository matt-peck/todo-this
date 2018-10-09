import React, { Fragment } from "react";
import { connect } from "react-redux";
import { addTodo } from "../../actions/Todos";
import { Route, withRouter } from "react-router-dom";
import TodayView from "./TodayView";
import WeekView from "./WeekView";
import InboxView from "./InboxView";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import "../../css/TodoLists.css";

// Check out: https://gist.github.com/zvweiss/66517767889a7ed9895a
// add viewFilter

const TodoLists = ({ Todos, addTodo }) => {
  return (
    <div className="main">
      <Route path="/inbox" render={props => <InboxView {...props} />} />
      <Route path="/today" render={props => <TodayView {...props} />} />
      <Route path="/week" render={props => <WeekView {...props} />} />
      <Route
        path="/project/:projectName"
        render={props => {
          const { projectName } = props.match.params;
          const filteredTodos = Todos.filter(t => t.project === projectName);
          return (
            <Fragment>
              <header className="todo-list-header">{projectName}</header>
              {filteredTodos.map(todo => (
                <Todo key={todo.title} todo={todo} />
              ))}
              <AddTodo addTodo={addTodo} project={projectName} />
            </Fragment>
          );
        }}
      />
    </div>
  );
};

const mapState = (state, ownProps) => {
  const Todos = state.Todos.filter(t => !t.completed);
  return {
    Todos
  };
};

const mapActions = dispatch => {
  return {
    addTodo: title => dispatch(addTodo(title))
  };
};

export default withRouter(
  connect(
    mapState,
    mapActions
  )(TodoLists)
);
