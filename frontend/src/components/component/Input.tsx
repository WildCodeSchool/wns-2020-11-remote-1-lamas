import React, { ReactElement } from 'react';
import './input.css';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';

interface TextInputProps {
  label: string;
  name: string;
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value: string;
}

const defaultProps = {
  type: '',
};

const useStyles = makeStyles({
  textField: {
    backgroundColor: '#F1F5F8',
    border: '2px solid #00396A',
    borderRadius: '20px',
    color: '#00396A',
    height: '52px',
    paddingLeft: '15px',
    marginTop: '0px',
    '& input': {
      color: '#00396A',
      fontSize: '14px',
    },
  },
  label: {
    color: '#00396A',
    marginLeft: '15px',
    marginBottom: '5px',
  },
});

const TextInput = ({
  label,
  handleOnchange,
  name,
  type,
  value,
}: TextInputProps): ReactElement => {
  const classes = useStyles();
  return (
    <div className="textInput">
      <InputLabel className={classes.label}>{label}</InputLabel>
      <Input
        fullWidth
        disableUnderline
        name={name}
        type={type}
        value={value}
        className={classes.textField}
        onChange={handleOnchange}
      />
    </div>
  );
};

TextInput.defaultProps = defaultProps;

export default TextInput;
