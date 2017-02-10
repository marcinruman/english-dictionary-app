import React from "react";
import Dictionary from "../../../dictionary.json";

export default class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            showResult: false,
            showError: false
        };

        /**
         * Stores a successful search result
         * @type {Array}
         * @private
         */
        this._searchResult = [];
    }

    searchFormHandler(e) {
        e.preventDefault();

        if(this.validate() === false) {
            return;
        } else {
            this.searchDictionary(Dictionary, this.refs.searchInput.value);
        }
    }

    validate() {
        if(this.refs.searchInput.value === "") {
            this.refs.searchInput.placeholder = "Hey, feed me something here...";
            return false;
        } else {
            this.refs.searchInput.placeholder = "What word do you want to look up?";
        }
    }

    searchDictionary(obj, query) {
        let foundResult = false;

        for (let key in obj) {
            let value = obj[key];

            // convert to lower case string in order to easier compare the values
            query = query.toString().toLowerCase().trim();
            key = key.toString().toLowerCase();

            if (typeof value === 'object') {
                this.searchDictionary(value, query);
            }

            if (key === query) {
                foundResult = true;
                this.searchResultFound(key, value);
            }
        }

        // no result
        if(foundResult === false) {
            this.searchResultNotFound();
        }
    }

    searchResultFound(key, value) {
        this._searchResult = [key, value]; // assign a search result
        this.setState({showError: false}); // now as there is a match, let's hide any errors that might have been showed earlier
        this.setState({showResult: true}); // change the state to render the result
    }

    searchResultNotFound() {
        this.setState({showResult: false}); // make sure there is no previous results found
        this.setState({showError: true}); // render the 'no results found' message
    }

    render() {
        return (
            <div className="search">
                <form>
                    <input className="search__input" type="text" placeholder="What word do you want to look up?" ref="searchInput" />
                    <button type="submit" className="button button--big" onClick={this.searchFormHandler.bind(this)}>Search</button>
                </form>
                {this.state.showResult ?
                    (<div className="search__result">
                        <h2 className="search__result--header">{this._searchResult[0]}</h2>
                        <p className="search__result--desc">{this._searchResult[1]}</p>
                    </div>) :
                    null
                }

                {this.state.showError ?
                    (<div className="search__result">
                        <h2 className="search__result--header search__result--error">No result found...</h2>
                        <p className="search__result--desc">Sorry, our super smart, mini dictionary hasn't yet learnt about: <i className="search__result--noword">{this.refs.searchInput.value}</i>.</p>
                        <p className="search__result--desc">Why don't you feed it with something else instead?</p>
                    </div>) :
                    null
                }
            </div>
        );
    }
}