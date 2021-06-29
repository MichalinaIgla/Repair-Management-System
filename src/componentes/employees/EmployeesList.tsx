import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../../types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import './Employees.css';
import { EmployeesListItem } from './EmployeesListItem';

interface EmployeesListProps {
    Employees: Array<User> | null
}


export const EmployeesList:React.FC<EmployeesListProps> = ({Employees}) => {

    return (
    <TableContainer component={Paper} >
        <Table aria-label="collapsible table" className="TableContainer">
          <TableHead>
            <TableRow>
            <TableCell />
              <TableCell >Name</TableCell>
              <TableCell >Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Employees && Employees.map( Employee => {
                return <EmployeesListItem  key={Employee.id} Employee={Employee}/>
            })}
          </TableBody>
        </Table>
    </TableContainer>
    
    );
}