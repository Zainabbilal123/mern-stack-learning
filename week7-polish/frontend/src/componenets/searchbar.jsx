import { useState } from 'react';
import useDebounce from '../hooks/usedebounce';
import {  useEffect } from 'react';

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState('');
    const debouncedTerm = useDebounce(term, 400);

    useEffect(() => {
        onSearch(debouncedTerm);
    }, [debouncedTerm, onSearch]);

    return (
        <input
            type="text"
            placeholder="Search posts..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            style={{ width: '300px', padding: '10px' }}
        />
    );
}

export default SearchBar;