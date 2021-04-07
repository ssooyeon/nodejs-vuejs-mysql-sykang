import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfileView from "@/pages/UserProfile/UserProfileView.vue";
import TutorialListView from "@/pages/TableList/TutorialListView.vue";
import AddTutorialView from "@/pages/TableList/AddTutorialView.vue";
import EditTutorialView from "@/pages/TableList/EditTutorialView.vue";
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
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfileView,
      },
      {
        path: "table",
        name: "tutorial-list",
        component: TutorialListView,
      },
      {
        path: "/table/add-tutorial",
        name: "add-tutorial",
        component: AddTutorialView,
      },
      {
        path: "/table/tutorials/:id",
        name: "tutorial-details",
        component: EditTutorialView,
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
