import React, { useState, useEffect } from 'react';
import StockChart from './StockChart';
import {
  Grid,
  Container,
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Divider
} from '@material-ui/core';
import Page from 'src/components/Page';
import Stock from './Stock';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}));

const StocksChartView = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [stockName, setStockName] = useState('');

  // https://open.jpbeta.com/stockapi/
  useEffect(() => {
    const symbolData = ['2315', '6178', '7201', '9434'];
    const symbolCode =
      symbolData[Math.floor(Math.random() * symbolData.length)];

    const fetchUrl =
      'https://open.jpbeta.com/stockapi/timeline/' + symbolCode + '?q=';
    fetch(fetchUrl, {
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        let timelineList = [];
        Object.keys(data.timelineList).forEach(i => {
          let timeline = data.timelineList[i];
          timeline.date = new Date(timeline.date);
          timelineList.push(timeline);
        });
        setStockName(data.symbolName);
        return timelineList;
      })
      .then(data => {
        data.sort(function(a, b) {
          if (a.date < b.date) {
            return -1;
          } else {
            return 1;
          }
        });

        setData(data);
      });
  }, []);
  useEffect(() => {
    const symbolData = ['2315', '6178', '7201', '9434'];
    Object.keys(symbolData).forEach(i => {
      let symbol = symbolData[i];
      fetch('https://open.jpbeta.com/stockapi/stocks/' + symbol + '?q=', {
        method: 'get',
        headers: {
          'X-API-KEY': '12345678'
        },
        mode: 'cors'
      })
        .then(response => response.json())
        .then(res => {
          setStockList(stockList => [...stockList, res]);
        });
    });
  }, []);

  const handleClick = (e, data) => {
    setData([]);
    const symbolCode = data.symbolCode;
    const symbolName = data.symbolName;
    setStockName(symbolName);
    //console.log(symbolName)
    const fetchUrl =
      'https://open.jpbeta.com/stockapi/timeline/' + symbolCode + '?q=';
    fetch(fetchUrl, {
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => {
        let timelineList = [];
        Object.keys(data.timelineList).forEach(i => {
          let timeline = data.timelineList[i];
          timeline.date = new Date(timeline.date);
          timelineList.push(timeline);
        });
        return timelineList;
      })
      .then(data => {
        data.sort(function(a, b) {
          if (a.date < b.date) {
            return -1;
          } else {
            return 1;
          }
        });
        setData(data);
      });
  };

  if (stockList.length === 0) {
    return 'loading...';
  }

  return (
    <Page className={classes.root} title="証券情報 ">
      <Container maxWidth={false}>
        <h2>証券情報</h2>
        <Grid container spacing={3}>
          {Array.from(stockList).map((stockData, index) => (
            <Grid item lg={3} sm={6} xl={3} xs={12} key={index}>
              <Stock symbolData={stockData} onClick={handleClick} />
            </Grid>
          ))}

          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Card>
              <CardHeader title={stockName}></CardHeader>
              <CardContent>
                <StockChart data={data} />
                <Divider />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default StocksChartView;
