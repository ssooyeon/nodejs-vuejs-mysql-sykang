import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfileView from "@/pages/UserProfile/UserProfileView.vue";
import TutorialListView from "@/pages/TableList/TutorialListView.vue";
import AddTutorialView from "@/pages/TableList/AddTutorialView.vue";
import EditTutorialView from "@/pages/TableList/EditTutorialView.vue";

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
    ],
  },
];

export default routes;
