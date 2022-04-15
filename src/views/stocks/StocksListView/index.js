import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const StocksListView = () => {
  const classes = useStyles();
  const [stockList, setStockList] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // 保有一覧

    fetch('https://esll.net/stocks/', {
      headers: { 'X-API-KEY': '12345678' },
      mode: 'cors'
    })
      .then(response => response.json())
      .then(res => {
        let tem = [];
        Object.keys(res).forEach(i => {
          if (parseInt(res[i].stock_code) > 0) {
            tem.push(res[i]);
          }
        });
        setStockList(tem);
      });
  }, []);

  if (0 === stockList.length) {
    return 'loading...';
  }

  const hexUp = source => {
    return {
      accountDiv: source.ACCOUNT_DIV,
      acquisitionAmount: source.ACQUISITION_AMOUNT,
      acquisitionUnit: source.ACQUISITION_UNIT,
      balance: source.balance,
      currencyUnit: source.currency_unit,
      dayBefore: source.day_before,
      id: source.id,
      market: source.market,
      marketDate: source.market_date,
      marketPriceForeign: '-',
      marketPriceYen: source.market_price_yen,
      plForeign: source.p_l_foreign,
      plYen: source.p_l_yen,
      presentUnit: source.present_unit,
      presentValue: source.present_value,
      presentValueUpdate: source.present_value_update,
      referenceExchange: source.reference_exchange,
      stockCode: source.stock_code,
      stockName: source.stock_name,
      unitName: source.unit_name
    };
  };

  const changeSelection = event => {
    let stockCd = event.target.value;

    fetch(`https://esll.net/stocks/${stockCd}`, {
      headers: { 'X-API-KEY': '12345678' },
      mode: 'cors'
    })
      .then(response => response.json())
      .then(res => {
        let tmp = [];
        Object.keys(res).forEach(i => {
          tmp.push(hexUp(res[i]));
        });

        setData(tmp);
      });
  };

  const renderItem = props => {
    return (
      <div
        key={props.stock_code}
        style={{ margin: '5px', display: 'inline-block' }}
      >
        <label htmlFor={props.stock_code}>
          <input
            className="stockcheck"
            data-stock-name={props.stock_name}
            id={props.stock_code}
            type="checkbox"
            value={props.stock_code}
            onChange={changeSelection}
          />
          {props.stock_name}
        </label>
      </div>
    );
  };

  return (
    <Page className={classes.root} title="StockList">
      <Container maxWidth={false}>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Box maxWidth={500}>
                {Object.keys(stockList).map(i => renderItem(stockList[i]))}
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box mt={3}>
          <Results stockDataList={data} />
        </Box>
      </Container>
    </Page>
  );
};

export default StocksListView;
