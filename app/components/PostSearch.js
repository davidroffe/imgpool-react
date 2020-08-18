import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setSearch, setPosts } from '../actions';
import apiUtil from '../utils/api';

const mapStateToProps = (state) => {
  return { searchQuery: state.search };
};

export const PostSearch = (props) => {
  const [searchField, setSearchField] = React.useState(props.searchQuery);
  const [submitFlag, setSubmitFlag] = React.useState(false);
  React.useEffect(() => {
    if (props.searchQuery !== searchField || submitFlag) {
      setSearchField(props.searchQuery);
      handleSearch();
    }
  }, [props.searchQuery]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitFlag(true);
    props.dispatch(setSearch(searchField));
  };
  const handleSearch = () => {
    apiUtil.search(props.searchQuery, 1).then((res) => {
      props.dispatch(
        setPosts(
          res.data.list.length
            ? {
                list: res.data.list,
                page: 1,
                totalCount: res.data.totalCount,
              }
            : { list: [false], page: 1, totalCount: 0 }
        )
      );
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
