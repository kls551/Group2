import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import MyProfile from "./views/MyProfile.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/shop",
      name: "shop",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Shop.vue")
    },
    {
      path: "/services",
      name: "services",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Services.vue")
    },
    {
      path: "/my-profile",
      name: "myProfile",
      component: MyProfile
    },
    // {
    //   path: "/todos",
    //   name: "todos",
    //   component: ToDos
    // },
    {
      path: "/owner/announcment",
      name: "announcment",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/OwnerAnnouncement.vue")
    },
    {
      path: "/owner/accounts",
      name: "accounts",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Accounts.vue")
    },
    // {
    //   path: "/trackorder",
    //   name: "trackorder",
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/trackorder.vue")
    // },
    {
      path: "/shop/itemview",
      name: "itemview",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/ItemView.vue")
    },
    {
      path: "/trackorder",
      name: "trackOrder",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/TrackOrder.vue")
    },
    {
      path: "/owner/manage-main-categories",
      name: "ownerManageCategories",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/ManageCategories.vue")
    },
    {
      path: "/owner/manage-sub-categories",
      name: "ownerManageSubCategories",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/ManageSubCategories.vue")
    },
    {
      path:"/owner/manage-orders",
      name: "ownerManageOrders",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/OwnerOrders.vue")
    },
    {
      path:"/owner/manage-inventory",
      name: "ownerManageInventory",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/OwnerInventory.vue")
    },
    {
      path:"/owner/add-item",
      name: "ownerAddItem",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/NewItem.vue")
    },
    {
      path:"/owner/create-services",
      name: "ownerCreateServices",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/OwnerCreateServices.vue")
    },
    {
      path:"/owner/edit-services",
      name: "ownerEditServices",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/OwnerEditServices.vue")
    },
    {
      path:"/order-confirm",
      name: "orderConfirmation",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/OrderConfirmation.vue")
    }
  ]
});
