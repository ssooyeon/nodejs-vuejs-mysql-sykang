import http from "../http-common";

class UserService {
  getAll(params) {
    return http.get("/boards", { params });
  }

  get(id) {
    return http.get(`/boards/${id}`);
  }

  create(data) {
    return http.post("/boards", data);
  }

  update(id, data) {
    return http.put(`/boards/${id}`, data);
  }

  delete(id) {
    return http.delete(`/boards/${id}`);
  }

  deleteAll() {
    return http.delete("/boards");
  }
}

export default new UserService();
