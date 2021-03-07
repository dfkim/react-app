import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
  Link,
} from '@material-ui/core';

import { green, red } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const Stock = ({ className, symbolData, onClick, ...rest }) => {
  const classes = useStyles();
  let arrowIcon = <ArrowDownwardIcon style={{ color: green[500] }}/>;
  if(symbolData.changePrice > 0){
    arrowIcon = <ArrowUpwardIcon style={{ color: red[500] }}/>
  }
  //const colors = ["background-color: #db5902;","background-color: #3a5d5d;","background-color: #ab764d;","background-color: #173965;","background-color: #d91533;","background-color: #5a808c;","background-color: #737373;","background-color: #323232;","background-color: #393939;","background-color: #fff;","background-color: #5a9001;","background-color: #4267B2;","background-color: #0156b9;","background-color: #e20712;"]
  const quotes = ["initial", "inherit", "primary", "secondary", "textPrimary", "textSecondary", "error"];
  const random = quotes[Math.floor(Math.random() * quotes.length)];
 // const colorRandom = colors[Math.floor(Math.random() * colors.length)];
  //console.log(colorRandom)
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
         
            <Typography
              gutterBottom
              variant="h6"
            > 
              <Link href="#"  color={random} onClick={event => onClick(event, symbolData)} >
              {symbolData.symbolCode}
              </Link>
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {symbolData.symbolName}
             
            </Typography>
            
            <NumberFormat value={symbolData.stoksPrice} displayType={'text'} thousandSeparator={true} prefix={'¥'} />
          </Grid>
         
        </Grid>
        <Box  
          display="flex"
          alignItems="center">
        {arrowIcon}
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            {symbolData.changePersent}
          </Typography>
          
          </Box>
      </CardContent>
    </Card>
  );
};

Stock.propTypes = {
  className: PropTypes.string,
  symbolData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired

};

export default Stock;
