import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../Login';

describe('Login', () => {
  const mockDispatch = jest.fn();
  const mockSubmit = jest.fn();
  const props = {
    history: {},
    dispatch: mockDispatch,
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    userInit: false,
    isLoggedIn: false,
  };
  const wrapper = shallow(<Login {...props} />);
  const loginForm = wrapper.find('#center-box > form').at(0);

  it('should update <input id="email" /> value', () => {
    const emailInput = wrapper.find('#email').at(0);
    emailInput.simulate('change', {
      target: { id: 'email', name: 'email', value: 'test@test.com' },
    });
    expect(mockDispatch).toHaveBeenLastCalledWith({
      type: 'SET_EMAIL',
      value: 'test@test.com',
    });
  });

  it('should update <input id="password" /> value', () => {
    const passwordInput = wrapper.find('#password').at(0);
    passwordInput.simulate('change', {
      target: { id: 'password', name: 'password', value: 'testPassword' },
    });
    expect(mockDispatch).toHaveBeenLastCalledWith({
      type: 'SET_PASSWORD',
      value: 'testPassword',
    });
  });

  it('should call handleSubmit on <form /> submit', () => {
    loginForm.simulate('submit', { preventDefault: mockSubmit });
    expect(mockSubmit).toHaveBeenCalled();
  });
});
