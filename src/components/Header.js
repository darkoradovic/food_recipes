import React, { Component } from "react";
import { Link, withRouter, Redirect } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

class Header extends Component {
  state = {
    showForm: false,
    value: '',
    recipes: [],
    searchTerm: "",
    userEmail: '',
    password: '',
    loged: false,
    uid: null,
    isActive: false,
    token: null
  };

  getToken = () => {
    const token = localStorage.getItem('token')

    this.setState({ token: token })

  }

  handleChange = (e) => {

    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const uuid = require('uuid/v4')
    const { userEmail, password } = this.state
    localStorage.setItem('userEmail', userEmail)
    localStorage.setItem('password', password)
    localStorage.setItem('token', uuid())


    e.target.reset()
    console.log(this.state)
    this.setState({
      showForm: false,
      loged: true,
      uid: uuid(),
      isActive: true
    })

    this.getToken()
  }


  logout = () => {

    localStorage.setItem('userEmail', '')
    localStorage.setItem('password', '')
    localStorage.setItem('token', null)
    /* localStorage.setItem('loged', false) */
    this.props.history.push('/');
    this.setState({ loged: false, showForm: false })

  }

  searchItems = searchTerm => {
    console.log(searchTerm);
    let endpoint = "";
    this.setState({
      recipes: [],
      searchTerm: searchTerm
    });
    if (searchTerm === "") {
      endpoint = ''
    } else {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.state.searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        console.log(res.meals)
        this.setState(
          {
            recipes: res.meals
          },
          () => {
            if (this.state.searchTerm !== "") {
              localStorage.setItem("recipe", JSON.stringify(this.state.recipes));
            }
          }
        );

      });
  };

  timeout = null;

  handleForm = () => {
    console.log("Hello");
    this.setState({ showForm: !this.state.showForm });
  };



  handleSearch = (e) => {
    this.setState({ value: e.target.value })
    console.log(this.state)
    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.searchItems(this.state.value)
    }, 500)


  }

  handleKey = (e) => {
    if (e.key === 'Enter') {
      console.log('enter')
      this.props.history.push('/search')

      this.setState({
        value: ''
      })
    }
  }


  render() {
    console.log(this.props)


    return (
      <nav>



        <input id="filter" type="text" placeholder="Search recipes..."
          className="search-box"
          onChange={this.handleSearch}
          onKeyDown={this.handleKey}
          value={this.state.value} />
        <i id="filtersubmit" className="fa fa-search" ></i>

        <div className="navigation">
          {!this.state.loged ?

            <ul className="nav-items">
              <li>
                <a>
                  <i
                    className="far fa-user-circle user-icon"
                    style={{ height: "20px" }}
                    onClick={() => this.handleForm()}
                  ></i>
                </a>
              </li>
              <li>
                <HashLink to="/#contact">Contact</HashLink>
              </li>
              <li>
                <HashLink to="/#about">About Us</HashLink>
              </li>




            </ul> :
            <ul className="nav-items">

              <li>
                <a>
                  <i
                    className="far fa-user-circle user-icon"
                    style={{ height: "20px" }}
                    onClick={() => this.handleForm()}
                  ></i>
                </a>
              </li>
              <li>
                <a href="/#contact">Contact</a>
              </li>
              <li>
                <a href="/#about">About Us</a>
              </li>

              <li>
                <Link to="my-meals">My meals</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>


            </ul>}
        </div>


        {this.state.showForm ? (
          <form onSubmit={this.handleFormSubmit}>
            <div className="box">
              {!this.state.loged ?
                <React.Fragment>
                  <input
                    required
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="email"
                    id="userEmail"
                    onChange={this.handleChange}
                  />

                  <input
                    required
                    type="text"
                    name="password"
                    placeholder="password"
                    className="email"
                    id="password"
                    onChange={this.handleChange}
                  />
                  <button className="btn-form-icon">Log in</button>
                </React.Fragment> :
                <button className="btn-form-icon" onClick={() => this.logout()}>Log out</button>
              }

            </div>
          </form>
        ) : null}


      </nav>
    );

  }

}

export default withRouter(Header)