const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  {
    id: 1,
    project: "Ketchapp",
    tasks: ["Terminar blog"]
  }
];

const checkExistsProjects = (req, res, next) => {
  if (!projects.length > 0) {
    return res.status(400).json({ error: "Projects are empty" });
  }
  return next();
};

const checkData = (req, res, next) => {
  if (!req.body.id || !req.body.project) {
    return res.status(400).json({ error: "Missing data: id or project " });
  }
  return next();
};

//list all projects
server.get("/projects", checkExistsProjects, (req, res) => {
  return res.json(projects);
});

//add the projects
server.post("/projects/", checkData, (req, res) => {
  const new_project = ({ id, project, tasks } = req.body);
  projects.push(new_project);
  return res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { project } = req.body;
  const { tasks } = req.body;
  projects[id] = {
    id: id,
    project: project,
    tasks: tasks
  };
  return res.json(projects);
});

server.listen(3001);
