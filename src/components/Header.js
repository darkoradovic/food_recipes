import React, { Component } from "react";

export default class Header extends Component {
  state = {
    showForm: false
  };

  handleForm = () => {
    console.log("Hello");
    this.setState({ showForm: !this.state.showForm });
  };

  render() {
    return (
      <nav>
        <div className="row">
          <div className="col">
            <input
              type="text"
              placeholder="Search recipes..."
              className="search-box"
            />
            <i
              className="fas fa-search"
              style={{ paddingLeft: "10px", height: "20px" }}
            ></i>
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
