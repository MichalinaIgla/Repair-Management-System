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


import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Formik } from 'formik';
enzyme.configure({ adapter: new Adapter() });


describe('<Login /> component test', () => {
  let shallow:any;
  let mount:any;
  let wrapper:any;
  before(() => {
    shallow = createShallow();
    mount = createMount();
    wrapper = mount(<Login />);
  });

  // after(() => {
  //   shallow.cleanUp();
  // });
  
  it("renders <Login /> component without crashing", () => {
    shallow(<Login />);
  })

  it('should have an <CardHeader /> title', () => {
    expect(wrapper.find(CardHeader).text()).to.equal('Login to Repair Service');
  })

  it('should have an <TextField/> x 2', () => {
    // const wrapper = mount(<Login />); //.contains(<CardHeader />); 
    // console.log(wrapper.find(wrapper.debug()), " console.log textfield");
    expect(wrapper.find(TextField)).to.have.length(2);
    // const wrapper = shallow(<EmployeesListItem />); 
    // expect(wrapper.find('CardHeader')).to.have.length(2);
    // const component = mount(<EmployeesListItem  headerTitle="Hello"/>)
    // expect(component.find('h4').text()).to.equal("Hello")
  })

  it('should have an <Button /> x 1', () => {
    expect(wrapper.find(Button)).to.have.length(1);
  })
  
  it('should have an <Button /> text', () => {
    expect(wrapper.find(Button).text()).to.equal('Login');
  })

  it('login <Formik />', () => {
    // console.log(wrapper.find(wrapper.find(Formik).find(TextField).debug()), " console.log textfield");
    const UsernameInput = wrapper.find(Formik).find(TextField).at(0);
    UsernameInput.simulate('change', {
      persist: () => {}, 
      target: {
        // name: 'username',
        value: 'Liam',
      }
    })
    // console.log(wrapper.find(wrapper.find(Formik).find(TextField).debug()), " console.log textfield");
    wrapper.find(Button).simulate('click')
    // expect(UsernameInput.value()).to.equal('Liam');
  })
  
})