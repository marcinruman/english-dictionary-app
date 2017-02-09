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
         * @type {null}
         * @private
         */
        this._searchResult = null;
    }

    searchHandler(e) {
        console.log(this.refs.searchInput.value);
        this.searchObj(Dictionary, this.refs.searchInput.value);
    }

    searchObj(obj, query) {

        for (let key in obj) {
            let value = obj[key];

            if (typeof value === 'object') {
                this.searchObj(value, query);
            }

            if (key === query) {
                this._searchResult = value;
                this.setState({showResult: true});
                console.log('property=' + key + ' value=' + value);
            }

        }

    }

    render() {
        return (
            <div className="search">
                <input className="search__input" type="text" placeholder="What word you want to look up?" ref="searchInput" />
                <button className="button button--big" onClick={this.searchHandler.bind(this)}>Search</button>

                {this.state.showResult ?
                    (<div>
                        Result Found: {this._searchResult}
                    </div>) :
                    null
                }
            </div>
        );
    }
}