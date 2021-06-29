import { Container, Dialog, DialogContentText, DialogTitle, Grid, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Order, User } from '../../types';
import { OrderDisplayDialog } from '../Dialogs/OrderDisplayDialog';
import { OrderEditDialog } from '../Dialogs/OrderEditDialog';

const useStyles = makeStyles({
    accepted: {
        // background: 'linear-gradient(45deg, #6BFE9F 30%, #ACF59F 90%)',
        backgroundColor: '#02BD62',
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(105, 255, 137, .3)',
        color: 'white',
        // height: 48,
        padding: '0 30px',
    },
    inProgres: {
        // background: 'linear-gradient(45deg, #FDCB5AD4 30%, #FFEB3B 90%)',
        backgroundColor: '#F19B24',
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
      },
      cancelled: {
        // background: 'linear-gradient(45deg, #FDCB5AD4 30%, #FFEB3B 90%)',
        backgroundColor: '#46333A',
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(121, 121, 121, .3)',
        color: 'white',
        padding: '0 30px',
      },
  });


interface ProductProps {
    order: Order,
    employee: User[] | null,
    hadleIfChangedOrderData: () => void;
}

export const OrderListItem: React.FC<ProductProps> = ({order, employee, hadleIfChangedOrderData}) => {
    const [openEditDialog, setEditDialog] = useState(false);
    const [openDeleteDialog, setDeleteDialog] = useState(false);
    const [openDisplayDialog, setDisplayDialog] = useState(false);
    // const [employeeData, setemployeeData] = useState<string | null>("");
    const [employeeUser, setEmployeeUser] = useState<User>();
    const classes = useStyles();
    const orderID = String(order.id);

    useEffect(() => {
        employee && employee.forEach((User: User) =>{
            if (User.id === order.employee){;
                setEmployeeUser(User);
            }
        })
    }, [employee]);

    const handleOpenEditDialog = () => {
        setEditDialog(!openEditDialog);
    };

    const handleOpenDeleteDialog = () => {
        setDeleteDialog(!openDeleteDialog);
    };

    const handleDeleteOrder = () => {
      axios({
          method: 'delete',
          url: 'http://localhost:8081/orders/'+ order.id.toString()
        }).then(res => {
            console.log(res);
            if(res.statusText === 'OK'){
              alert("Order Deleted");
            //   window.location.reload(false);
              hadleIfChangedOrderData();
              setDeleteDialog(false);
            }
        });
    };

    const handleColorStatus = (s:string) => { //(order.status === 'In Progress')? classes.inProgres: classes.accepted
        if(s === 'In Progress'){
            return classes.inProgres;
        } else if(s === 'Accepted'){
            return classes.accepted;
        } else{
            return classes.cancelled;
        }
    }
    

    return(

        <TableRow key={order.id}>
            <TableCell align="center"  component="th" scope="row">
                <Container className={handleColorStatus(order.status)}>{order.status}</Container>
            </TableCell>
            <TableCell align="right">{order.product.category}</TableCell>
            <TableCell align="right">{order.product.name}</TableCell>
            <TableCell align="right">{order.product.defect}</TableCell>
            <TableCell align="right">{order.receiptdate}</TableCell>
            <TableCell align="right">{employeeUser?.firstname} {employeeUser?.lastname}</TableCell>
            <TableCell align="center" >

                <Button variant="outlined" color="primary" size='medium' onClick={handleOpenEditDialog}>
                    <BorderColorIcon  />
                </Button>
                
                <Button variant="outlined" size='medium' color="default"  onClick={handleOpenDeleteDialog}>
                    <DeleteOutlinedIcon />
                </Button>

            </TableCell>

            <Dialog open={openEditDialog} onClose={() => setEditDialog(false)} aria-labelledby="form-dialog-title" maxWidth='md'>
                <Grid container justify='flex-end'>
                    <IconButton onClick={() => setEditDialog(false)}>
                        <ClearOutlinedIcon />
                    </IconButton>
                </Grid>
                <OrderEditDialog  idOrder={order.id.toString()} employee={employee}  onSubmit={({product, owner, receiveddate, receiptdate, status, employee, price, description} ) => {
                    console.log(owner, receiveddate, receiptdate, status, employee, price, description);
                    axios({
                        method: 'put',
                        url: 'http://localhost:8081/orders/'+order.id,
                        data: {
                           product, owner, receiveddate, receiptdate, status, employee, price, description
                        }
                      }).then(res => {
                          if(res.statusText === 'OK'){ // change to  status 200
                            alert("Order Updated");
                            hadleIfChangedOrderData();
                          }
                      });
                      
                    setEditDialog(false);
                    }} 
                />
            </Dialog>

            <Dialog open={openDeleteDialog} onClose={() => setDeleteDialog(false)} aria-labelledby="form-dialog-title" maxWidth='md'>
                <DialogTitle id="form-dialog-title">Are you sure you want to delete this order?</DialogTitle>
                <DialogContentText align="center">ID {orderID}  {order.product.name}</DialogContentText>
                    <Button variant="outlined" color="primary" onClick={handleDeleteOrder}>
                        Certain, without doubt
                    </Button>                
                    <Button variant="outlined" onClick={() => setDeleteDialog(false)}>
                        Cancel
                    </Button>
            </Dialog>

            
        </TableRow>
)};
