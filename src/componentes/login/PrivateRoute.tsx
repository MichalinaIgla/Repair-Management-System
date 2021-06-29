import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface Props{
    component: any,
    path: string
    exact?: any
}

export const PrivateRoute: React.FC<Props>= ({component, path}) => {

    const checkLoginStatus = () =>{
        console.log(localStorage.getItem('user')!==null, "user");
        console.log(localStorage.getItem('user'), "user");
        if(localStorage.getItem('user') !== null ){
            return true;
        }
        return false;
    }

    return (
        checkLoginStatus() ? <Route path={path} component={component}/> :
        <Redirect to={{ pathname: '/login' }} />
    );

    // return (
    //     <Route
    //     render={props =>
    //         {return (
    //             checkLoginStatus() ? <Route exact path={path} component={component}/> :
    //             <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    //         );}
    //         // checkLoginStatus() ? (
    //         // <Route exact path={path} component={component}/>
    //         // ) : (
    //         // <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    //         // )
    //     }
    //     />
    // )
}

export default PrivateRoute