import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';

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

const CoinBucket = ({ className, symbolData, onClick, ...rest }) => {
  const orgFloor = (value, base) => {
    return Math.floor(value * base) / base;
  };
  const classes = useStyles();
  let mia =
    'https://coin.z.com/corp_imgs/icon/icon-' +
    symbolData.symbol.toLowerCase() +
    '.svg';
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {symbolData.symbol}
            </Typography>
            <Typography color="textPrimary" variant="h3">
              <NumberFormat
                value={symbolData.conversionRate}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'¥'}
              />
            </Typography>
            <Typography textAlign="center">{symbolData.amount}</Typography>
            <Typography textAlign="center">
              {orgFloor(symbolData.conversionRate * symbolData.amount, 100)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar src={mia} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CoinBucket.propTypes = {
  className: PropTypes.string,
  symbolData: PropTypes.object.isRequired
};

export default CoinBucket;
