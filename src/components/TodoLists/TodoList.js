import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../../actions/Todos";
import * as moment from "moment";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

class TodoList extends Component {
  state = {};

  render() {
    const { date, todos } = this.props;

    const title = date
      ? moment(date).calendar(null, {
          sameDay: "[Today]",
          nextDay: "[Tomorrow]",
          nextWeek: "dddd",
          lastDay: "[Overdue]",
          lastWeek: "[Overdue]",
          sameElse: "[Overdue]"
        })
      : "Overdue";

    const titleDate =
      title === ("Today" || "Tomorrow")
        ? moment(date).format("ddd MMM D")
        : date
          ? moment(date).format("MMM D")
          : "";

    return (
      <Fragment>
        <header
          className={`todo-list-header ${title === "Overdue" && "overdue"}`}
        >
          {title}
          <span className="date">{titleDate}</span>
        </header>
        {todos.map(todo => (
          <Todo key={todo.title} todo={todo} />
        ))}
        <AddTodo addTodo={this.props.addTodo} />
      </Fragment>
    );
  }
}

const mapState = (state, ownProps) => {
  const todos = ownProps.overdue
    ? state.Todos.filter(t => !t.completed).filter(t =>
        moment(t.dueDate, "YYYY-MM-DD").isBefore(moment(), "day")
      )
    : state.Todos.filter(t => !t.completed).filter(t =>
        moment(t.dueDate, "YYYY-MM-DD").isSame(ownProps.date, "day")
      );

  return {
    todos
  };
};

const mapActions = dispatch => {
  return {
    addTodo: title => dispatch(addTodo(title))
  };
};

export default connect(
  mapState,
  mapActions
)(TodoList);
