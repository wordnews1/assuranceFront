import Vue from "vue";
import store from "./store";
// import {isMobile} from "mobile-device-detect";
import Router from "vue-router";
import NProgress from "nprogress";
import authenticate from "./auth/authenticate";

Vue.use(Router);

// create new router

const routes = [
  {


    path: "/",
    component: () => import("./views/app"), //webpackChunkName app
    //beforeEnter: authenticate,
    redirect: "/app/assurances/assurance-list",



    children: [
      {
        path: "/app/lexique/lexique",
        component: () => import("./views/app/lexique/lexique")
      },
      {
        path: "/app/caisse/catproduct",
        component: () => import("./views/app/caisse/catproduct")
      },
      {
        path: "/app/three/three",
        component: () => import("./views/app/three/three")
      },
      {
          path: "/app/organisation/organisationList",
          component: () => import("./views/app/organisation/organisationList")
      },
      {
          path: "/app/organisation/organisationforms",
          component: () => import("./views/app/organisation/organisationforms")
      },
      {
          path: "/app/organisation/organisationAdd",
          name:"addorganisation",
          component: () => import("./views/app/organisation/organisationAdd")
      },
      {
          path: "/app/agents-list",
          name:"agentList",
          props: true,
          component: () => import("./views/app/agent/agentList")
      },
      {
          path: "http://51.89.118.114:8090/auth/admin/master/console/#/realms/mtckeycloak/users",
          name:"keycloakUsers",
          props: true,
          component: () => import("./views/app/agent/agentList")
      },
      {
          path: "/app/organisation/organisationRead",
          name:"readorganisation",
          props: true,
          component: () => import("./views/app/organisation/organisationRead")
      },
      {
          path: "/app/organisation/organisationEdit",
          name:"editorganisation",
          props:true,
          component: () => import("./views/app/organisation/organisationEdit")
      },
      {
        path: "/app/assurances/assurance-list",
        name: "assurancelist",
        component: () => import("./views/app/assurance/assuranceList")
      },
      {
        path: "/app/accidents/accident-list",
        name: "accidentlist",
        component: () => import("./views/app/accident/accidentList")
      },
      {
        path: "/app/accidents/patients",
        name: "patientFolder",
        props: true,
        component: () => import("./views/app/dossierPatient/dossierpatient")
      },
      {
        path: "/app/accidents/patients",
        name: "patientList",
        props: true,
        component: () => import("./views/app/patient/patientList")
      },

      {
          path: "/app/assurance/assuranceforms",
          name:"addassurance",
          component: () => import("./views/app/assurance/assuranceforms")
      },
      {
          path: "/app/billing/billing",
          name:"billing",
          component: () => import("./views/app/billing/billing"),
          props:true
      },
      {
          path: "vignette1",
          name:"vignette1",
          component: () => import("./views/app/vignette1"),
          props:true

      },
      {
          path: "vignette2",
          name:"vignette2",
          component: () => import("./views/app/vignette2"),
          props:true
      },

      //  apps
      {
        path: "/app/apps",
        component: () => import("./views/app/apps"),
        redirect: "/app/apps/chat",
        children: [
          {
            path: "scrumboard",
            component: () => import("./views/app/apps/scrumboard"),

          },
          {
            path: "add-scrumboard",
            component: () => import("./views/app/apps/scrumboardAddBoard")
          },
          {
            path: "edit-scrumboard",
            component: () => import("./views/app/apps/scrumboard/editScrumBoard")
          },
          // {
          //   path: "scrumboard-one",
          //   component: () => import("./views/app/apps/scrumboard/scrumboard-content-one")
          // },
          {
            path: "contact-list-table",
            component: () => import("./views/app/apps/contactListTable")
          },
          {
            path: "todo-list",
            component: () => import("./views/app/apps/todo-list")
          },
          {
            path: "invoice",
            component: () => import("./views/app/apps/invoice")
          },
          {
            path: "createInvoice",
            component: () => import("./views/app/apps/createInvoice")
          },
          {
            path: "edit-invoice",
            component: () => import("./views/app/apps/editInvoice")
          },
          {
            path: "products",
            component: () => import("./views/app/apps/products")
          },
          {
            path: "product-detail",
            component: () => import("./views/app/apps/productDetails")
          },
          {
            path: "checkout",
            component: () => import("./views/app/apps/cart")
          },
          {
            path: "checkout-address",
            component: () => import("./views/app/apps/checkoutAddress")
          },
          {
            path: "printInvoice",
            component: () => import("./views/app/apps/printInvoice")
          },
          {
            path: "taskManager",
            component: () => import("./views/app/apps/taskManager")
          },
          {
            path: "calendar",
            component: () => import("./views/app/apps/calendar")
          },
          {
            path: "table",
            component: () => import("./views/app/apps/table")
          },
          {
            path: "vue-table",
            component: () => import("./views/app/apps/vue-tables")
          },
          {
            path: "inbox",
            component: () => import("./views/app/apps/inbox")
          },
          {
            path: "chat",
            component: () => import("./views/app/apps/chat")
          },
          {
            path: "contact-details",
            component: () => import("./views/app/apps/contact-details")
          },
          {
            path: "contact-grid",
            component: () => import("./views/app/apps/contact-grid")
          },
          {
            path: "contact-list",
            component: () => import("./views/app/apps/contact-list")
          },
          {
            path: "payment-checkout",
            component: () => import("./views/app/apps/paymentCheckout")
          }
        ]
      },


      // pages
      {
        path: "/app/pages",
        component: () => import("./views/app/pages"),
        redirect: "/app/pages/profile",
        children: [
          {
            path: "profile",
            component: () => import("./views/app/pages/profile")
          },
          {
            path: "error",
            name: "error",
            component: () => import("./views/app/pages/notFound")
          },
          {
            path: "icons",
            component: () => import("./views/app/pages/icons")
          },
          {
            path: "search-result",
            component: () => import("./views/app/pages/search-result")
          },
          {
            path: "pricing-table",
            component: () => import("./views/app/pages/pricingTable")
          },
          {
            path: "faq",
            component: () => import("./views/app/pages/faq")
          },

        ]
      }


    ]
  },
  // sessions
  {
    path: "/app/sessions",
    component: () => import("./views/app/sessions"),
    redirect: "/app/sessions/signIn",
    children: [
      {
        path: "signIn",
        component: () => import("./views/app/sessions/signIn")
      },
      {
        path: "signUp",
        component: () => import("./views/app/sessions/signUp")
      },
      {
        path: "forgot",
        component: () => import("./views/app/sessions/forgot")
      }
    ]
  },

  {
    path: "/vertical-sidebar",
    component: () => import("./containers/layouts/verticalSidebar")
  },
  {
    path: "*",
    component: () => import("./views/app/pages/notFound")
  }
];

const router = new Router({
  mode: "history",
  linkActiveClass: "open",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0};
  }
});

router.beforeEach((to, from, next) => {
  // If this isn't an initial page load.
  if (to.path) {
    // Start the route progress bar.

    NProgress.start();
    NProgress.set(0.1);
  }
  next();
});

router.afterEach(() => {
  // Remove initial loading
 const gullPreLoading = document.getElementById("loading_wrap");
  if (gullPreLoading) {
    gullPreLoading.style.display = "none";
  }
  // Complete the animation of the route progress bar.
  setTimeout(() => NProgress.done(), 2);
  // NProgress.done();
  // if (isMobile) {
  if (window.innerWidth <= 12) {
    // console.log("mobile");
    store.dispatch("changeSidebarProperties");
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
      store.dispatch("changeCompactSidebarProperties");
    }
  } else {
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    // store.state.sidebarToggleProperties.isSecondarySideNavOpen = false;
  }
});

export default router;
