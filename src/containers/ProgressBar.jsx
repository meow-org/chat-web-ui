import { makeStyles } from '@material-ui/core/styles';
import React from 'react';


const useProgressBarStyles = makeStyles(theme => ({
 progressBar:{
     animationDuration: '1s',
     animationName: '$fade',
     animationIterationCount: 'infinite',
     animationDirection: 'alternate',
     strokeWidth: '30px',
     animationTimingFunction: 'easeIn',
     backgroundColor: 'black',
     width: '100%',
     height: '100%',
     padding: '80px',
     position: 'absolute',
     zIndex:2,
    },

'@keyframes fade': {
  'from': {
    opacity: '50%',
    fillOpacity:'25%',
    stroke:'grey',
    fill: 'grey',
    strokeDasharray: 300,
    strokeDashoffset: 400,
  },
  'to': {
    opacity:'100%',
    fillOpacity:'70%',
    stroke: 'white',
    fill: 'white',
    strokeDashoffset: 0,
    strokeDasharray:1200,
  },
},

}));




const ProgressBar = (loading) => {
      const classes = useProgressBarStyles();
      if(loading){
      return (
          <svg className={classes.progressBar} width="100" height="100" viewBox="260 100 390 330">
            <path d="M 280 120 L 370 170 Q 460 120 550 170 L 630 110 L 610 250 Q 570 390 460 410 Q 330 380 310 260 Z"></path>
          </svg>)
      }else{
          return
      };}

    /*
    return (<div className = {classes.progressBar}>FUUUUUUCCCCCCKIIIINGSHIIIIIIT</div>);
    }
     */
     

export default ProgressBar;