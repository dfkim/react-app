import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import StockChart from './StockChart';

import Papa from 'papaparse';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const HistorysView = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const [stockName, setStockName] = useState('');
  useEffect(() => {
    async function getData() {
      const response = await fetch('/7201.T.csv');
      const reader = response.body.getReader();
      const result = await reader.read(); // raw array
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value); // the csv text
      const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
      const rows = results.data; // array of objects
      let timelineList = [];
      rows.forEach(function(v, i) {
        let date = new Date(v.Date);
        let timeline = {
          adjusted: v.AdjClose,
          close: v.Close,
          date: date,
          high: v.High,
          low: v.Low,
          open: v.Open,
          volume: v.Volume
        };
        timelineList.push(timeline);
      });
      setData(timelineList);
    }
    setStockName('');
    getData();
  }, []);

  if (data.length === 0) {
    return 'loading...';
  }

  return (
    <Page className={classes.root} title="履歴">
      <Container maxWidth="lg">
        <Card>
          <CardHeader title={stockName}></CardHeader>
          <CardContent>
            <StockChart data={data} />
            <Divider />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default HistorysView;
