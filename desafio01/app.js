const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
var numRequests = 0;

const checkExistsProjects = (req, res, next) => {
  //check if the projects are empty
  if (!projects.length > 0) {
    return res.status(400).json({ error: "Projects are empty" });
  }

  //check if project exists
  if (req.params.id) {
    let result = projects.filter(project => project.id == req.params.id);
    if (result.length <= 0) {
      return res.status(400).json({ error: "Project not exists" });
    }
    req.project = result;
  }

  return next();
};

const checkData = (req, res, next) => {
  if (!req.body.id || !req.body.project) {
    return res.status(400).json({ error: "Missing data: id or project " });
  }
  let result = projects.filter(project => project.id == req.body.id);
  if (result.length > 0) {
    return res.status(400).json({ error: "Id Exists" });
  }
  return next();
};

const sumRequest = (req, res, next) => {
  numRequests++;
  console.log(numRequests);
  next();
};

//listar todos os projetos
server.get("/projects", checkExistsProjects, sumRequest, (req, res) => {
  return res.json(projects);
});

//listar um projeto específico
server.get("/projects/:id", checkExistsProjects, sumRequest, (req, res) => {
  const { id } = req.params;
  const result = projects.filter(project => project.id == id);
  return res.json(result);
});

//adicionar projeto
server.post("/projects/", checkData, sumRequest, (req, res) => {
  const new_project = ({ id, project, tasks } = req.body);
  projects.push(new_project);
  return res.json(projects);
});

//editar titulo do projeto
server.put("/projects/:id", checkExistsProjects, sumRequest, (req, res) => {
  const { project } = req.body;
  //const item = projects.find(project => project.id == id);
  const item = projects.map(el => {
    if (el.id == req.params.id) {
      el.project = project;
    }
    return el;
  });
  //console.log(item, projects);
  return res.json(projects);
});

//apagar projetos
server.delete("/projects/:id", checkExistsProjects, sumRequest, (req, res) => {
  const { id } = req.params;
  projects.splice(id, 1);
  return res.json(projects);
});

//adicionar tarefas
server.post(
  "/projects/:id/tasks",
  checkExistsProjects,
  sumRequest,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(item => item.id == id);
    project.tasks.push(title);
    return res.json(project);
  }
);

server.listen(3001);
