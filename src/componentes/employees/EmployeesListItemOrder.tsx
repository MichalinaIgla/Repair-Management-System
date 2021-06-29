import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { Order } from '../../types';
interface EmployeesOrderProps {
    orders: Array<Order> | null
}


export const EmployeesListItemOrder:React.FC<EmployeesOrderProps> = ({orders}) => {
    return (
        <>
        {orders && orders.map((order) => { 
            return (
                <TableRow key={order.id}>
                    <TableCell>
                        {order.owner.firstname} {order.owner.lastname}
                    </TableCell>
                    <TableCell>
                        {order.owner.email} 
                    </TableCell>
                    <TableCell align="right">
                        {order.product.name} 
                    </TableCell>
                    <TableCell align="right">
                        {order.product.defect} 
                    </TableCell>
                    <TableCell align="right">
                        {order.receiptdate} 
                    </TableCell>
                 </TableRow>
            )})}

       </>
    );
}
