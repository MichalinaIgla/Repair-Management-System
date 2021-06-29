import { Container, createStyles, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputAdornment, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Order, User } from '../../types';
import { EditOrderField } from './Fields/OrderField';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControlRoot: {
        border: "2px solid lightgreen",
        padding: 2,
        marginTop: 10
      },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 255,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '30ch',
        },
      '& #desc': {
        width: '40ch',
      },
      '& .MuiDialogContentText': {
        marginTop: '25px',
        marginBottom: '0px'
        }
    },
    width: {
        '& .MuiTextField-root': {
            width: '93ch',
        }
    },
    datecontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
  }),
);
const defaultOrder = {
    "id": "0",
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
    "receiveddate":  "",
    "receiptdate": "",
    "status": "",
    "employee": "",
    "price": 0,
    "description": ""

};
interface Props {
    onSubmit: (values: Order) => void;
    idOrder: string;
    employee: User[] | null;
  };


export const OrderEditDialog:React.FC<Props> = ({onSubmit, idOrder, employee}) => {

    const classes = useStyles();
    const [initOrder, setInitOrder] = useState<Order>(defaultOrder);
    const ifAdmin:boolean = ( JSON.parse(localStorage.getItem('user') || '{}').role  ===  "administrator");
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

    const params = {id: idOrder.toString()};
    const getOrderData = async () => {
        await axios.get(`http://localhost:8081/orders/`+idOrder.toString() )//, {params})
            .then(res => {
                const data = res.data;
                setInitOrder({
                    ...initOrder,
                    product: {
                        ...initOrder.product,
                        category: data.product.category,
                        name: data.product.name,
                        defect: data.product.defect,
                    },
                    owner: {
                        ...initOrder.owner,
                        firstname: data.owner.firstname,
                        lastname: data.owner.lastname,
                        phone: data.owner.phone,
                        email: data.owner.email,
                    },
                    id: data.id,
                    receiveddate: data.receiveddate.toString(),
                    receiptdate: data.receiptdate.toString(),
                    status: data.status,
                    employee: data.employee,
                    price: data.price,
                    description: data.description
                })
                if (res.statusText !== "OK" ){
                    return( <Container> Error </Container>);
                }
            });
        
    }

    
    useEffect(() => {
        if(initOrder === defaultOrder){
            getOrderData();
        }
    }, [initOrder]);
    

    // console.log("initGO", initOrder);
    return (
        <Container>
            <DialogTitle id="form-dialog-title">Order ID {idOrder}</DialogTitle> 
            <DialogContent>
                <Formik
                    enableReinitialize 
                    initialValues={initOrder}
                    onSubmit={values => onSubmit(values)} 
                    validationSchema={validateSchema}
                >
                    {({values, handleChange, handleBlur}) => (
                    <Form className={classes.root}>
                        <Grid container>

                            <Grid justify="space-around">
                                <DialogContentText className={classes.root}>Customer Data</DialogContentText>
                                <Field name="owner.firstname" label="First Name" component={EditOrderField} required={true} />
                                <Field name="owner.lastname" label="Last Name" component={EditOrderField} required={true}/>
                                <Field name="owner.email" label="Email" component={EditOrderField} type="email" required={true}/>
                                <Field name="owner.phone" label="Phone" component={EditOrderField}/>
                            </Grid>
                            <Grid justify="space-around">
                                <DialogContentText>Product Data</DialogContentText>
                                <Field name="product.name" label="Product Name" component={EditOrderField} required={true}/>
                                <Field name="product.defect" label="Defect" multiline={true} rows={4} component={EditOrderField} required={true}/>
                                <FormControl className={classes.formControl} required>
                                    <InputLabel id="demo-simple-select-label">
                                        Category
                                    </InputLabel>
                                    <Select
                                        required
                                        variant="filled"
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

                            <Grid justify="space-around">
                                {/* <Grid container justify="space-around" > */}
                                <DialogContentText className={classes.root}>Repair</DialogContentText>

        
                                <FormControl className={classes.formControl} required disabled={!ifAdmin}>
                                <InputLabel id="demo-simple-select-disabled-label">
                                    Employee
                                </InputLabel>
                                <Select
                                    // labelId="demo-simple-select-disabled-label"
                                    required
                                    variant="filled"
                                    name="employee"
                                    value={values.employee}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    inputProps={{
                                    name: 'employee',
                                    id: 'employee', }}>
                                        <MenuItem value={0}> None </MenuItem>
                                        {employeeList(employee, divRef)}
                                </Select>
                            </FormControl> 
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">
                                        Status
                                    </InputLabel>
                                    <Select
                                        variant="filled"
                                        name="status"
                                        value={values.status}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                        name: 'status',
                                        id: 'ststus', }}>
                                            <MenuItem value="Accepted">Accepted</MenuItem>
                                            <MenuItem value="In Progress">In Progress</MenuItem>
                                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                                    </Select>
                                </FormControl>
                                <Field name="price" label="Price" component={EditOrderField} startAdornment={<InputAdornment position="end">$</InputAdornment>}/>
                                <FormControl fullWidth className={classes.width} >
                                    <Field name="description" label="Description of repair" component={EditOrderField}/>
                                </FormControl>
                                    <Field
                                        className={classes.datecontainer}
                                        id="datetime-local"
                                        disabled={true}
                                        type="date"
                                        label="Receive Date"
                                        name="receiveddate"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        component={EditOrderField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                    <Field
                                        className={classes.datecontainer}
                                        id="datetime-local"
                                        type="date"
                                        name="receiptdate"
                                        label="Expected Date of Return"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        component={EditOrderField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                    
                                {/* <pre>
                                    {JSON.stringify(values, null, 2)}
                                </pre> */}
                            </Grid>
                        </Grid>

                        <DialogActions>
                        <Button type="submit" color="primary" size="large">
                            Submit
                        </Button>
                    </DialogActions>
                    </Form>
                    
                )}
                </Formik>

            </DialogContent>
        </Container>
        // </Dialog>

    );
};