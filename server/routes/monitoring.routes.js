module.exports = (app) => {
  const monitorings = require("../controllers/monitoring.controller");
  var router = require("express").Router();

  router.get("/cpu", monitorings.findCPU);
  router.get("/memory", monitorings.findMemory);
  router.get("/disk", monitorings.findDisk);

  app.use("/api/monitoring", router);
};
