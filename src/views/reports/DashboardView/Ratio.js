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
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));



const Ratio = ({ className, ratioDiv, ratioAmount, ...rest }) => {
  const classes = useStyles();

  let iconDiv = <AddIcon />;
  
  if(ratioDiv === false){
    iconDiv = <RemoveIcon />;
  
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
              前日比
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              <NumberFormat value={ratioAmount} displayType={'text'} thousandSeparator={true} prefix={'¥'} />
              
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
            
             {iconDiv}
              
            </Avatar>
          </Grid>
        </Grid>
      
      </CardContent>
    </Card>
  );
};

Ratio.propTypes = {
  className: PropTypes.string,
  ratioDiv: PropTypes.bool,
  ratioAmount: PropTypes.number
};

export default Ratio;
