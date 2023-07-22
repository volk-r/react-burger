export const INGREDIENT_CATEGORIES = [
    {
        "type":"bun",
        "name":"Булки",
    },
    {
        "type":"main",
        "name":"Начинка",
    },
    {
        "type":"sauce",
        "name":"Соусы",
    },
];

export const BUN_TYPE = 'bun';
export const BUN_COUNT = 2;

export const ITEM_TYPES = {
    MOVE_ITEM_TO_CONSTRUCTOR: "ingredient",
    ITEM_INSIDE_CONSTRUCTOR: "ingredient_index",
}

export const ROUTES = {
    ROUTE_HOME_PAGE              : '/',
    ROUTE_LOGIN_PAGE             : '/login',
    ROUTE_REGISRATION_PAGE       : '/register',
    ROUTE_FORGOT_PASSWORD_PAGE   : '/forgot-password',
    ROUTE_RESET_PASSWORD_PAGE    : '/reset-password',
    ROUTE_PROFILE_ROOT           : '/profile/*',
    ROUTE_PROFILE_PAGE           : '/profile/',
    ROUTE_INGREDIENT_DETAILS_PAGE: '/ingredients/:ingredientId',
    ROUTE_FEED_PAGE              : '/feed',
    ROUTE_FEED_DETAILS_PAGE      : '/feed/:feedId',
}

export const NESTED_ROUTES = {
    PROFILE_USER_INFO           : "/",
    PROFILE_ORDER_LIST_PAGE     : "orders",
    PROFILE_ORDER_DETAILS_PAGE  : 'orders/:ordersId',
}

export const TEST_EMAIL = "yandex_practicum@mail.ru";