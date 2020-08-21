import React from 'react';
import { shallow } from 'enzyme';
import { TagMenu } from '../TagMenu';

describe('TagMenu', () => {
  const mockDispatch = jest.fn();
  const props = {
    history: { push: () => {} },
    dispatch: mockDispatch,
    showMenu: false,
    tags: [{ id: 0, active: false, name: 'test_tag' }],
    posts: [],
    searchQuery: [''],
  };
  const wrapper = shallow(<TagMenu {...props} />);

  it('Should update tag menu state', () => {
    const menuToggle = wrapper.find('.tab').at(0);
    menuToggle.simulate('click', {
      preventDefault: () => {},
    });
    expect(mockDispatch).toHaveBeenLastCalledWith({
      type: 'SET_TAGS_MENU',
      state: true,
    });
  });

  it('Should update search query state', () => {
    const tagLink = wrapper.find('.tag').at(0);
    tagLink.simulate('click', {
      target: { innerText: 'test_tag' },
      preventDefault: () => {},
    });
    expect(mockDispatch).toHaveBeenLastCalledWith({
      type: 'SET_SEARCH',
      text: 'test_tag',
    });
  });
});
