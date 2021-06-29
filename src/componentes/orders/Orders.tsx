import { Container, Grid, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import '../../App.css';
import { Order, User } from '../../types';
import { OrderNewDialog } from '../Dialogs/OrderNewDialog';
import { OrderList } from './OrderList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    AddIcon: {
      '& .MuiSvgIcon-fontSizeLarge': {
        font: '5rem',
      }
    }
  }),
);



export const Orders:React.FC  = () => {

  const [ordersData, setOrdersData] = useState<Array<Order> | null>(null);
  const [openAddOrder, setOpenAddOrder] = useState(false);
  const [ifChangedOrder, setIfChangedOrder] = useState(false);
  const [ifChangedEmployee, setIfChangedEmployee] = useState(false);

  const ifAdmin:boolean = ( JSON.parse(localStorage.getItem('user') || '{}').role  ===  "administrator");
  // const  getOrdersData  = async () => {
  //   // await axios.get<Order[]>("http://localhost:8080/orders").then(res => {
  //   //   console.log(res.data);
  //   //   setOrdersData(res.data);
  //   // });
  //   if(ifAdmin ){
  //     await axios.get("http://localhost:8080/orders").then(res => {
  //       console.log(res.data, " Orders");
  //       setOrdersData(res.data);
  //     });
  //   }else {
  //       const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
  //       const params = {employee: userId.toString()};
  //       await axios.get(`http://localhost:8080/orders`, {params}).then(res => {
  //         console.log(res.data[0]);
  //         if (res.statusText === "OK" ){
  //           setOrdersData(res.data);
  //         }
  //       }); 
      
  //   }
  // }
  // useEffect(() => {
  //   if(!ordersData && ifAdmin ){
  //     axios.get("http://localhost:8080/orders").then(res => {
  //       console.log(res.data, " Orders");
  //       setOrdersData(res.data);
  //     });
      
  //   }else if(!ordersData){
  //     const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
  //     const params = {employee: userId.toString()};
  //     axios.get(`http://localhost:8080/orders`, {params}).then(res => {
  //       console.log(res.data[0]);
  //       if (res.statusText === "OK" ){
  //         setOrdersData(res.data);
  //       }
  //     }); 
  //   }

  // }, [ordersData]);
  const hadleIfChangedOrderData = useCallback(() => {
    setIfChangedOrder(true);
  }, [ifChangedOrder])


  useEffect(() => {
    if(ifAdmin ){
      axios.get("http://localhost:8081/orders").then(res => {
        console.log(res.data, " Orders");
        setOrdersData(res.data);
      });
      
    }else{
        const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
        if (!!userId){
          const params = {employee: userId.toString()};
          axios.get(`http://localhost:8081/orders`, {params}).then(res => {
            if (res.statusText === "OK" ){
              setOrdersData(res.data);
            }
          }); 
        }
      }

    if(!employees){
      axios.get("http://localhost:8081/users").then(res => {
        setEmployees(res.data);
      });
    }
    setIfChangedOrder(false);
  }, [ifChangedOrder]);

  const [employees, setEmployees] = useState<Array<User> | null>(null);
  
  // useEffect(() => {
  //   if(!employees){
  //     axios.get("http://localhost:8081/users").then(res => {
  //       setEmployees(res.data);
  //     });
  //   }
  //   setIfChangedOrder(false);
  // }, [ifChangedOrder]);

  return (
    <div className="Orders">

      <Dialog open={openAddOrder} onClose={() => setOpenAddOrder(false)} aria-labelledby="form-dialog-title" maxWidth='md'>
        <Grid container justify='flex-end'>
          <IconButton onClick={() => setOpenAddOrder(false)}>
            <ClearOutlinedIcon/>
          </IconButton>
        </Grid>
        <OrderNewDialog onSubmit={({product, owner, receiveddate, receiptdate, status, employee, price, description}) => {
          const newOrder = { product, owner, receiveddate, receiptdate, status, employee, price, description};
          console.log(newOrder, "new order");
          axios.post("http://localhost:8081/orders", newOrder).then(res => {
            console.log(res.status === 200);
              alert("Order Created");
              setIfChangedOrder(true);
            
          });
          setOpenAddOrder(false);
        }} />

      </Dialog>

      <Container maxWidth="lg">

      <Grid container justify="flex-end" >
        <Button className="classes.AddIcon" color="primary" size='medium' onClick={() => setOpenAddOrder(true)}>
          <AddCircleIcon fontSize="large" style={{ fontSize: 60 }} /> 
            Insert Order
        </Button>
      </Grid>

        <OrderList orders={ordersData} employees={employees}  hadleIfChangedOrderData={hadleIfChangedOrderData}/>
        
      </Container>
    </div>
  );
}

export default Orders;


