import './App.scss';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { TopBarAndSideBar } from './components/TopBarAndSideBar';
import { AppContext, useAppContext } from './AppContext';
import { TextArea } from './components/TextArea';

export const AppWrapper = () => 
  <AppContext.Provider value={useAppContext()}>
    <App />
  </AppContext.Provider>

const App = () => {
  const { arrOfParts, setArrOfParts, setTableOfContents, title, setTitle, setContents, intro, searchResult, 
    setIntro, text } = useContext(AppContext);

  const getArrOfParts = (newTableOfContents: string) => {
    let arrayOfParts = [];
    let partsSerialNum = newTableOfContents.match(/\D\d[.]|\D\d\d[.]/g);
    if (partsSerialNum) {
      for (const [idx, val] of partsSerialNum.entries()) {
        let partTitle = newTableOfContents.slice(newTableOfContents.indexOf(val), 
        newTableOfContents.indexOf(`${idx + 1}00.`));
        arrayOfParts.push(partTitle)
      }
    }
    return setArrOfParts(arrayOfParts);
  }

  useEffect(() => {
    const fetchRuleBook = async() => {
      const res = await axios.get('other/rulebook');
      if(res && res.data.body) {
        const doc = res.data.body;
        const newTableOfContents = doc.slice(doc.indexOf('Contents'), doc.indexOf('Credits') + 7);
        const newTitle = doc.slice(0, doc.indexOf('\r'))
        setTableOfContents(newTableOfContents);
        setTitle(newTitle);
        getArrOfParts(newTableOfContents);
        setContents(doc.replace(newTableOfContents, ''));
        setIntro(doc.substring(0, doc.indexOf(newTableOfContents)).replace(newTitle, ''));
      }
    }
    fetchRuleBook();
  }, [])

const textToShow = searchResult.length ? searchResult : text.length ? text : intro

  return (
    <>
      <TopBarAndSideBar arrOfParts={arrOfParts} title={title} />
      <main className='content'>
        <TextArea param={textToShow} />
      </main>
    </>
  );
}

