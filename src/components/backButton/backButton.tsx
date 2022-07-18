
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

// import { makeStyles } from '@mui/styles';
// const useStyles = makeStyles({
//   root: {
//     borderBlockColor: 'white',
//     color: 'white',
//     height: 130,
//     width:130,
//     padding: '0 30px',
//     position: 'absolute',
//     left: 12
//   },
// });

const BackButton: React.FC = () => {
//   const classes = useStyles();
  const navigate = useNavigate();
  const back = (event: React.MouseEvent) => {
    navigate('/')
  }
  return <>
  {/* className={classes.root} */}
    <ArrowCircleLeftIcon onClick={back}  />
  </>;
}

export default BackButton;