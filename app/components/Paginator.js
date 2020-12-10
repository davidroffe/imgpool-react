import React from 'react';
import PropTypes from 'prop-types';

const Paginator = ({ loading, page, lastPage, changePage }) => {
  return (
    <div className="paginator">
      <button
        className="previous"
        disabled={page < 2 || loading}
        onClick={changePage.bind(null, 'prev')}
      >
        ←
      </button>
      {page >= 6 ? (
        <button
          disabled={loading}
          className="number"
          onClick={changePage.bind(null, 1)}
        >
          1
        </button>
      ) : null}

      {[...Array(5)].map((el, i) => {
        const pageLink = page - (i + 1);

        if (pageLink > 0) {
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
      {[...Array(5)].map((el, i) => {
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
      {page <= lastPage - 6 ? (
        <button
          disabled={loading}
          className="number"
          onClick={changePage.bind(null, lastPage)}
        >
          {lastPage}
        </button>
      ) : null}
      <button
        className="next"
        disabled={lastPage === page || loading}
        onClick={changePage.bind(null, 'next')}
      >
        →
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
