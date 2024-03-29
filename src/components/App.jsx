import { useState, useEffect } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { getImages } from "components/api";
import { LoadMoreButton } from "components/Button/Button";
import { Loader } from "./Loader/Loader";



export const App = () => {

  const [imageName, setImageName] = useState('');
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0)
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageName ) {
      return;
    };

    setLoading(true);

    getImages( imageName, page )
      .then(response => {
        if (response.data.hits.length !== 0) {
          setGallery(prev => [...prev , ...response.data.hits])
          setTotalResult(response.data.total)
        };
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, [imageName, page]);


  const handleFormSubmit = submitedImageName => {
    setImageName(submitedImageName);
    if (submitedImageName !== imageName) {
      setGallery([])
      setPage(1);
    };


  };

  const getNextPage = () => {    
    setPage(prevPage => prevPage + 1)

    setTimeout(() => window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    }), 600)


  };

    return (
      <div>
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery
          gallery={gallery}/>
        <Loader loading={loading} />
        {gallery.length === 0 && imageName && !loading && <h2 style={{margin:'150px auto'}}>Sorry, we couldn't find any result : (</h2> }
        {gallery.length >= 1 && gallery.length < totalResult &&  <LoadMoreButton getNextPage={getNextPage} />}
        {error && <p>{error}</p>}
      </div>
    );
};
