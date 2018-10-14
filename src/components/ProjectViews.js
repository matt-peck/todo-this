import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { enableTodoEditMode, disableTodoEditMode } from "../actions/Todos";
import TodoContainer from "./TodoContainer";
import AddTodoContainer from "./AddTodoContainer";
import { Modes } from "../constants";

// Check out: https://gist.github.com/zvweiss/66517767889a7ed9895a
// add viewFilter

class InboxViewShell extends Component {
  render() {
    const {
      todos,
      enableTodoEditMode,
      disableTodoEditMode,
      addTodoId
    } = this.props;

    return (
      <div>
        <header className="view-header">Inbox</header>
        {todos.map(todo => (
          <TodoContainer
            key={todo.title}
            todo={todo}
            enableEditMode={() =>
              enableTodoEditMode({ type: "TODO", id: todo.id })
            }
            disableEditMode={() =>
              disableTodoEditMode({ type: "TODO", id: todo.id })
            }
          />
        ))}
        <AddTodoContainer
          enableEditMode={() =>
            enableTodoEditMode({ type: "ADD_TODO", id: "Inbox" })
          }
          disableEditMode={() => disableTodoEditMode({ type: "ADD_TODO" })}
          mode={addTodoId === "Inbox" ? Modes.EDIT : Modes.READ}
        />
      </div>
    );
  }
}

const mapInboxState = state => {
  return {
    todos: state.Todos.filter(t => !t.project),
    addTodoId: state.addTodoId
  };
};

const mapDispatchInbox = dispatch => {
  return {
    enableTodoEditMode: id => dispatch(enableTodoEditMode(id)),
    disableTodoEditMode: id => dispatch(disableTodoEditMode(id))
  };
};

export const InboxView = connect(
  mapInboxState,
  mapDispatchInbox
)(InboxViewShell);

const ProjectViewShell = ({
  projectName,
  todos,
  projects,
  addTodoId,
  enableTodoEditMode,
  disableTodoEditMode
}) => {
  switch (projectName) {
    case "Projects":
      return (
        <Fragment>
          <header className="view-header">{projectName}</header>
          {projects.map(p => {
            return (
              <div key={p} className="todo-list-container">
                <header className="todo-list-header">{p}</header>
                {todos.filter(t => t.project === p).map(todo => (
                  <TodoContainer
                    key={todo.title}
                    todo={todo}
                    enableEditMode={() =>
                      enableTodoEditMode({ type: "TODO", id: todo.id })
                    }
                    disableEditMode={() =>
                      disableTodoEditMode({ type: "TODO", id: todo.id })
                    }
                  />
                ))}

                <AddTodoContainer
                  project={p}
                  enableEditMode={() =>
                    enableTodoEditMode({ type: "ADD_TODO", id: p })
                  }
                  disableEditMode={() =>
                    disableTodoEditMode({ type: "ADD_TODO" })
                  }
                  mode={addTodoId === p ? Modes.EDIT : Modes.READ}
                />
              </div>
            );
          })}
        </Fragment>
      );

    default:
      return (
        <div className="todo-list-container">
          <header className="todo-list-header">{projectName}</header>
          {todos.map(todo => (
            <TodoContainer
              key={todo.title}
              todo={todo}
              enableEditMode={() =>
                enableTodoEditMode({ type: "TODO", id: todo.id })
              }
              disableEditMode={() =>
                disableTodoEditMode({ type: "TODO", id: todo.id })
              }
            />
          ))}
          <AddTodoContainer
            project={projectName}
            enableEditMode={() =>
              enableTodoEditMode({ type: "ADD_TODO", id: projectName })
            }
            disableEditMode={() => disableTodoEditMode({ type: "ADD_TODO" })}
            mode={addTodoId === projectName ? Modes.EDIT : Modes.READ}
          />
        </div>
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
    projects,
    addTodoId: state.addTodoId
  };
};

const mapDispatchProjectsState = dispatch => {
  return {
    enableTodoEditMode: id => dispatch(enableTodoEditMode(id)),
    disableTodoEditMode: id => dispatch(disableTodoEditMode(id))
  };
};

export const ProjectView = connect(
  mapProjectsState,
  mapDispatchProjectsState
)(ProjectViewShell);
