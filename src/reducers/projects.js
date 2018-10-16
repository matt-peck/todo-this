const _projects = [
  {
    name: "Work",
    subProjects: [{ name: "Guard" }, { name: "Google" }]
  },
  {
    name: "Personal",
    subProjects: [{ name: "Admin" }, { name: "Finances" }]
  }
];

const projects = (state = _projects, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default projects;
