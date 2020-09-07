import React from 'react';
import { shallow } from 'enzyme';
import { PostSingle } from '../PostSingle';

describe('PostSingle', () => {
  const mockDispatch = jest.fn();
  const stopPropagation = jest.fn();
  const props = {
    history: {},
    match: {
      params: {
        id: 1,
      },
    },
    dispatch: mockDispatch,
    isAdmin: false,
    userId: 1,
    userFavorites: [],
    optionsMenu: false,
  };
  const wrapper = shallow(<PostSingle {...props} />);

  it('should update menu state', () => {
    const optionsMenu = wrapper.find('.toggle-options').at(0);
    optionsMenu.simulate('click', {
      stopPropagation,
    });
    expect(mockDispatch).toHaveBeenLastCalledWith({
      type: 'SET_POST_OPTIONS_MENU',
      state: true,
    });
  });
});
