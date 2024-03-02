import Home from "../src/assets/homeIcon.png";
import Category from "../src/assets/categoryIcon.png";
import Product from "../src/assets/productIcon.png";

export const BASE_URL = "http://localhost:5000/"
export const menuList = [
    {
        name: "Home",
        path: "/",
        icon: Home
    },
    {
        name: "Category",
        path: "/category",
        icon: Category
    },
    {
        name: "Product",
        path: "/product",
        icon: Product
    },
]

export const statusData = [
    {
        label: "Active",
        value: true

    }, {
        label: "InActive",
        value: false

    },
];