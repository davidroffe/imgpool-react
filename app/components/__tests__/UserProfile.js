import React from 'react';
import { shallow } from 'enzyme';
import { UserProfile } from '../UserProfile/index';

describe('UserProfile', () => {
  const mockDispatch = jest.fn(() => {});
  const preventDefault = jest.fn();
  const props = {
    history: { push: () => {} },
    match: {
      params: {
        id: 1,
      },
    },
    dispatch: mockDispatch,
    userInit: true,
    loggedIn: true,
    admin: false,
  };
  const wrapper = shallow(<UserProfile {...props} />);

  it('should call handleFavoritesClick', () => {
    const optionsMenu = wrapper.find('.favorites > button').at(0);
    optionsMenu.simulate('click', {
      preventDefault,
    });
    expect(mockDispatch.mock.calls.length).toEqual(1);
  });

  it('should call handlePostsClick', () => {
    const optionsMenu = wrapper.find('.posts > button').at(0);
    optionsMenu.simulate('click', {
      preventDefault,
    });
    expect(mockDispatch.mock.calls.length).toEqual(2);
  });
});
