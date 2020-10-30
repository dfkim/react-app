import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));


function number_format(number, decimals, dec_point, thousands_sep) {
  // * example: number_format(1234.56, 2, ',', ' ');
  // * return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0
          : Math.abs(decimals), sep = (typeof thousands_sep === 'undefined') ? ','
          : thousands_sep, dec = (typeof dec_point === 'undefined') ? '.'
          : dec_point, s = '', toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
  };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

const MarketPrice = ({ className, totalAmount, ...rest }) => {
  const classes = useStyles();

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
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              保有時価
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              ¥{number_format(totalAmount)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <TrendingUpIcon />
            </Avatar>
          </Grid>
        </Grid>
        
      </CardContent>
    </Card>
  );
};

MarketPrice.propTypes = {
  className: PropTypes.string,
  totalAmount: PropTypes.number
};

export default MarketPrice;
