import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPosts } from '../actions';

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
    <form className="search" onSubmit={handleSubmit}>
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
    </form>
  );
};

PostSearch.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps)(PostSearch));
