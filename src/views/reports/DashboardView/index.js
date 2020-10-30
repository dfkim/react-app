import React, { useState,useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
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
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [fundData, setFundData] = useState(null);

 
  useEffect(() => {
  
    

    fetch('https://esll.net/funds', {
      headers: { 'X-API-KEY': '12345678' },
      mode: 'cors'
    })
    .then((response) => response.json())
    .then((responseJson) => {
     
      const fundDataList = [];
      let selected =  [];
  
      Object.keys(responseJson).forEach(i => {
        // fund name
        const itemName = responseJson[i].ITEM_NAME.replace("【つみたて】","");

        if(selected.indexOf(itemName) >= 0 ){

          fundDataList[itemName] = [...fundDataList[itemName],responseJson[i]];
         
        } else {

          fundDataList[itemName] = [responseJson[i]];
          selected.push(itemName);

        }
       

      });

      let totalAmountArr = [];
      let itemPriceArr = [];
      let ratioAmountArr =[];
      for (let key in fundDataList) {
    
        let itemList = fundDataList[key];
        const currentIdx = itemList.length - 1;
        Object.keys(itemList).forEach(i => {
            if(Number(i) === Number(currentIdx)){
              totalAmountArr.push(strToInt(itemList[i].CURRENT_PRICE));
              itemPriceArr.push(strToInt(itemList[i].ITEM_PRICE));
              if("0" === itemList[i].RATIO_DIV){
                ratioAmountArr.push(- (strToInt(itemList[i].RATIO_PRICE)))
              } else {
                ratioAmountArr.push(strToInt(itemList[i].RATIO_PRICE))
              }
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
        ratioDiv: ratioAmountArr.reduce(reducer) > 0 ? true : false
      }

      setFundData (fundData);
    })
    .catch((error) =>{
        console.error(error);
        return;
    });

  },[]);
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
