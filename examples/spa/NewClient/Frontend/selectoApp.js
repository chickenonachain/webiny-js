import React from "react";
import { i18n } from "webiny-client";
import { Menu } from "webiny-skeleton-app";

export default () => {
    return async (params, next) => {
        const { app } = params;

        app.services.get("menu").add(
            <Menu order="0" label={i18n("Dashboard")} route="Dashboard" icon="fa-home">
                <Menu order="0" label={i18n("My Account")} route="Dashboard" icon="fa-home" />
                <Menu order="1" label={i18n("Settings")} route="Dashboard" icon="fa-home" />
            </Menu>
        );

        app.router.addRoute({
            name: "Profile",
            path: "/about/:id",
            component: () => import("./views/Profile").then(m => m.default)
        });

        app.router.addRoute({
            name: "About",
            path: "/about",
            render: () =>
                import("./views/About").then(m => {
                    return React.createElement(m.default, {
                        api: "/security/users",
                        fields: "id,email,firstName",
                        perPage: 100
                    });
                })
        });

        app.router.addRoute({
            name: "Homepage",
            exact: true,
            path: "/",
            render() {
                return (
                    <div>
                        <h1>Homepage</h1>
                        <a href={"/about"}>About</a>
                    </div>
                );
            }
        });

        app.router.addRoute({
            name: "NotMatched",
            path: "*",
            render() {
                return (
                    <div>
                        <h1>404 Not Found</h1>
                        <a href={"/"}>Get me out of here</a>
                    </div>
                );
            }
        });

        app.modules.register([
            {
                name: "CustomUI",
                factory: () => import("./views/Custom").then(m => m.default)
            }
        ]);

        next();
    };
};