import React, { useState,useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Page from 'src/components/Page';
import FundTables from './FundTables';
import Summary from './Summary';
import Profit from './Profit';
import InvestmentAmount from './InvestmentAmount';
import Ratio from './Ratio';
import SummaryPi from './SummaryPi';
import MarketPrice from './MarketPrice';

const strToInt = (str) =>  str.replace( /,/g ,"").replace( /円/g ,"");
const round = (value, base) =>  Math.round(value * base) / base;
const reducer = (accumulator, currentValue) => Number(accumulator) + Number(currentValue);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [fundData, setFundData] = useState(null);
  const [customerCd, setCustomerCd] = useState('1');
  const handleChangeCustomerCd = (event) => {
    setCustomerCd( customerCd => {
      const c1 = '1';
      const c2 = '2';
      if(customerCd === c1) {
        return c2;
      }
      return c1;
    } );
  };
  useEffect(() => {
    const postParam = {
      "limit" : 25,
      "start" : 0,
      "customer" : customerCd
    }
    //const apiUrl = "http://localhost:3031/searchNisa"
    const apiUrl = "https://open.jpbeta.com/searchNisa";
    fetch(apiUrl, {
      method: 'post',
      headers: { 
        'X-API-KEY': '12345678',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(postParam)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      const fundDataList = [];
      let selected =  [];
  
      Object.keys(responseJson).forEach(i => {
        // fund name
        const item = responseJson[i]._source;
        const itemName = item.itemName.replace("【つみたて】","");
        if(selected.indexOf(itemName) >= 0 ){
          fundDataList[itemName] = [...fundDataList[itemName],item];
        } else {
          fundDataList[itemName] = [item];
          selected.push(itemName);
        }
      });
  
      let totalAmountArr = [];
      let itemPriceArr = [];
      let ratioAmountArr = [];
      let currentDateArr = [];
      for (let key in fundDataList) {
    
        let itemList = fundDataList[key];
        itemList.sort(function(a,b){
          if(a.orderDate<b.orderDate) return -1;
          if(a.orderDate > b.orderDate) return 1;
          return 0;
        });
        const currentIdx = itemList.length - 1;
        Object.keys(itemList).forEach(i => {
            if(Number(i) === Number(currentIdx)){
              totalAmountArr.push(parseFloat(strToInt(itemList[i].currentPrice)));
              itemPriceArr.push(parseFloat(strToInt(itemList[i].blancePrice)));
              ratioAmountArr.push(parseFloat(strToInt(itemList[i].ratioPrice)));
              currentDateArr.push(itemList[i].orderDate);
            }
        });
      }
  
      
      const fundData = {
        // ファンドデータリスト
        fundDataList : fundDataList,
        // 保有時価
        totalAmount : totalAmountArr.reduce(reducer),
        // 投資総額
        investmentAmount : itemPriceArr.reduce(reducer),
        // 運用利益パーセント
        percentageAmount : round((((totalAmountArr.reduce(reducer) - itemPriceArr.reduce(reducer)) / itemPriceArr.reduce(reducer)) * 100),1000),
        // 運用利益
        profitAmount: Math.abs(totalAmountArr.reduce(reducer) - itemPriceArr.reduce(reducer)),
        // 前日比
        ratioAmount: ratioAmountArr.reduce(reducer),
        // 
        ratioDiv: ratioAmountArr.reduce(reducer) > 0 ? true : false,
        // 基準日
        currentDate: currentDateArr
      }
      setFundData (fundData);
    })
    .catch((error) =>{
        console.error(error);
        return;
    });

  },[customerCd]);
  if(!fundData){
    return "loading..."
  }
  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid 
            item 
            xs={12} 
            md={8} 
            lg={9}
          >
            <Box textAlign="left">
              <Button
              color="primary"
              endIcon={<AccountBalanceWalletIcon />}
              size="small"
              variant="text"
              onClick={handleChangeCustomerCd}
              >
                Wallet Change
              </Button>
            </Box>
          </Grid>
          <Grid 
            item 
            xs={12} 
            md={4} 
            lg={3} 
          >
             <Box textAlign="right">
              {fundData.currentDate[0]}時点
             </Box>
        
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <MarketPrice totalAmount={fundData.totalAmount}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <InvestmentAmount investmentAmount={fundData.investmentAmount} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Profit profitAmount={fundData.profitAmount} percentageAmount={fundData.percentageAmount} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Ratio ratioDiv={fundData.ratioDiv} ratioAmount={fundData.ratioAmount} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Summary dataList={fundData.fundDataList} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <SummaryPi  dataList={fundData.fundDataList} />
          </Grid>


          {Object.keys(fundData.fundDataList).map((title,index) => (

            <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
            key={index}
          >
            <FundTables  title={title} dataList={fundData.fundDataList[title]}/>
          </Grid>
          
          ))}

        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
