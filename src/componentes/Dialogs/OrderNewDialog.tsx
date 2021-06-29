import { Container, DialogTitle, FormControl, InputLabel, MenuItem, MenuItemClassKey, MenuItemTypeMap, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';
import '../../App.css';
import { Order, User } from '../../types';
import { OrderField } from './Fields/OrderField';
import axios from 'axios';
import { number } from 'yup';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    datecontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
    }}
  }),
);


interface Props {
    onSubmit: (values: Order) => void;
  };

 const addDays = (date:Date, days:number=7) =>{
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const formatDate = (date:String[]) =>{
    let mm = date[0];
    let dd = date[1];
    let yyyy = date[2];
    if(dd.length === 1){
        dd = `0` +dd;
    }
    if(mm.length === 1){
        mm = `0` +mm;
    }
    return yyyy+`-`+mm+`-`+dd;
  }

  const initOrder = {
    "id": "4",
    "product": {
        "category": "",
        "name": "",
        "defect": ""
    },
    "owner":{
        "firstname" : "",
        "lastname": "",
        "phone": "",
        "email": ""
    },
    "receiveddate": formatDate((new Date).toLocaleDateString("en-US").split('/')),
    "receiptdate": formatDate((addDays(new Date)).toLocaleDateString("en-US").split('/')),
    "status": "Accepted",
    "employee":"",
    "price": 0,
    "description": ""
};

export const OrderNewDialog: React.FC<Props> = ({onSubmit}) => {
    const classes = useStyles();
    const [employees, setEmployees] = useState(null);
  
    React.useEffect(() => {
      if(!employees){
        axios.get("http://localhost:8081/users").then(res => {
          setEmployees(res.data);
        });
      }
    }, []);


   
    const validateSchema = yup.object({
        owner: yup.object({
            firstname: yup.string().required('This field is required').max(18),
            lastname: yup.string().required('This field is required').max(18),
            email: yup.string().required('This field is required')
        }),
        product: yup.object({
            name:  yup.string().required('This field is required'),
            defect: yup.string().required('This field is required'),
            category: yup.string().required('This field is required'),
        }),
        employee: yup.string().when("status", { is: 'In Progress', then: yup.string().required("Status is In Progress please enter the Employee")}),
        status: yup.string().required(),
    });

    
    const employeeList = (employeesData: User[] | null, ref:any) => {
        const list =  employeesData && employeesData.map( (Employee) => (
            <MenuItem ref={ref}  key={Employee.id} value={Employee.id}>
                {Employee.firstname} {Employee.lastname}
            </MenuItem>
            )
        )
        return list;
    }
    const divRef = React.useRef<HTMLLIElement>(null);
    
    return (
        <Container>
        <DialogTitle id="form-dialog-title">New Order</DialogTitle>
        <DialogContent>
            <Formik initialValues={initOrder} onSubmit={values => onSubmit(values)} onReset={() => {}} validateOnChange={true}
                validationSchema={validateSchema}>
                {({values, handleChange, handleBlur }) => ( //errors
                    <Form className={classes.root}>
                        <Grid container>
                        <Grid item sm={4} >
                        {/* <Grid container justify="space-around" > */}
                            <DialogContentText>Customer Data</DialogContentText>
                            <Field name="owner.firstname" label="First Name" component={OrderField} required={true}/>
                            {/* <TextField name="owner.firstname" value={values.owner.firstname} onChange={handleChange} onBlur={handleBlur} label="First Name"/>  */}
                            <Field name="owner.lastname" label="Last Name" component={OrderField} required={true}/>
                            <Field name="owner.email" label="Email" component={OrderField} type="email" required={true}/>
                            <Field name="owner.phone" label="Phone" component={OrderField}/>
                        </Grid>
                        
                        <Grid item sm={4}>
                        {/* <Grid container justify="space-around" > */}
                            <DialogContentText>Product Data</DialogContentText>
                            <Field name="product.name" label="Product Name" component={OrderField} required={true}/>
                            <Field name="product.defect" label="Defect" multiline={true} rows={4} component={OrderField} required={true}/>
                            <FormControl className={classes.formControl} required>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    required
                                    name="product.category"
                                    value={values.product.category}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{
                                    name: 'product.category',
                                    id: 'category', }}>
                                        <MenuItem value="Phone">Phone</MenuItem>
                                        <MenuItem value="Laptop">Laptop</MenuItem>
                                        <MenuItem value="PC">PC</MenuItem>
                                        <MenuItem value="Headphones">Headphones</MenuItem>
                                        <MenuItem value="Keyboard">Keyboard</MenuItem>
                                        <MenuItem value="Mause">Mause</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl> 
                        </Grid>

                        <Grid item sm={4}>
                            {/* <Grid container justify="space-around" > */}
                            <DialogContentText>Repair</DialogContentText>
                            <FormControl className={classes.formControl} >
                                <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                                <Select
                                    required
                                    name="employee"
                                    value={values.employee}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{
                                    name: 'employee',
                                    id: 'employee', }}>
                                        <MenuItem value={0}> None </MenuItem>
                                        {employeeList(employees, divRef)}
                                </Select>
                            </FormControl> 
                            <FormControl className={classes.formControl} >
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    required
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{
                                    name: 'status',
                                    id: 'status', }}>
                                        <MenuItem value="Accepted">Accepted</MenuItem>
                                        <MenuItem value="In Progress">In Progress</MenuItem>
                                </Select>
                            </FormControl> 
                                <Field
                                    className={classes.datecontainer}
                                    id="datetime-local"
                                    type="date"
                                    name="receiptdate"
                                    label="Expected Date of Return"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    component={OrderField}
                                />
                                
                            <pre>
                            {/* {JSON.stringify(errors, null, 2)} */}
                            </pre>
                        </Grid>
                        </Grid>
                        <DialogActions>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </DialogContent>
        </Container>
    );

};