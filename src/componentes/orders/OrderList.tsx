import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import { Order, User } from '../../types';

import { OrderListItem } from './OrderListItem';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

interface OrderListProps {
    orders: Array<Order> | null,
    employees: Array<User> | null,
    hadleIfChangedOrderData: () => void;
}

export const test = (a:number, b:number) => {
    return a + b;
} 

export const OrderList: React.FC<OrderListProps> = ({ orders, employees, hadleIfChangedOrderData }) => {
    const classes = useStyles();

    return(
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" >
            <TableHead>
                <TableRow>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Defect</TableCell>
                    <TableCell align="right">Expected Date of Return</TableCell>
                    <TableCell align="right">Employee</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            
                {orders && orders.map(order => {
                    return <OrderListItem key={order.id} order={order} employee={employees} hadleIfChangedOrderData={hadleIfChangedOrderData} /> //getEmployeeFromOrder(order.employee)
                })}
          
            </TableBody>
        </Table>
    </TableContainer>
    );
    
};