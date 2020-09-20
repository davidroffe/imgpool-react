import React from 'react';
import { shallow } from 'enzyme';
import { PostList } from '../PostList';

describe('PostList', () => {
  const mockDispatch = jest.fn();

  it('should render splash section', () => {
    const props = {
      dispatch: mockDispatch,
      posts: {
        list: [false],
        page: 1,
        totalCount: 0,
        loading: false,
      },
    };
    const wrapper = shallow(<PostList {...props} />);

    expect(wrapper.find('#splash')).toHaveLength(1);
  });

  it('should render list item', () => {
    const props = {
      dispatch: mockDispatch,
      posts: {
        list: [
          {
            id: 0,
            userId: 0,
            active: true,
            height: 100,
            width: 100,
            source: 'source',
            url: '/path/to/image.jpeg',
            thumbUrl: '/path/to/thumbnail.jpeg',
            createdAt: '0',
            updatedAt: '0',
            tag: [{ id: 0, name: 'tag_name' }],
            page: 1,
            totalCount: 1,
            loading: false,
          },
        ],
      },
    };
    const wrapper = shallow(<PostList {...props} />);

    expect(wrapper.find('.post-item')).toHaveLength(1);
  });
});
