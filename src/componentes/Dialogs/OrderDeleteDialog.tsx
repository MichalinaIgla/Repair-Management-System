import { Button, Dialog, DialogTitle } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';

interface Props {
    open: boolean,
    orderID: string
}
export const OrderDeleteDialog:React.FC<Props> = ({open, orderID}) => {
    const [openDeleteDialog, setDeleteDialog] = useState(false);
    console.log(orderID, "tuu id");
    console.log("halo");

    const handleDeleteOrder = () => {
        console.log('delete');
        axios({
            method: 'delete',
            url: 'http://localhost:8081/orders/'+Number(orderID)
          }).then(res => {
              console.log(res);
              if(res.statusText === 'OK'){
                alert("Order Updated");
                window.location.reload(false);
              }
          });
    }

    return(
        <Dialog open={open} onClose={() => setDeleteDialog(false)} aria-labelledby="form-dialog-title" maxWidth='md'>
        <DialogTitle id="form-dialog-title">Are you sure you want to delete this order? {orderID}</DialogTitle>
        <DialogTitle >{orderID}</DialogTitle>
            
                <Button variant="outlined" color="secondary" onClick={handleDeleteOrder}>
                    Certain, without doubt
                </Button>                
                <Button variant="outlined" onClick={() => setDeleteDialog(false)}>
                    Cancel
                </Button>
          
        </Dialog>
    )
}