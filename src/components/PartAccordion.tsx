import { useContext } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AppContext } from '../AppContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import styles from './PartAccordion.module.scss';
import { glossaryAndCredits } from './SideBar';

type PartAccordionProps = {
    part: string,
    handleChange: (part: string) => (event: React.ChangeEvent<{}>, expanded: boolean) => void,
    chapters: string
}

const AccordionSummary = withStyles({
    expanded: {
        minHeight: '0 !important'
    },
    content: {
      '&$expanded': {
        margin: '7px 0'
      }
    }
  })(MuiAccordionSummary);

export const PartAccordion = ({part, handleChange, chapters}: PartAccordionProps) => {
  const {root, heading, list, button, accordion} = styles;
  const { expanded, contents,  setText, setSearch, setSearchResult } = useContext(AppContext);
  
  const chapterList = chapters.split('\n').filter((chapter) => chapter !== '' && chapter !== '\r');

  const handleClick = (chapter: string, idx: number) => {
    if (contents) {
      const endOfChapterIdx = idx === chapterList.length - 1 ? contents.lastIndexOf(glossaryAndCredits[0]) : contents.indexOf(chapterList[idx + 1])
      const chapterContent = contents.substring(contents.indexOf(chapter), endOfChapterIdx);
      setText(chapterContent);
      setSearch('');
      setSearchResult([])
    }
  }

  return (
    <div className={root}>
      <Accordion expanded={expanded === part} onChange={handleChange(part)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className={accordion}>
          <Typography className={heading}>{part}</Typography>
        </AccordionSummary>
        <AccordionDetails className={list}>
            <List className={list}>
            {chapterList.map((chapter, idx) => 
                <ListItem button className={button} key={chapter} onClick={() => handleClick(chapter, idx)}>
                    {chapter}
                </ListItem>
            )}
            </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
