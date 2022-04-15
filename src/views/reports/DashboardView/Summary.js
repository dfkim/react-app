import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  root: {}
}));

function strToInt(str) {
  return str.replace(/,/g, '').replace(/円/g, '');
}

function number_format(number, decimals, dec_point, thousands_sep) {
  // * example: number_format(1234.56, 2, ',', ' ');
  // * return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
    dec = typeof dec_point === 'undefined' ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
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

const Summary = ({ className, dataList, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  let datasets = [];
  let colorArr = [
    colors.indigo[500],
    colors.red[600],
    colors.orange[600],
    colors.green[600],
    colors.yellow[600]
  ];
  let lables = [];
  Object.keys(dataList).forEach((key, index) => {
    let itemList = dataList[key];
    let itemArr = [];

    Object.keys(itemList).forEach(i => {
      // item
      itemArr.push(strToInt(itemList[i].currentPrice));

      // lable
      if (Number(dataList.length) === Number(index)) {
        lables.push(itemList[i].orderDate);
      }
    });

    // datasets
    let sets = {
      backgroundColor: colorArr[index],
      label: key,
      data: itemArr,
      fill: false
    };
    datasets.push(sets);
  });

  const data = {
    datasets: datasets,
    labels: lables
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Balance'
          },
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
            callback: function(value, index, values) {
              if (value >= 1000) {
                value /= 1000;
                value += '千円';
              } else {
                value /= 1000;
                value += '千円';
              }
              return '￥' + value;
            }
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
      callbacks: {
        label: function(tooltipItem, chart) {
          var label = data.datasets[tooltipItem.datasetIndex].label || '';
          if (label) {
            label += ': ';
          }
          label += ' ￥' + number_format(tooltipItem.yLabel);
          return label;
        }
      }
    }
  };

  const [showLine, setShowLine] = useState(true);
  const [showLine1, setShowLine1] = useState(false);
  const handleClick = event => {
    if (showLine) {
      setShowLine(false);
      setShowLine1(true);
    } else {
      setShowLine(true);
      setShowLine1(false);
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="サマリーチャート" />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
          {showLine && <Bar data={data} options={options} />}
          {showLine1 && <Line data={data} options={options} />}
        </Box>
      </CardContent>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={handleClick}
        >
          切り替え
        </Button>
      </Box>
    </Card>
  );
};

Summary.propTypes = {
  className: PropTypes.string,
  dataList: PropTypes.array
};

export default Summary;
