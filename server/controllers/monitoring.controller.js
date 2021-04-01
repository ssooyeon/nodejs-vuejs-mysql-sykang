const nodeOsUtils = require("node-os-utils");
const diskUsage = require("diskusage");

//////////////////////////////////
// find
//////////////////////////////////
exports.findCPU = (req, res) => {
  const cpu = nodeOsUtils.cpu;
  cpu
    .usage()
    .then((percent) => {
      res.send(percent.toString());
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving cpu usage." });
    });
};

exports.findMemory = (req, res) => {
  const mem = nodeOsUtils.mem;
  mem
    .info()
    .then((info) => {
      const usage = 100 - info.freeMemPercentage;
      res.send(usage.toString());
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving memory usage." });
    });
};

exports.findDisk = (req, res) => {
  diskUsage
    .check("/")
    .then((info) => {
      const disk = 100 - (info.free / info.total) * 100;
      res.send(disk.toString());
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving disk usage." });
    });
};
