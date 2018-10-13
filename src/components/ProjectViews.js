import React, { Fragment } from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import AddTodoContainer from "./AddTodoContainer";

// Check out: https://gist.github.com/zvweiss/66517767889a7ed9895a
// add viewFilter

const InboxViewShell = ({ Todos }) => {
  return (
    <Fragment>
      <header className="view-header inbox">Inbox</header>
      {Todos.map(todo => (
        <Todo key={todo.title} todo={todo} />
      ))}
      <AddTodoContainer />
    </Fragment>
  );
};

const mapInboxState = state => {
  return {
    Todos: state.Todos.filter(t => !t.project)
  };
};

export const InboxView = connect(mapInboxState)(InboxViewShell);

const ProjectViewShell = ({ projectName, Todos, Projects }) => {
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
          {Todos.map(todo => (
            <Todo key={todo.title} todo={todo} />
          ))}
          <AddTodoContainer project={projectName} />
        </Fragment>
      );
  }
};

const mapProjectsState = (state, ownProps) => {
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

export const ProjectView = connect(mapProjectsState)(ProjectViewShell);
