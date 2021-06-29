import { expect } from 'chai';
import enzyme   from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { EmployeesList } from '../src/componentes/employees/EmployeesList';
import {EmployeesListItem} from '../src/componentes/employees/EmployeesListItem';
import { Employees } from '../src/componentes/employees/Employees';
import { Container, TableCell, TableHead, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import { EmployeesListItemOrder } from '../src/componentes/employees/EmployeesListItemOrder';


describe('<Employees /> component test', () => {
  let shallow:any;
  let mount:any;
  let wrapper:any;
  before(() => {
    shallow = createShallow();
    mount = createMount();
    wrapper = mount(<Employees />);
  });

  it("renders <Employees /> component without crashing", () => {
    shallow(<Employees />);
  })

  it('should have an <Container /> x1', () => {
    expect(wrapper.find(Container)).to.have.length(1);
  });

})



describe('<EmployeesList /> component test', () => {
  let shallow:any;
  let mount:any;
  let wrapper:any;
  const user= {
    "id": "4",
    "username": "Oliver",
    "password": "",
    "firstname": "Oliver",
    "lastname": "Davis",
    "email": "mark@company.com",
    "role": "user"
  };

  before(() => {
    shallow = createShallow();
    mount = createMount();
    wrapper = mount(<EmployeesList Employees={[user]}/>);
  });

  it("renders <EmployeesList /> component without crashing", () => {
    shallow(<EmployeesList Employees={[user]}/>);
  })

  it('should have an <TableBody /> x1', () => {
    expect(wrapper.find(TableBody)).to.have.length(1);
  });

  it('should have <TableCell /> x3 in TableHead', () => {
    expect(wrapper.find(TableHead).find(TableCell)).to.have.length(3);
  });

})





describe('<EmployeesListItem /> component test', () => {

    let shallow:any;
    let mount:any;
    let wrapper:any;
    const user= {
      "id": "4",
      "username": "Oliver",
      "password": "",
      "firstname": "Oliver",
      "lastname": "Davis",
      "email": "mark@company.com",
      "role": "user"
    };
    const order = {
      "id": 0,
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
      "employee": 0,
      "price": 0,
      "description": ""
      
      };
    before(() => {
      shallow = createShallow();
      mount = createMount();
      wrapper = mount(<EmployeesListItem Employee={user}/>);
    });

    it("renders <EmployeesListItem /> component without crashing", () => {
      shallow(<EmployeesListItem Employee={user}/>);
    });

    it('should have an <TableRow /> x 2 ', () => {
      expect(wrapper.find(TableRow)).to.have.length(2);
    });
    
    it('should have an <TbleCell /> x 9 ', () => {
      expect(wrapper.find(TableCell)).to.have.length(4);
    });

});



describe('<EmployeesListItemOrder /> component test', () => {

  let shallow:any;
  let mount:any;
  let wrapper:any;
  const order = {
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
    "employee": null,
    "price": 0,
    "description": ""
    
    };
  before(() => {
    shallow = createShallow();
    mount = createMount();
    wrapper = mount(<EmployeesListItemOrder orders={[order]}/>);
  });

  it("renders <EmployeesListItemOrder /> component without crashing", () => {
    shallow(<EmployeesListItemOrder orders={[order]}/>);
  });

  it('should have an <TableRow /> x 1 ', () => {
    expect(wrapper.find(TableRow)).to.have.length(1);
  });
  
  it('should have an <TableCell /> x 5 ', () => {
    expect(wrapper.find(TableCell)).to.have.length(5);
  });

});

      // const tes1 = test;
      // const Emp = EmployeesListItem;
      // console.log(Emp);
      // console.log(tes1(1, 3));
      // assert.equal(tes1(1, 1), 2);