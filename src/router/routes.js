import Auth from "./Modules/Auth.js";
import Posts from "./Modules/Posts.js";
import Users from "./Modules/Users.js";

export default [
    ...Auth,
    ...Posts,
    ...Users
]
