import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

interface TextInputProps {
  label: string;
  handleClick: () => void;
}

const useStyles = makeStyles({
  button: {
    color: '#00396A',
    backgroundColor: 'white',
    boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    fontStyle: '800',
    marginBottom: '2em',
    textTransform: 'none',
    borderRadius: '10px',
  },
});

const ButtonDashboard = ({
  label,
  handleClick,
}: TextInputProps): ReactElement => {
  const classes = useStyles();

  return (
    <div className="button">
      <Button type="submit" onClick={handleClick} className={classes.button}>
        {label}
      </Button>
    </div>
  );
};

export default ButtonDashboard;
