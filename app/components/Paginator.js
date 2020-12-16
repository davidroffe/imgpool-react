import React from 'react';
import PropTypes from 'prop-types';

const Paginator = ({ loading, page, lastPage, changePage }) => {
  return (
    <div className="paginator">
      <button
        className="first"
        disabled={page < 2 || loading}
        onClick={changePage.bind(null, 1)}
      >
        ⇤
      </button>
      <button
        className="previous"
        disabled={page < 2 || loading}
        onClick={changePage.bind(null, 'prev')}
      >
        ←
      </button>
      {[...Array(2)].reverse().map((el, i) => {
        const pageLink = i + 1;

        if (pageLink < page) {
          return (
            <button
              key={i}
              disabled={loading}
              className="number"
              onClick={changePage.bind(null, pageLink)}
            >
              {pageLink}
            </button>
          );
        }
      })}
      <button
        disabled={loading}
        className="number active"
        onClick={changePage.bind(null, page)}
      >
        {page}
      </button>
      {[...Array(2)].map((el, i) => {
        const pageLink = page + (i + 1);

        if (pageLink <= lastPage) {
          return (
            <button
              disabled={loading}
              key={i}
              className="number"
              onClick={changePage.bind(null, pageLink)}
            >
              {pageLink}
            </button>
          );
        }
      })}
      <button
        className="next"
        disabled={lastPage === page || loading}
        onClick={changePage.bind(null, 'next')}
      >
        →
      </button>
      <button
        className="next"
        disabled={lastPage === page || loading}
        onClick={changePage.bind(null, lastPage)}
      >
        ⇥
      </button>
    </div>
  );
};

Paginator.propTypes = {
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Paginator;
