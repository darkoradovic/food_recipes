import React, { Component } from "react";
import {Link, withRouter} from 'react-router-dom'

 class Header extends Component {
  state = {
    showForm: false,
    value: '',
    recipes: [],
    searchTerm: "",
    userEmail: '',
    password: '',
    loged: false
  };


  handleChange = (e) => {
        
    this.setState({
        [e.target.id]: e.target.value
    })
}

handleFormSubmit = (e) => {
  e.preventDefault();
   const {userEmail, password} = this.state
  localStorage.setItem('userEmail', userEmail)
  localStorage.setItem('password', password)
   

  e.target.reset()
  console.log(this.state)
  this.setState({
    showForm: false,
    loged: true
  })
}

logout = () => {

  localStorage.setItem('userEmail', '')
  localStorage.setItem('password', '')
  this.props.history.push('/');
  this.setState({ loged: false })

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
    this.setState({value: e.target.value})
    console.log(this.state)
    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.searchItems(this.state.value)
    }, 500)


  }

  handleKey = (e) => {
    if(e.key === 'Enter'){
      console.log('enter')
      this.props.history.push('/search')
      
      this.setState({
        value: ''
      })
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
            <div>
              {!this.state.loged ? 
              
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
              
              
            </ul>  : 
              <ul className="nav-items">
              
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              
              
              <li>
                <Link to="my-meals">My meals</Link>
              </li>
              <li>
                <a onClick={this.logout}>Logout</a>
              </li>
            </ul>} 
            </div>
            
            
            {this.state.showForm ? (
              <form onSubmit={this.handleFormSubmit}>
                <div className="box">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="email"
                    id="userEmail"
                    onChange={this.handleChange}
                  />

                  <input
                    type="text"
                    name="password"
                    placeholder="password"
                    className="email"
                    id="password"
                    onChange={this.handleChange}
                  />

                  
                     <button className="btn-form-icon">Log in</button>
                  
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