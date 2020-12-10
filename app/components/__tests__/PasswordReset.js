import React from 'react';
import { shallow } from 'enzyme';
import { PasswordReset } from '../PasswordReset';

describe('PasswordReset', () => {
  const mockDispatch = jest.fn();
  const mockSubmit = jest.fn();
  const props = {
    history: { push: () => {} },
    dispatch: mockDispatch,
    match: { params: { passwordResetToken: '' } },
  };
  const wrapper = shallow(<PasswordReset {...props} />);
  const passwordResetForm = wrapper.find('#center-box > form').at(0);

  it('should call handleSubmit on <form /> submit', () => {
    passwordResetForm.simulate('submit', { preventDefault: mockSubmit });
    expect(mockSubmit).toHaveBeenCalled();
  });
});
