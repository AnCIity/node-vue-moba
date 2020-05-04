import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "main",
        component: Main,
        children: [
            // categories
            {
                path: "/categories/create",
                component: () => import("@/views/pages/category/edit.vue")
            },
            {
                path: "/categories/edit/:id",
                component: () => import("@/views/pages/category/edit.vue"),
                props: true
            },
            {
                path: "/categories/list",
                component: () => import("@/views/pages/category/list.vue")
            },
            // items
            {
                path: "/items/create",
                component: () => import("@/views/pages/item/edit.vue")
            },
            {
                path: "/items/edit/:id",
                component: () => import("@/views/pages/item/edit.vue"),
                props: true
            },
            {
                path: "/items/list",
                component: () => import("@/views/pages/item/list.vue")
            },
            // heroes
            {
                path: "/heroes/create",
                component: () => import("@/views/pages/hero/edit.vue")
            },
            {
                path: "/heroes/edit/:id",
                component: () => import("@/views/pages/hero/edit.vue"),
                props: true
            },
            {
                path: "/heroes/list",
                component: () => import("@/views/pages/hero/list.vue")
            },
            // articles
            {
                path: "/articles/create",
                component: () => import("@/views/pages/article/edit.vue")
            },
            {
                path: "/articles/edit/:id",
                component: () => import("@/views/pages/article/edit.vue"),
                props: true
            },
            {
                path: "/articles/list",
                component: () => import("@/views/pages/article/list.vue")
            },
            // ads
            {
                path: "/ads/create",
                component: () => import("@/views/pages/ad/edit.vue")
            },
            {
                path: "/ads/edit/:id",
                component: () => import("@/views/pages/ad/edit.vue"),
                props: true
            },
            {
                path: "/ads/list",
                component: () => import("@/views/pages/ad/list.vue")
            },
            // admin_user
            {
                path: "/admin_users/create",
                component: () => import("@/views/pages/admin_user/edit.vue")
            },
            {
                path: "/admin_users/edit/:id",
                component: () => import("@/views/pages/admin_user/edit.vue"),
                props: true
            },
            {
                path: "/admin_users/list",
                component: () => import("@/views/pages/admin_user/list.vue")
            }
        ]
    },
    {
        path: "/login",
        component: () => import("@/views/Login.vue"),
        meta: { isPublic: true }
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (!to.meta.isPublic && !localStorage.token) {
        return next("/login");
    }
    next();
});

export default router;
