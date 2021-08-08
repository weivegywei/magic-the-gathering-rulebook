import { useContext, ChangeEvent } from 'react';
import { AppContext } from '../AppContext';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { PartAccordion } from './PartAccordion';
import styles from './SideBar.module.scss';

type SideBarProp = {
    arrOfParts: string[];
}

export const glossaryAndCredits = ['Glossary', 'Credits'];

export const SideBar = ({arrOfParts}: SideBarProp) => {
    const { drawer, drawerPaper, drawerContainer, list, drawerItem } = styles;
    const { tableOfContents, setExpanded, setText, contents } = useContext(AppContext);
    
    const handleChange = (part: string) => (_: ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? part : null);
    };

    // To get all chapters names of one part, slice tableOfContents from the index of that part to the index
    //of the next part, remove part name; for the last part, Glossary is the next part.
    const getChapters = (part: string, idx: number) => {
        const endOfChapterIdx = idx === (arrOfParts.length - 1) ? glossaryAndCredits[0] : arrOfParts[idx + 1]
        return tableOfContents.slice(tableOfContents.indexOf(part), 
        tableOfContents.indexOf(endOfChapterIdx)).replace(part, '')
    }

    // To show content of Glossary and Credits, for Credits, slice contents from the last index of Credits 
    //of the contents to the end of the contents
    const handleShow = (part: string, idx: number) => {
        if (contents) {
            const endOfChapterIdx = idx === (glossaryAndCredits.length - 1) ? undefined : contents.indexOf(glossaryAndCredits[idx + 1])
            const partContents = contents.slice(contents.lastIndexOf(part), endOfChapterIdx);
            setText(partContents)
        } 
    }

    return (
        <Drawer className={drawer} variant="permanent" classes={{paper: drawerPaper}}>
            <Toolbar />
            <div className={drawerContainer}>
            <List className={list}>
                {arrOfParts.map((part, idx) => {
                const chapters = getChapters(part, idx);
                return <PartAccordion key={part} part={part} handleChange={handleChange} chapters={chapters} />
                })}
            </List>
            <List>
                {tableOfContents ? glossaryAndCredits.map((part, idx) => (
                <ListItem button key={part} className={drawerItem} onClick={() => handleShow(part, idx)}>
                    {part}
                </ListItem>
                )): null}
            </List>
            </div>
        </Drawer>
    )
}
