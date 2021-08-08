import { ChangeEvent, useContext } from 'react';
import styles from './SearchBox.module.scss'
import { AppContext } from '../AppContext';
import { ToggleBox } from './ToggleBox';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

export const SearchBox = () => {
    const { form, input, button } = styles;
    const { text, search, setSearch, toggle, contents, setSearchResult } = useContext(AppContext);
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    const capitalizing = (search: string) => 
        search.charAt(0).toUpperCase() + search.slice(1).toLowerCase()

    //search keyword in different scopes according to toggle type
    const handleSearch = () => {
        const searchScope = toggle === 'contents' ? contents : text;
        let rules = searchScope.split('\r\n').filter((rule) => rule !== '' && rule !== '\r');
        let matches = rules.filter((rule) => 
            rule.includes(search) || rule.includes(capitalizing(search)) || 
            rule.includes(search.toUpperCase()) || rule.includes(search.toLowerCase()));
        setSearchResult(matches) 
    }

    return (
        <div>
            <form noValidate autoComplete="off" className={form}>
                <input 
                    type='text' 
                    value={search}
                    className={input}
                    placeholder={toggle === 'text' ? 'Search a keyword from selected chapter' : 
                        'Search a keyword in the book'}
                    onChange={handleChange}
                ></input>
                <div >
                <Button  className={button} disableElevation onClick={handleSearch}>
                    <SearchIcon />
                </Button>
                </div>
                <ToggleBox />
            </form>
        </div>
    )
}

