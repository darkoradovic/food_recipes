import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = ({component: MyMeals, ...rest}) => {
    return (
        <Route
        {...rest}
        render={props => {
            
            const user = localStorage.getItem('userEmail')
            const pass = localStorage.getItem('password')
            if(user && pass !== ''){
                return <MyMeals {...props} />
            }else{
                return <Redirect to={
                    {pathname: "/",
                    state: {
                        from: props.location
                    }
                }
                } />
            }
        }}
        >
            
        </Route>
    )
}

export default ProtectedRoute
