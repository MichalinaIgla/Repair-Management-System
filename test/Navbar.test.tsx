import { expect } from 'chai';
import enzyme   from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { NavBar } from '../src/componentes/nav/NavBar';
import {EmployeesListItem} from '../src/componentes/employees/EmployeesListItem';
import { Employees } from '../src/componentes/employees/Employees';
import { AppBar, Container, Drawer, TableCell, TableHead, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import { EmployeesListItemOrder } from '../src/componentes/employees/EmployeesListItemOrder';
// import { Route } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';


describe('<Navbar /> component test', () => {
    let shallow:any;
    let mount:any;
    let wrapper:any;
    let wrapperShallow: any;
    before(() => {
      shallow = createShallow();
      mount = createMount();
      wrapperShallow = shallow(<NavBar />);
      wrapper = mount(<NavBar/>);
    });
  
    // it("renders <NavBar /> component without crashing", () => {
    //   shallow(<Router><NavBar /></Router>);
    // })
  
    // it('should have an <AppBar /> x1', () => {
    //   expect(wrapperShallow.find(AppBar)).to.have.length(1);
    // });
  
  })