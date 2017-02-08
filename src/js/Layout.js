import React from "react";
import Search from "./components/search/Search"

// Stylesheets
require("../sass/main.scss");

export default class Layout extends React.Component {
    render() {
        return (
            <div className="container container--body">
                <div className="row">
                    <div className="col-xs-12">
                        <h1 className="container__title">Hello World!</h1>
                        <p className="container__desc">Welcome to Mini English Dictionary App</p>
                        <Search />
                    </div>
                </div>
            </div>
        );
    }
}