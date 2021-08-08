import { createContext, useState } from 'react';

export type AppContextType = {
    arrOfParts: string[];
    setArrOfParts: (arrOfParts: string[]) => void;
    tableOfContents: string;
    setTableOfContents: (tableOfContents: string) => void;
    title: string;
    setTitle: (title: string) => void;
    intro: string;
    setIntro: (intro: string) => void;
    contents: string;
    setContents: (contents: string) => void;
    expanded: string | null;
    setExpanded: (part: string | null) => void;
    text: string;
    setText: (text: string) => void;
    toggle: string | null;
    setToggle: (toggle: string) => void;
    search: string;
    setSearch: (search: string) => void;
    searchResult: string[];
    setSearchResult: (searchResult: string[]) => void;
}

export const AppContext = createContext<AppContextType>({
    arrOfParts: [''],
    setArrOfParts: (arrOfParts: string[]) => ({}),
    tableOfContents: '',
    setTableOfContents: (tableOfContents: string) => ({}),
    title: '',
    setTitle: (title: string) => ({}),
    intro: '',
    setIntro: (intro: string) => ({}),
    contents: '',
    setContents: (contents: string) => ({}),
    expanded: '',
    setExpanded: (part: string | null) => ({}),
    text: '',
    setText: (text: string ) => ({}),
    toggle: '',
    setToggle: (toggle: string) => ({}),
    search: '',
    setSearch: (search: string) => ({}),
    searchResult: [],
    setSearchResult: (searchResult: string[]) => ({})
})

export const useAppContext = () => {
    const [arrOfParts, setArrOfParts] = useState<string[]>([]);
    const [tableOfContents, setTableOfContents] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [expanded, setExpanded] = useState<string | null>(null);
    const [text, setText] = useState<string>('');
    const [contents, setContents] = useState<string>('');
    const [intro, setIntro] = useState<string>('');
    const [toggle, setToggle] = useState<string | null>('contents');
    const [search, setSearch] = useState<string>('');
    const [searchResult, setSearchResult] = useState<string[]>([])

    return { arrOfParts, setArrOfParts, tableOfContents, setTableOfContents, title, setTitle, intro, 
        setIntro, expanded, setExpanded, text, setText, contents, setContents, toggle, setToggle,
        search, setSearch, searchResult, setSearchResult }
}
