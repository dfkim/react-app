import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';

import { green, red } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import RemoveIcon from '@material-ui/icons/Remove';
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
  let arrowIcon = <ArrowDownwardIcon style={{ color: green[500] }} />;
  // console.log(symbolData.changePrice)
  if (symbolData.changePrice > 0) {
    arrowIcon = <ArrowUpwardIcon style={{ color: red[500] }} />;
  } else if (symbolData.changePrice === '---') {
    arrowIcon = <RemoveIcon style={{ color: green[500] }} />;
  }
  //const quotes = ["initial", "inherit", "primary", "secondary", "textPrimary", "textSecondary", "error"];
  //const random = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title={symbolData.symbolCode}
        subheader={symbolData.time}
        onClick={event => onClick(event, symbolData)}
      ></CardHeader>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
              component="div"
            >
              {symbolData.symbolName}
            </Typography>

            <NumberFormat
              value={symbolData.stoksPrice}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'¥'}
            />
          </Grid>
        </Grid>
        <Box display="flex" alignItems="center">
          {arrowIcon}
          <Typography className={classes.differenceValue} variant="body2">
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
