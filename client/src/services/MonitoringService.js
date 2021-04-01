import http from "../http-common";

class MonitoringService {
  getCPU() {
    return http.get("/monitoring/cpu");
  }

  getMemory() {
    return http.get("/monitoring/memory");
  }

  getDisk() {
    return http.get("/monitoring/disk");
  }
}

export default new MonitoringService();
