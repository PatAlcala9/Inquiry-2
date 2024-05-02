const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },

      {
        path: "/helpindex",
        component: () => import("pages/HelpIndexPage.vue"),
      },
      {
        path: "/helpapplication",
        component: () => import("pages/helps/ApplicationHelpPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
