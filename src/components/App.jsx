import React, { useState, useEffect } from 'react';
import Btn from './Btn';
import ImgGallery from './ImgGallery';
import './App.css';
import { fetchImgs } from '../FetchImgs/FetchImgs';
import SearchBar from './SearchBar';
import Notiflix from 'notiflix';
import Loader from './Loader';

function App() {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (inputData.trim() === '') {
      return;
    }

    const fetchImages = async () => {
      try {
        setStatus('pending');
        const { totalHits, hits } = await fetchImgs(inputData, page);
        if (hits.length < 1) {
          setStatus('idle');
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        setTotalHits(totalHits);
        setItems(prevItems => [...prevItems, ...hits]);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
      }
    };

    fetchImages();
  }, [inputData, page]);

  const handleSubmit = inputData => {
    if (inputData.trim() === '') {
      Notiflix.Notify.info('You cannot search by an empty field, try again.');
    } else {
      setInputData(inputData);
      setPage(1);
      setItems([]);
    }
  };

  const onNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSubmit} />
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <p>Something went wrong, try again later.</p>}
      {items.length > 0 && <ImgGallery page={page} items={items} />}
      {totalHits > 12 && totalHits > items.length && (
        <Btn onClick={onNextPage} />
      )}
    </div>
  );
}

export default App;
