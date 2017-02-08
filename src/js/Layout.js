import React from "react";

// Stylesheets
require("../sass/main.scss");

export default class Layout extends React.Component {
    render() {
        return (
            <div className="container container--body">
                <div className="row">
                    <div className="col-sm-12">
                        <h1 className="container__title">Hello World!</h1>
                        <p className="container__desc">Welcome to Mini English Dictionary App</p>
                    </div>
                </div>
            </div>
        );
    }
}