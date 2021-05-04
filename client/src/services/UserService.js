import http from "../http-common";

class UserService {
  // 사용자 전체 조회
  getAll() {
    return http.get("/users");
  }

  // 사용자 조회
  get(id) {
    return http.get(`/users/${id}`);
  }

  // 사용자 생성
  create(data) {
    return http.post("/users", data);
  }

  // 사용자 정보 수정 시 현재 비밀번호 확인
  compareCurrentPassword(data) {
    return http.post("/users/compare/password", data);
  }

  // 사용자 수정
  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  // 사용자 삭제
  delete(id) {
    return http.delete(`/users/${id}`);
  }

  // 사용자 전체 삭제
  deleteAll() {
    return http.delete("/users");
  }

  findByAccount(account) {
    return http.get(`/users/account/${account}`);
  }

  getAuthLogin(data) {
    return http.post("/users/auth/login", data);
  }
}

export default new UserService();
