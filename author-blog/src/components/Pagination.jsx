import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px 15px;
  margin: 0 5px;
  background-color: ${({ active }) =>
    active ? '#6c5ce7' : '#ffffff'};
  color: ${({ active }) => (active ? '#ffffff' : '#6c5ce7')};
  border: 2px solid #6c5ce7;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: #a29bfe;
    color: #ffffff;
  }
`;

const Pagination = ({
  totalPages,
  currentPage = 1,
  onPageChange = () => {},
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <PaginationContainer>
      {pages.map((page) => (
        <PageButton
          key={page}
          active={page === currentPage ? 'true' : null}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
