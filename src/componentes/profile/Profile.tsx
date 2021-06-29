import { List, ListItem, ListItemText } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React from 'react';
import { User } from '../../types';
import './Profile.css';


const initUser = {
    "username": "",
    "firstname": "",
    "lastname": "",
    "email": "",
  
    "id": ""
};
export const Profile:React.FC = () => {
    const [userData, setUserData] = React.useState<User>(initUser);
    // const [tasksData, setTasksData] = React.useState<User[]>();

    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const params = {id: userId.toString()};
    React.useEffect(() => {
        if(userData === initUser){
            axios.get(`http://localhost:8081/users`, {params})
                .then(res => {
                    console.log(res.data[0]);
                    if (res.statusText === "OK" ){
                        const data = res.data[0];
                        setUserData({
                            username: data.username,
                            firstname: data.firstname,
                            lastname: data.lastname,
                            email: data.email,
                       
                            id: data.id
                        })
                    }
                });          
        }

    });

    
    // const getTasksData = async () => {
    //     const params2 = {employee: userId.toString()};
    //     await axios.get(`http://localhost:8080/orders`, {params2})
    //         .then(res => {
    //             const data = res.data[0];
    //             console.log(data);
    //             if (res.statusText !== "OK" ){
    //                 return( <div> Error </div>);
    //             }
    //         });
    // };
    // getTasksData();

    console.log(userData, "userData");
    return(
        <div className="Profile">
            <Card>
            <CardContent> 
                
                <Typography gutterBottom variant="h4" component="h2">
                {userData.firstname} {userData.lastname}
                </Typography> 
                <Typography variant="body2" color="textSecondary" component="p">
                    Account
                </Typography>
                <List >
                    <ListItem>
                        <ListItemText>
                            Email:  {userData.email}
                        </ListItemText>
                        
                    </ListItem>
                </List>
            </CardContent>
             {/* <Typography align='center'>Profile {userData.username}</Typography> */}
             </Card>
        </div>
      );
}
