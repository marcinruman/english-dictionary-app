import React from "react";
import Search from "./components/search/Search"

// Stylesheets
require("../sass/main.scss");

export default class Layout extends React.Component {
    render() {
        return (
            <div className="container container--body">
                <div className="row center-xs center-md">
                    <div className="col-xs-12 col-md-8">
                        <h1 className="container__title">Dictionary</h1>
                        <p className="container__desc">Mini English Dictionary App</p>
                        <Search />
                    </div>
                </div>
            </div>
        );
    }
}