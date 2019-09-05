import React, { Component } from "react";
import {Link, withRouter} from 'react-router-dom'

 class Header extends Component {
  state = {
    showForm: false,
    value: ''
  };

  timeout = null;

  handleForm = () => {
    console.log("Hello");
    this.setState({ showForm: !this.state.showForm });
  };

  

  handleSearch = (e) => {
    this.setState({value: e.target.value})
    console.log(this.state)
    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.props.callback(this.state.value)
    }, 500)

  }

  handleKey = (e) => {
    if(e.key === 'Enter'){
      console.log('enter')
      this.props.history.push('/search')
      
    }
  }

  render() {
    return (
      <nav>
        <div className="row">
          <div className="col">
            <input
              type="text"
              placeholder="Search recipes..."
              className="search-box"
              onChange={this.handleSearch}
              onKeyDown={this.handleKey}
              value={this.state.value}
            />
            <Link to="/search"><i
              className="fas fa-search"
              style={{ paddingLeft: "10px", height: "20px" }}
            ></i></Link>
          </div>

          <div className="col">
            <ul className="nav-items">
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a>
                  <i
                    className="far fa-user-circle"
                    style={{ height: "20px" }}
                    onClick={() => this.handleForm()}
                  ></i>
                </a>
              </li>
            </ul>
            {this.state.showForm ? (
              <form method="post" action="index.html">
                <div className="box">
                  <input
                    type="text"
                    name="email"
                    value="Email"
                    className="email"
                  />

                  <input
                    type="password"
                    name="email"
                    value="Password"
                    className="email"
                  />

                  <a href="#">
                    <div className="btn-form-icon">Log In</div>
                  </a>
                </div>
              </form>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header)