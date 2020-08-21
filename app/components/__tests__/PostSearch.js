import React from 'react';
import { shallow } from 'enzyme';
import { PostSearch } from '../PostSearch';

describe('PostSearch', () => {
  var wrapper;
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <PostSearch
        searchQuery={''}
        history={{}}
        dispatch={() => {}}
        handleSearch={mockHandleSubmit}
      />
    );
  });

  it('should update <input /> value', () => {
    const searchField = wrapper.find('.search-field').at(0);
    searchField.simulate('change', {
      preventDefault: mockHandleChange,
      target: { value: '' },
    });
    expect(mockHandleChange.mock.calls.length).toEqual(1);
  });

  it('should call handleSearch on <form /> submit', () => {
    wrapper.simulate('submit', { preventDefault: mockHandleSubmit });
    expect(mockHandleSubmit.mock.calls.length).toEqual(1);
  });
});
