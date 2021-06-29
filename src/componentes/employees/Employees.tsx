import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EmployeesList } from './EmployeesList';
import { User } from '../../types';
import { Container } from '@material-ui/core';
import './Employees.css';
import 'mock-local-storage';

export const Employees:React.FC = () => {
    const [employeesData, setEmployeesData] = useState(null);
    const ifAdmin:boolean = ( JSON.parse(localStorage.getItem('user') || '{}').role  ===  "administrator");

    useEffect(() => {
      if(!employeesData && ifAdmin){
        axios.get("http://localhost:8081/users").then(res => {
          setEmployeesData(res.data);
        });
      } else if(!employeesData){
        const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
        if (!!userId){
          const params = {id: userId.toString()};
          axios.get(`http://localhost:8081/users`, {params}).then(res => {
            // console.log(res.data[0]);
            if (res.statusText === "OK" ){
              setEmployeesData(res.data);
            }
          });
        }
 
      }
    }, []);
  

    console.log(employeesData);
    return (
    <Container maxWidth="lg" className="EmployeeContainer">
        <>
          {/* { role ? <EmployeesList Employees={employeesData}/> :null} */}
          <EmployeesList Employees={employeesData}/>
        </>

    </Container>
    );
}