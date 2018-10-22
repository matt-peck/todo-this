import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Modes } from "../constants";
import TodoContainer from "./TodoContainer";
import AddTodoContainer from "./AddTodoContainer";
import { getTodosForProject, getInboxTodos } from "../selectors";

class InboxViewShell extends Component {
  render() {
    const { todos, todoFormId } = this.props;

    return (
      <div>
        <header className="view-header">Inbox</header>
        {todos.map(todo => (
          <TodoContainer key={todo.id} todo={todo} />
        ))}
        <AddTodoContainer
          mode={todoFormId === "Inbox" ? Modes.EDIT : Modes.READ}
        />
      </div>
    );
  }
}

const mapInboxState = state => {
  return {
    todos: getInboxTodos(state),
    todoFormId: state.todoFormId
  };
};

export const InboxView = connect(mapInboxState)(InboxViewShell);

const ProjectViewShell = ({ projectName, todos, projects, todoFormId }) => {
  switch (projectName) {
    // eventually this will lead to being able to display multiple layers of projects
    case "Projects":
      return (
        <Fragment>
          {projects.map(p => {
            return (
              <div key={p.name} className="todo-list-container">
                <header className="todo-list-header project">{p.name}</header>
                {todos.filter(t => t.project === p.name).map(todo => (
                  <TodoContainer key={todo.id} todo={todo} />
                ))}

                <AddTodoContainer
                  project={p.name}
                  mode={todoFormId === p.name ? Modes.EDIT : Modes.READ}
                />
              </div>
            );
          })}
        </Fragment>
      );

    default:
      return (
        <div className="todo-list-container">
          <header className="todo-list-header project">{projectName}</header>
          {todos.map(todo => (
            <TodoContainer key={todo.title} todo={todo} />
          ))}
          <AddTodoContainer
            project={projectName}
            mode={todoFormId === projectName ? Modes.EDIT : Modes.READ}
          />
        </div>
      );
  }
};

const mapProjectsState = (state, ownProps) => {
  return {
    todos: getTodosForProject(state, ownProps.match.params.projectName),
    projectName: ownProps.match.params.projectName || "Projects",
    projects: state.projects,
    todoFormId: state.todoFormId
  };
};

export const ProjectView = connect(mapProjectsState)(ProjectViewShell);
