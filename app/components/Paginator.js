import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaginatorContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  z-index: 1;
  width: 50px;
  flex-direction: column;
  justify-content: center;

  button {
    background: none;
    border: none;
    margin: 20px 0;
    font-size: 2rem;
    transform: rotate(90deg);
    outline: none;
    z-index: 1;
    &:hover {
      cursor: pointer;
    }
    &.active {
      font-size: 3rem;
    }
  }

  .page-indicator {
    font-size: 2rem;
    text-align: center;
    transform: rotate(90deg);
  }
`;

const Paginator = ({ loading, page, lastPage, changePage }) => {
  return (
    <PaginatorContainer>
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
      {[...Array(2)]
        .map((el, i) => i)
        .reverse()
        .map((el, i) => {
          const pageLink = page - (el + 1);

          if (pageLink < page && pageLink > 0) {
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
    </PaginatorContainer>
  );
};

Paginator.propTypes = {
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default Paginator;
