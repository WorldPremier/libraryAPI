import React, { Component } from 'react';
import Book from "./Book"
// import Spiner from './Spiner';


class Shelf extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            searchInput: "",
            filter: "",
            loading: true,
            search: false
        }
    }

    handleInputChange = (e) => {
        this.setState({ searchInput: e.target.value })
    }
    clear = () => {
        this.setState({ searchInput: "", filter: "", search: true })

    }

    filters = () => {
        this.setState({ search: true });
        let url = "";
        const title = this.state.searchInput.replace(/\s/g, '+');
        const filter = this.state.filter.replace(/\s/g, '+');
        if (title !== "" && filter != "") {
            url = `http://openlibrary.org/search.json?title=${title}&author=${filter}`
        }
        else if (title == "" && filter !== "") { url = `http://openlibrary.org/search.json?author=${filter}` }
        else if (title !== "" && filter == "") {
            url = `http://openlibrary.org/search.json?title=${title}`
            //    alert(url+"   "+"http://openlibrary.org/search.json?author=Victoria+Aveyard&title=red+queen")
        }
        alert("The book Title: " + title)
        alert("The author name: " + filter)

        return url
    }

    HandleSearch = () => {
        var url = this.filters()
        fetch(url)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // setTimeout(()=> true,2000)
                    alert("Fetching the Library API.......", response.status)
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                this.setState({ books: data.docs, loading: false });
                alert("Loading your data.......", data)
                // setTimeout(()=> true,1000)
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });

    }

    handleFilterChange = (e) => {
        const text = e.target.value
        this.setState({ filter: text })
    }


    render() {
        return (
            < div className=" text-center ">
                <nav className="navbar navbar-dark align-left">
                    <div className="brand">
                        <img src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fi.gifer.com%2FYbin.gif" style={{ borderRadius: "50%", height: 100, width: 150, resizeMode: 'stretch', float: 'left' }} />
                        <h1 style={{ color: "white", fontFamily: "'Shrikhand', cursive", fontSize: "55px" }} className="brand mx-4 my-4">Books-to-Win<apan style={{ fontFamily: "'Just Another Hand', cursive", fontSize: "30px", color: "white", marginLeft: "15px" }} >Seize every day with a new book.</apan></h1>
                    </div>
                </nav>

                <section className="jumbotron text-center">
                    <div className="container align-middle ">
                        <form className="form-inline mx-4 resp">

                            <div className="form-group mx-4 ">
                                <label className="mx-2 resp">Author Name</label>
                                <input value={this.state.filter} onChange={this.handleFilterChange} />
                            </div>
                            <div className="form-group">
                                <label className="mx-2 resp">Title</label>
                                <input value={this.state.searchInput} onChange={this.handleInputChange} />
                            </div>
                            <button className="btn btn-warning mx-2 bts" onClick={this.HandleSearch} onMouseDown={this.HandleSearch}>Search</button>
                            <button className="btn btn-danger  bt" onClick={this.clear}>Clear</button>
                        </form>
                    </div>
                </section>

                {/* {this.state.loading && this.state.search ? (<Spiner></Spiner>) : ( */}

                    <div className=" container ">
                        <div className="row">
                            {this.state.books.map((book) => <div><Book key={book.key} title={book.title} author={book['author_name']} firstLine={book['first_sentence']}
                                src={`http://covers.openlibrary.org/b/olid/${book['cover_edition_key']}-L.jpg`}
                                publish={book['first_publish_year']}

                            />
                                <h4><a href={`https://openlibrary.org/books/${book['cover_edition_key']}/${book.title.replace(/\s/g, '_')}`} target="blank" className="preview">Preview...</a></h4></div>)}
                        </div>
                    </div>
                {/* )} */}

                <footer className="text-muted fixed-bottom text-center  py-2 footer">

                    <div className="container">
                        <p >
                            <a href="#root">Back to top</a>
                        </p>
                    </div>
                </footer>
            </div>

        );
    }
}

export default Shelf;
