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
const ProjectTodoListShell = ({ projectName, Todos, Projects }) => {
  switch (projectName) {
    case "Projects":
      return (
        <Fragment>
          <header className="view-header">{projectName}</header>
          {Projects.map(p => {
            return (
              <Fragment key={p}>
                <header className="todo-list-header">{p}</header>
                {Todos.map(todo => (
                  <Todo key={todo.title} todo={todo} />
                ))}
                <AddTodo addTodo={addTodo} project={p} />
              </Fragment>
            );
          })}
        </Fragment>
      );

    default:
      return (
        <Fragment>
          <header className="todo-list-header">{projectName}</header>
          {Todos.map(todo => (
            <Todo key={todo.title} todo={todo} />
          ))}
          <AddTodo addTodo={addTodo} project={projectName} />
        </Fragment>
      );
  }
};
const mapProjectTodoState = (state, ownProps) => {
  const { params } = ownProps.match;

  const Todos = params.projectName
    ? state.Todos.filter(
        t => !t.completed && t.project === ownProps.match.params.projectName
      )
    : state.Todos.filter(t => !t.completed && t.project);

  const Projects = state.Projects.reduce((list, p) => {
    return [...list, p.name, ...p.subProjects.map(s => s.name)];
  }, []);

  return {
    Todos,
    projectName: ownProps.match.params.projectName || "Projects",
    Projects
  };
};
const ProjectTodoList = connect(mapProjectTodoState)(ProjectTodoListShell);

const TodoLists = () => {
  return (
    <div className="main">
      <Route path="/inbox" component={InboxView} />
      <Route path="/today" component={TodayView} />
      <Route path="/week" component={WeekView} />
      <Route exact path="/projects" component={ProjectTodoList} />
      <Route path="/projects/:projectName" component={ProjectTodoList} />
    </div>
  );
};

export default withRouter(TodoLists);
