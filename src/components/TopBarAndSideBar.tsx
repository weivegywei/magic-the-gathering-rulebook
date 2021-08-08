import CssBaseline from '@material-ui/core/CssBaseline';
import { TopBar } from './TopBar';
import { SideBar } from './SideBar';
import styles from './TopBarAndSideBar.module.scss';

type TopBarAndSideBarProp = {
  arrOfParts: string[],
  title: string,
}

export const TopBarAndSideBar = ({arrOfParts, title}: TopBarAndSideBarProp) => {
  const { root } = styles;
  
  return (
    <div className={root}>
      <CssBaseline />
      <TopBar title={title} />
      <SideBar arrOfParts={arrOfParts} />
    </div>
  );
}
