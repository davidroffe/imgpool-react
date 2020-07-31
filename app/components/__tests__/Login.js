/**
 * @jest-environment jsdom
 */

import React from 'react';
import { mount } from 'enzyme';
import Login from '../Login';
import rootReducer from '../../reducers';
import { createStore } from 'redux';

const store = createStore(rootReducer);

describe('Login', () => {
  var root = mount(<Login store={store} history={{}} />);

  it('should update <input id="email" /> value', () => {
    let emailInput = root.find('#email').at(0);
    emailInput.simulate('change', {
      target: { id: 'email', name: 'email', value: 'test@test.com' },
    });
    expect(emailInput.props().name).toEqual('email');
  });

  it('should update <input id="password" /> value', () => {
    let passwordInput = root.find('#password').at(0);
    passwordInput.simulate('change', {
      target: { id: 'password', name: 'password', value: 'testpassword' },
    });
    expect(passwordInput.props().name).toEqual('password');
  });
});
