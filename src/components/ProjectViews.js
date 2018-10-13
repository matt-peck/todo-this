import React, { Fragment } from "react";
import { connect } from "react-redux";
import TodoContainer from "./TodoContainer";
import AddTodoContainer from "./AddTodoContainer";

// Check out: https://gist.github.com/zvweiss/66517767889a7ed9895a
// add viewFilter

const InboxViewShell = ({ todos }) => {
  return (
    <Fragment>
      <header className="view-header">Inbox</header>
      {todos.map(todo => (
        <TodoContainer key={todo.title} todo={todo} />
      ))}
      <AddTodoContainer />
    </Fragment>
  );
};

const mapInboxState = state => {
  return {
    todos: state.Todos.filter(t => !t.project)
  };
};

export const InboxView = connect(mapInboxState)(InboxViewShell);

const ProjectViewShell = ({ projectName, todos, projects }) => {
  switch (projectName) {
    case "Projects":
      return (
        <Fragment>
          <header className="view-header">{projectName}</header>
          {projects.map(p => {
            return (
              <Fragment key={p}>
                <header className="todo-list-header">{p}</header>
                {todos.map(todo => (
                  <TodoContainer key={todo.title} todo={todo} />
                ))}
                <AddTodoContainer project={p} />
              </Fragment>
            );
          })}
        </Fragment>
      );

    default:
      return (
        <Fragment>
          <header className="todo-list-header">{projectName}</header>
          {todos.map(todo => (
            <TodoContainer key={todo.title} todo={todo} />
          ))}
          <AddTodoContainer project={projectName} />
        </Fragment>
      );
  }
};

const mapProjectsState = (state, ownProps) => {
  const { params } = ownProps.match;

  const todos = params.projectName
    ? state.Todos.filter(
        t => !t.completed && t.project === ownProps.match.params.projectName
      )
    : state.Todos.filter(t => !t.completed && t.project);

  const projects = state.Projects.reduce((list, p) => {
    return [...list, p.name, ...p.subProjects.map(s => s.name)];
  }, []);

  return {
    todos,
    projectName: ownProps.match.params.projectName || "Projects",
    projects
  };
};

export const ProjectView = connect(mapProjectsState)(ProjectViewShell);
