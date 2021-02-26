import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
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

const Profit = ({ className, profitAmount, percentageAmount, ...rest }) => {
  const classes = useStyles();

  let arrowIcon = <ArrowDownwardIcon/>;
  if(percentageAmount > 0){
    arrowIcon = <ArrowUpwardIcon/>
  }

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
              運用利益
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              <NumberFormat value={profitAmount} displayType={'text'} thousandSeparator={true} prefix={'¥'} />
             
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box   mt={2}
          display="flex"
          alignItems="center">
        {arrowIcon}
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            {percentageAmount + "%"}
          </Typography>
          
          </Box><Box mt={2}>
          <LinearProgress
            value={percentageAmount}
            variant="determinate"
            title={percentageAmount + "%"}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

Profit.propTypes = {
  className: PropTypes.string,
  profitAmount: PropTypes.number,
  percentageAmount: PropTypes.number
};

export default Profit;
