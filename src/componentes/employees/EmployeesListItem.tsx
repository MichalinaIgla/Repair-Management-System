import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Order, User } from '../../types';
// import './Employees.css';
import { EmployeesListItemOrder } from './EmployeesListItemOrder';
interface EmployeeProps {
    Employee: User
}
const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

export const EmployeesListItem:React.FC<EmployeeProps> = ({Employee}) => {
    const [open, setOpen] = React.useState(false);
    // const [ordersData, setOrdersData] = React.useState<Order[]>([]);
    const [ordersData, setOrdersData] = React.useState<Array<Order> | null>(null);
    const classes = useRowStyles();
    const params = {employee: Employee.id.toString()};

    useEffect(()=> {
        if(!ordersData){
            console.log(params);
            axios.get(`http://localhost:8081/orders/e/`+ Employee.id.toString() , {params})
            .then(res => {
                setOrdersData(res.data);
            }); 
        }
    }, [ordersData])

    const getAmpountOfOrders = (data: Order[] | null) =>{
        if (data !== null)
            return data.length;
        return 0;
    }

    return (
        <React.Fragment>
            
            <TableRow className={classes.root}>
                <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                </TableCell>
                <TableCell  component="th" scope="row">
                    {Employee.firstname} {Employee.lastname}
                </TableCell>
                <TableCell className="number">
                    {getAmpountOfOrders(ordersData)}
                </TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                            Orders
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                            <TableRow>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell align="right">Product</TableCell>
                                <TableCell align="right">Defect</TableCell>
                                <TableCell align="right">Exprected date of return</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <EmployeesListItemOrder orders={ordersData} />
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}