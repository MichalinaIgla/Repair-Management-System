import { expect } from 'chai';
import enzyme   from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { EmployeesList } from '../src/componentes/employees/EmployeesList';
import {EmployeesListItem} from '../src/componentes/employees/EmployeesListItem';
import { Employees } from '../src/componentes/employees/Employees';
import { Button, Container, Grid, TableCell, TableHead, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import { OrderListItem } from '../src/componentes/orders/OrderListItem';
import { OrderList } from '../src/componentes/orders/OrderList';
import { Orders } from '../src/componentes/orders/Orders';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

enzyme.configure({ adapter: new Adapter() });

describe('<Orders /> commponent test', () => {
  let shallow:any;
  let mount:any;
  let wrapper:any;
  before(() => {
    shallow = createShallow();
    mount = createMount();
    wrapper = mount(<Orders />);
  });

  it("renders <Orders /> component without crashing", () => {
    shallow(<Orders />);
  });

  it("should have an <Grid /> x2 ", () => {
    expect(wrapper.find(Grid)).to.have.length(1);
  });
  
  it("should have an <Container /> x1 ", () => {
    expect(wrapper.find(Container)).to.have.length(1);
  });

  it("should have an <Button /> x1 ", () => {
    expect(wrapper.find(Button)).to.have.length(1);
  });

  it("should have an <Button /> text ", () => {
    expect(wrapper.find(Button).text()).to.equal("Insert Order");
  });

  it("should have an <AddCircleIcon /> x1 ", () => {
    expect(wrapper.find(AddCircleIcon)).to.have.length(1);
  });


})




describe('<OrderList /> component test', () => {
    let shallow:any;
    let mount:any;
    let wrapper:any;

    before(() => {
      shallow = createShallow();
      mount = createMount();
      wrapper = mount(<OrderList employees={[user]} orders={[order]} hadleIfChangedOrderData={()=>{}}/>);
    });
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
    "employee": "",
    "price": 0,
    "description": ""
    
    };

    it("renders <OrderList /> component without crashing", () => {
        shallow(<OrderList employees={[user]} orders={[order]} hadleIfChangedOrderData={()=>{}}/>);
    })

    it("should have an <TableHead /> x1 ", () => {
      expect(wrapper.find(TableHead)).to.have.length(1);
    })

    it("should have an <TableCell /> x7 in TableHead ", () => {
      expect(wrapper.find(TableHead).find(TableRow).find(TableCell)).to.have.length(7);
    })

    it("should have an <TableBody /> x1 ", () => {
        expect(wrapper.find(TableBody)).to.have.length(1);
      })
  })


  
describe('<OrderListItem /> component test', () => {
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
  "id": "0",
  "product": {
      "category": "unitTestCategory",
      "name": "unitTestName",
      "defect": "unitTestDefect"
  },
  "owner":{
      "firstname" : "Alex",
      "lastname": "",
      "phone": "",
      "email": ""
  },
  "receiveddate":  "",
  "receiptdate": "2021-01-07",
  "status": "",
  "employee": "1",
  "price": 0,
  "description": ""
  
  };

    before(() => {
      shallow = createShallow();
      mount = createMount();
      wrapper = mount(<OrderListItem employee={[user]} order={order} hadleIfChangedOrderData={()=>{}}/>);
    });

    it("renders <OrderList /> component without crashing", () => {
        shallow(<OrderListItem employee={[user]} order={order} hadleIfChangedOrderData={()=>{}}/>);
    
    })

    it("should have an <Button /> x2 ", () => {
      expect(wrapper.find(Button)).to.have.length(2);
    })

    it("should have an <TableCell /> x7 ", () => {
      expect(wrapper.find(TableCell)).to.have.length(7);
    })

    it("should have an <TableCell /> category product text data", () => {
      expect(wrapper.find(TableCell).at(1).text()).to.equal("unitTestCategory");
    })

    it("should have an <TableCell /> name product text data", () => {
      expect(wrapper.find(TableCell).at(2).text()).to.equal("unitTestName");
    })

    it("should have an <TableCell /> defect product text data", () => {
      expect(wrapper.find(TableCell).at(3).text()).to.equal("unitTestDefect");
    })

    it("should have an <TableCell /> date of return text data", () => {
      expect(wrapper.find(TableCell).at(4).text()).to.equal("2021-01-07");
    })


  })