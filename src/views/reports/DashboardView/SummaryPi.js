import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import DataUsageIcon from '@material-ui/icons/DataUsage';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));


const strToInt = (str) =>  str.replace( /,/g ,"").replace( /円/g ,"");
const round = (value, base) =>  Math.round(value * base) / base;
const reducer = (accumulator, currentValue) => Number(accumulator) + Number(currentValue);

const SummaryPi = ({ className, dataList, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  let lables = [];
  let itemArr = [];
  Object.keys(dataList).forEach((key,index) => {
    lables.push (key);
    let itemList = dataList[key];
    let lastItem = itemList[itemList.length - 1]
    itemArr.push(strToInt(lastItem.CURRENT_PRICE));
    
  });
  const totalAmount = itemArr.reduce(reducer);
  let datas = [];
  //round((((totalAmountArr.reduce(reducer) - itemPriceArr.reduce(reducer)) / itemPriceArr.reduce(reducer)) * 100),1000)
  for(let i = 0; i < itemArr.length; i++){
    let itemAmount = itemArr[i];
  
    datas.push(round((itemAmount/totalAmount * 100), 100));
  }
  
  const data = {
    datasets: [
      {
        data: datas,
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.green[600],
          colors.yellow[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: lables
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
  let colorArr = [
    colors.indigo[500],
    colors.red[600],
    colors.orange[600],
    colors.green[600],
    colors.yellow[600]];
    let iconArr = [DataUsageIcon,DataUsageIcon,DataUsageIcon,DataUsageIcon,DataUsageIcon];

  const devices = [];
  for(let i = 0; i < datas.length; i++){
    let item = {
      title : lables[i],
      value: datas[i],
      color: colorArr[i],
      icon : iconArr[i]
    }
    devices.push(item);
  }
  
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="投資ファンド割合" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
              </Typography>
              <Typography
                style={{ color }}
                variant="h6"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

SummaryPi.propTypes = {
  className: PropTypes.string,
  dataList: PropTypes.array,
};

export default SummaryPi;
