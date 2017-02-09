import React from "react";
import Dictionary from "../../../dictionary.json";

export default class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            showResult: false
        };

        /**
         * Stores a successful search result
         * @type {Array}
         * @private
         */
        this._searchResult = [];
    }

    searchHandler() {
        this.searchObj(Dictionary, this.refs.searchInput.value);
    }

    searchObj(obj, query) {

        for (let key in obj) {
            let value = obj[key];

            // convert to lower case string in order to easier compare the values
            query = query.toString().toLowerCase().trim();
            key = key.toString().toLowerCase();

            if (typeof value === 'object') {
                this.searchObj(value, query);
            }

            if (key === query) {
                this._searchResult = [key, value]; // assign a search result
                this.setState({showResult: true}); // change the state to render the result
            }

        }

    }

    render() {
        return (
            <div className="search">
                <input className="search__input" type="text" placeholder="What word you want to look up?" ref="searchInput" />
                <button className="button button--big" onClick={this.searchHandler.bind(this)}>Search</button>

                {this.state.showResult ?
                    (<div className="search__result">
                        <h2 className="search__result--header">{this._searchResult[0]}</h2>
                        <p className="search__result--desc">{this._searchResult[1]}</p>
                    </div>) :
                    null
                }
            </div>
        );
    }
}