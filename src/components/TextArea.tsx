import { AppContext } from '../AppContext';
import { useContext } from 'react';
import styles from './TextArea.module.scss';
const reactStringReplace = require('react-string-replace')

type TextAreaProp = {
    param: string | string[]
}

export const TextArea = ({param}: TextAreaProp) => {
    const { search } = useContext(AppContext);
    const { ruleDiv, chapterTitle, textArea } = styles;
    const regexpSearch = new RegExp(`(${search})`, 'gi');

    return (
        typeof(param) === 'string' ?
        <div className={textArea}>
          {param.split('\r\n').filter(rule => rule).map((rule, idx) =>
          <div key={rule + idx} className={ruleDiv}>
          {idx === 0 ? <b className={chapterTitle}>{rule}</b> : rule}
          </div>
          )}
        </div> : 
        <div className={textArea}>
          {param.map((rule, idx) => 
          <div key={rule + idx} className={ruleDiv}>
          {reactStringReplace(rule, regexpSearch, (match: string, i: number, offset: any) => 
              <b>{match}</b>)}
          </div>
          )}
        </div>
    )
}

// Param can be string when it is 'text' or 'intro', or array of strings when it is 'searchResult', therefore 
//the rendering needs to be handled differently.
// reactStringReplace is for making the search keyword bold