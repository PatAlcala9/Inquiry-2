const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'selection', component: () => import('pages/SelectionPage.vue') },
      { path: 'statuscheck', component: () => import('pages/StatusCheckPage.vue') },
      { path: 'opcheck', component: () => import('pages/OPSearchPage.vue') },
      { path: 'noticecheck', component: () => import('pages/NoticeSearchPage.vue') },
      { path: 'permitcheck', component: () => import('pages/PermitSearchPage.vue') },
      { path: 'receivedlist', component: () => import('pages/ListDailyReceivedPage.vue') },
      { path: 'namecheck', component: () => import('pages/NameCheckPage.vue') },
      { path: 'approvedlist', component: () => import('pages/ListApprovedPage.vue') },

      { path: 'helpindex', component: () => import('pages/HelpIndexPage.vue') },
      { path: 'helpapplication', component: () => import('pages/helps/ApplicationHelpPage.vue') },

      { path: 'statussearch', component: () => import('pages/loadings/StatusSearchLoading.vue') },
      { path: 'namesearch', component: () => import('pages/loadings/NameSearchLoading.vue') },
      { path: 'opsearch', component: () => import('pages/loadings/OPSearchLoading.vue') },
      { path: 'listgenerate', component: () => import('pages/loadings/ListGenerateLoading.vue') },
      { path: 'noticesearch', component: () => import('pages/loadings/NoticeSearchLoading.vue') },
      { path: 'permitsearch', component: () => import('pages/loadings/PermitSearchLoading.vue') },
      { path: 'listgenerateapprove', component: () => import('pages/loadings/ListGenerateApproveLoading.vue') },
      { path: 'listgeneratereceived', component: () => import('pages/loadings/ListGenerateDailyReceivedLoading.vue') },

      { path: 'searcherror', component: () => import('pages/errors/SearchErrorPage.vue') },
      { path: 'statuserror', component: () => import('pages/errors/StatusCheckErrorPage.vue') },
      { path: 'error', component: () => import('pages/errors/ErrorPage.vue') },

      { path: 'noconnection', component: () => import('pages/NoConnectionPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
