import { useState } from "react";
import { ImSearch } from "react-icons/im"
import PropTypes from 'prop-types';
import { SearchbarWrapper } from "./SearchbarWrapper.styled";


export const SearchBar = ({onSubmit}) => {

    const [imageName, setImageName] = useState('')

    const handleSubmit = (e) => {
 
        e.preventDefault();

        if (imageName.trim() === '') {
            alert('Enter something')
            return
        }

        onSubmit(imageName)
        
        setImageName('')
    }

    return (
        <SearchbarWrapper>
            <form className="SearchForm" onSubmit={handleSubmit}>
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label"><ImSearch/></span>
                </button>

                <input
                    onChange={e => setImageName(e.currentTarget.value)}
                    value={imageName}
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </SearchbarWrapper>
    );
};

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}