import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import Pagination from './Pagination';
import { PAGINATION_LIMIT } from '../constants/pageLimit';
import { debounce } from './utils/debounce';
import { request } from './utils/request';

const MainContainer = styled.main`
  padding: 100px 20px; /* Отступы сверху и снизу */
  width: 100vw;
  max-width: 1200px; /* Максимальная ширина контейнера */
  margin: 0 auto; /* Центрирование контейнера */
  box-sizing: border-box;
    display: flex;
    flex-direction: column;
  align-items: center;
  justify-content: center;

`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border: 1px solid #6c5ce7; /* Сиреневая рамка */
  border-radius: 5px;
  padding: 0 15px;
  width: 80%;

  &:focus {
    outline: none;
    border-color: #a29bfe; /* Более светлый оттенок при фокусе */
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 15px;

  &:focus {
    outline: none;
    border: none;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px; /* Расстояние между карточками */
`;

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPge, setLastPage] = useState(1);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    request(`/api/posts?search=${searchValue}&page=${page}&limit=${PAGINATION_LIMIT}`)
    .then(
      ({ data: { posts, lastPage } }) => {
        setPosts(posts);
        setLastPage(lastPage);
      }
    );
  }, [page, shouldSearch]);

  const startDebounedSearch = useMemo(
    () => debounce(setShouldSearch, 2000),
    []
  );

  const onSearch = ({ target }) => {
    setSearchValue(target.value);
    startDebounedSearch(!shouldSearch);
  };

  return (
    <MainContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Поиск по заголовку статьи..."
          value={searchValue}
          onChange={onSearch}
        />
        <i className="fa fa-search" aria-hidden="true"></i>
      </SearchContainer>

      <CardsContainer>
        {posts.length === 0 && <>Нет статей</>}
        {posts.map((post) => {
          return (
            <PostCard
              key={post.id}
              id={post.id}
              imageUrl={post.imageUrl}
              title={post.title}
              publishedAt={post.publishedAt}
              commentsCount={post.comments.length}
            />
          );
        })}
      </CardsContainer>
      {lastPge > 1 && (
        <Pagination
          totalPages={lastPge}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </MainContainer>
  );
};

export default Main;
