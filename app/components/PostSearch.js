import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setSearch, setPostsList } from '../actions';
import apiUtil from '../utils/api';

const mapStateToProps = (state) => {
  return { searchQuery: state.search };
};

export const PostSearch = (props) => {
  const [searchField, setSearchField] = React.useState(props.searchQuery);
  React.useEffect(() => {
    setSearchField(props.searchQuery);
    handleSearch();
  }, [props.searchQuery]);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(setSearch(searchField));
  };
  const handleSearch = () => {
    apiUtil.search(props.searchQuery).then((res) => {
      props.dispatch(setPostsList(res.data));
      props.history.push('/posts');
    });
  };
  const handleChange = (e) => {
    setSearchField(e.target.value.toLowerCase());
  };
  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        className="search-field"
        type="text"
        placeholder="Search..."
        value={searchField}
        onChange={handleChange}
      />
    </form>
  );
};

PostSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps)(PostSearch));
