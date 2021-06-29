import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import * as yup from 'yup';
import './Login.css';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#626271',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);


type State = {
  username: string
  password:  string
};

const initialState:State = {
  username: '',
  password: '',
};

const LoginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const Login = () => {
  const [error, setError] = useState(false);
  const classes = useStyles();
  // const [userData, setUserData] = useState(null);
  const history = useHistory();

  const onSubmit = (inputUserData: State) => {
    axios.get("http://localhost:8081/users").then(res => {
      console.log(res.data);
      let user = res.data.find((user:any) => user.username === inputUserData.username && user.password === inputUserData.password);
      if(user){ 
        console.log(user, 'You successfully logged in');

        localStorage.setItem('user', JSON.stringify({ "id": user.id, "username": inputUserData.username,  "role": user.role}))

        history.push("/"); 
      }else{
        setError(true); 
      }
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    <div className={classes.container}>
      <Card className={classes.card} >
     
        <CardHeader className={classes.header} title="Login to Repair Service" />
        <CardContent>
          <Formik initialValues={initialState} onSubmit={values => onSubmit(values)} onReset={() => {}} validateOnChange={false} validateOnBlur={false} validationSchema={LoginSchema} >
          {({values, handleChange, handleBlur}) => (
            <Form>
              <div>
                {error ?<Alert variant="outlined" severity="error">
                  Incorrect username or password
                  </Alert>:null}
                <TextField
                  required={true}
                  fullWidth
                  id="TextFieldUsername"
                  type="text"
                  label="Username"
                  name="username"
                  placeholder="Username"
                  margin="normal"
                  onChange={handleChange}
                />
                <TextField
                  required={true}
                  fullWidth
                  id="TextFieldPassword"
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="Password"
                  margin="normal"
                  onChange={handleChange}
                />
                <CardActions>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.loginBtn}
                    type="submit"
                    >
                    Login
                  </Button>
                </CardActions>
              </div>
            </Form>
          )}
          </Formik>
        </CardContent>

      </Card>
    </div>
  );
}

export default Login;