import React, { Component } from 'react'

export default class Contact extends Component {

    state = {
        name: '',
        lastname: '',
        email: '',
        message: '',
        success: ''
    }

    handleChange = (e) => {
        
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
         const {name, lastname, email, message} = this.state
        localStorage.setItem('Name', name)
        localStorage.setItem('LastName', lastname)
        localStorage.setItem('Email', email)
        localStorage.setItem('Message', message) 

        e.target.reset()
        this.handleSuccess();
        console.log(this.state)
    }

     handleSuccess = () => {
        this.setState({success:'Your message has been sent.'})
        setTimeout(() => {
            this.setState({success: ''})
        }, 5000)
    }

    render() {
        console.log(this.state)
        return (
            <section className="py-5" id="contact">
        <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">

                <h1 className="line-contact mx-auto">Contact</h1>
            
                <form className="mt-5" onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <input id="name" onChange={this.handleChange} type="text" name="firstName" className="form-control" placeholder="First name" />
                    </div>

                    <div className="form-group">
                        <input id="lastname" onChange={this.handleChange} type="text" name="lastName" className="form-control" placeholder="Last name" />
                    </div>

                    <div className="form-group">
                        <input id="email" onChange={this.handleChange} type="email" name="email" className="form-control" placeholder="Email" />
                    </div>

                    

                    <div className="form-group">
                        <textarea id="message" onChange={this.handleChange} name="message" className="form-control" rows="10" placeholder="Message"></textarea>
                    </div>

                    <div className="form-group mt-3">
                        <input type="submit" className="btn-contact" />
                    </div>

                    <div><h4 className="success">{this.state.success}</h4></div>
                    
                </form>
            </div>
        </div>
    </section>
        )
    }
}
