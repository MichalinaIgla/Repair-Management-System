import { expect } from 'chai';
import enzyme   from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { OrderList, test } from '../src/componentes/orders/OrderList';
import {Login} from '../src/componentes/login/Login';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { OrderNewDialog } from '../src/componentes/Dialogs/OrderNewDialog'


import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Field, Formik } from 'formik';
import { DialogContentText, DialogTitle, FormControl, Select } from '@material-ui/core';
import { OrderEditDialog } from '../src/componentes/Dialogs/OrderEditDialog';
enzyme.configure({ adapter: new Adapter() });

describe('<OrderNewDialog />  component test', () => {
    let shallow:any;
    let mount:any;
    let submit:any;
    let wrapper:any;
    before(() => {
      shallow = createShallow();
      mount = createMount();
      wrapper = mount(<OrderNewDialog onSubmit={submit}/>);
    });
  
    it("renders <OrderNewDialog /> component without crashing", () => {
        shallow(<OrderNewDialog onSubmit={submit}/>);
      });

    it("Should have <DialogTitle /> title", () => {
        expect(wrapper.find(DialogTitle).text()).to.equal('New Order');
    });

    it("Should have <DialogContentText /> x3", () => {
        expect(wrapper.find(DialogContentText)).to.have.length(3);
    });

    it("Should have <Field /> x7", () => {
        expect(wrapper.find(Field)).to.have.length(7);
    });

    it("Should have <Select /> x3", () => {
        expect(wrapper.find(Select)).to.have.length(3);
    });

    it("Should have <Formik /> x1", () => {
        expect(wrapper.find(Formik)).to.have.length(1);
    });

    it("Should have <DialogContentText /> x1 title 'Customer Data'", () => {
        expect(wrapper.find(DialogContentText).at(0).text()).to.equal('Customer Data');
    });

    it("Should have <DialogContentText /> x2 title 'Product Data'", () => {
        expect(wrapper.find(DialogContentText).at(1).text()).to.equal('Product Data');
    });

    it("Should have <DialogContentText /> x2 title 'Repair'", () => {
        expect(wrapper.find(DialogContentText).at(2).text()).to.equal('Repair');
    });

    it("Should have <Bitton /> x1'", () => {
        expect(wrapper.find(Button)).to.have.length(1);
    });
})



// describe('<OrderEditDialog />  component test', () => {
//     let mount:any;
//     let shallow:any;
//     let submit:any;
//     let wrapper:any;
//     const user= {
//         "id": 4,
//         "username": "Oliver",
//         "password": "",
//         "firstname": "Oliver",
//         "lastname": "Davis",
//         "email": "mark@company.com",
//         "role": "user"
//       };
//     before(() => {
//         shallow = createShallow();
//         mount = createMount();
//         wrapper = mount(<OrderEditDialog idOrder={2} employee={[user]} onSubmit={() => {}}/>);
//       });
    

//     it("renders <DialogContentText /> x2 component without crashing", () => {
//         shallow(<OrderEditDialog idOrder={2} employee={[user]} onSubmit={() => {}}/>);
//     });

// })