import { useContext } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import styles from './ToggleBox.module.scss';
import { AppContext } from '../AppContext';

export const ToggleBox = () => {
  const { buttonGroup, button, selectedButton } = styles;
  const { toggle, setToggle, text } = useContext(AppContext)

  const handleToggle = (_: React.MouseEvent<HTMLElement>, newToggle: string) => {
    setToggle(newToggle);
  };

  return (
    <ToggleButtonGroup
      value={toggle}
      exclusive
      onChange={handleToggle}
      className={buttonGroup}
    >
      <ToggleButton value="contents" className={button} classes={{selected: selectedButton}}>
        all
      </ToggleButton>
      <ToggleButton value="text" className={button} disabled={text ? false : true} 
        classes={{selected: selectedButton}}>
        <div>chapter</div>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
