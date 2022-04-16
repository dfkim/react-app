import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  makeStyles,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import Page from 'src/components/Page';
import ReportPanel from './ReportPanel';
import ReportTable from './ReportTable';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DividendsView = () => {
  const classes = useStyles();
  const [dividendList, setDividendList] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://open.jpbeta.com/stockapi/dividendList';
    fetch(apiUrl, {
      method: 'get',
      headers: {
        'X-API-KEY': '12345678',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
      //body: JSON.stringify(postParam)
    })
      .then(response => response.json())
      .then(responseJson => {
        let symbolData = [];
        let symbol = responseJson.dividendList;
        Object.keys(symbol).forEach(i => {
          let item = symbol[i];
          if(item.taxAmount===undefined){
            item.taxAmount = "0";
          }
          symbolData.push(item);
        });
        setDividendList(symbolData);
      })
      .catch(error => {
        console.error(error);
        return;
      });
  }, []);

  //入金日,商品,口座,銘柄コード,銘柄,単価[円/現地通貨],数量[株/口],配当・分配金合計（税引前）[円/現地通貨],税額合計[円/現地通貨],受取金額[円/現地通貨]
  //console.log(dividendList)
  //date,itemName,blanceDiv,symbolCode,symbolName,itemPrice,itemBlance,itemAmount,taxAmount,profitAmount
  if (dividendList.length === 0) {
    return 'loading...';
  }

  return (
    <Page className={classes.root} title="配当・分配金">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={11}>
            <h2>配当・分配金</h2>
          </Grid>
        </Grid>

        <Card>
          <CardHeader title="合計"></CardHeader>
          <CardContent>
            <Grid item>
              <ReportPanel symbolData={dividendList} />
            </Grid>
          </CardContent>
        </Card>
        <Grid container spacing={3}>
          <Grid item xs={11}>
            <br />
          </Grid>
        </Grid>
        <Card>
          <CardHeader title="配当金・分配金一覧"></CardHeader>
          <CardContent>
            <Grid item>
              <ReportTable symbolData={dividendList} />
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default DividendsView;
