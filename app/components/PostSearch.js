import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPosts } from '../actions';
import styled from "styled-components";

const StyledForm = styled.form`
  position: relative;
  align-self: flex-end;
  @media (max-width: 720px) {
    width: 100%;
    margin-top: 10px;
  }

  > input {
    height: 40px;
    width: 300px;
    border: none;
    background: rgba(0, 0, 0, 0.6);
    outline: none;
    color: #fffef2;
    padding: 5px 30px 5px 10px;
    font-size: 1.2rem;
    font-family: sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04),
      -6px 8px 15px rgba(0, 0, 0, 0.04), 6px 8px 15px rgba(0, 0, 0, 0.04);
    &::placeholder {
      color: #fffef2;
    }
    @media (max-width: 720px) {
      width: 100%;
    }
  }

  #clear-search {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    border: none;
    background: none;
    outline: none;
    color: #fffef2;
    cursor: pointer;
  }
`;

const mapStateToProps = (state) => {
  return { searchQuery: state.search };
};

export const PostSearch = (props) => {
  const [searchField, setSearchField] = React.useState(props.searchQuery);
  React.useEffect(() => {
    if (props.searchQuery !== searchField) {
      setSearchField(props.searchQuery);
    }
  }, [props.searchQuery]);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(getPosts({ newSearchQuery: searchField })).then(() => {
      props.history.push('/posts');
    });
  };
  const handleChange = (e) => {
    e.preventDefault();
    setSearchField(e.target.value.toLowerCase());
  };
  const clearSearch = (e) => {
    e.preventDefault();

    setSearchField('');

    if (props.searchQuery.length > 0) {
      props.dispatch(getPosts({ newSearchQuery: '' })).then(() => {
        props.history.push('/posts');
      });
    }
  };
  return (
    <StyledForm className="search" onSubmit={handleSubmit}>
      <input
        className="search-field"
        type="text"
        placeholder="Search..."
        value={searchField}
        onChange={handleChange}
      />
      {searchField.length > 0 ? (
        <button id="clear-search" onClick={clearSearch}>
          ✕
        </button>
      ) : null}
    </StyledForm>
  );
};

PostSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps)(PostSearch));
