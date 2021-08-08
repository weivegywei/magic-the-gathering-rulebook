import { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { SearchBox } from './SearchBox';
import { AppContext } from '../AppContext';
import styles from './TopBar.module.scss';

type TopBarProp = {
  title: string
}

export const TopBar = ({title}: TopBarProp) => {
  const { setText, setSearchResult } = useContext(AppContext);
  const { appBar, toolBar, home } = styles;

  const handleClear = () => {
    setText('');
    setSearchResult([])
  }

    return (
        <AppBar position="fixed" className={appBar}>
        <Toolbar className={toolBar}>
          <Typography variant="h6" noWrap onClick={handleClear} className={home}>
            {title}
          </Typography>
          <SearchBox />
        </Toolbar>
      </AppBar>
    )
}

