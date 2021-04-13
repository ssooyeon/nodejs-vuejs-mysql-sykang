import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserTableView from "@/pages/Table/UserTableView.vue";
import BoardView from "@/pages/Board/BoardView.vue";
import AddBoardView from "@/pages/Board/AddBoardView.vue";
import EditBoardView from "@/pages/Board/EditBoardView.vue";
import BoardDetailView from "@/pages/Board/BoardDetailView.vue";
import LoginView from "@/pages/Login/LoginView.vue";
import MyProfile from "@/pages/MyProfile/MyProfileView.vue";

import { store } from "./store/index";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "board",
        name: "board",
        component: BoardView,
      },
      {
        path: "board/add",
        name: "add-board",
        component: AddBoardView,
      },
      {
        path: "board/edit/:id",
        name: "edit-board",
        component: EditBoardView,
      },
      {
        path: "board/:id",
        name: "board-detail",
        component: BoardDetailView,
      },
      {
        path: "table",
        name: "user-list",
        component: UserTableView,
      },
      {
        path: "/myprofile",
        name: "my-profile",
        component: MyProfile,
        beforeEnter: (to, from, next) => {
          console.log(store.state.userStore);
          if (store.state.userStore.user !== "") {
            return next();
          }
          next("/login");
        },
      },
      {
        path: "/login",
        name: "login",
        component: LoginView,
      },
    ],
  },
];

export default routes;
