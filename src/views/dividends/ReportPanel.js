import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import PropTypes from 'prop-types';

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

const ReportPanel = ({ symbolData }) => {
  const classes = useStyles();
  const items = new Map();
  Object.keys(symbolData).forEach(i => {
    const item = symbolData[i];
    //console.log(item.itemName)
    if (items.has(item.itemName)) {
      let itemObj = items.get(item.itemName);
      itemObj.profitAmount =
        Number(itemObj.profitAmount) +
        Number(item.profitAmount.replace(/,/, ''));
      itemObj.taxAmount =
        Number(itemObj.taxAmount) + Number(item.taxAmount.replace(/,/, ''));
      itemObj.itemAmount =
        Number(itemObj.itemAmount) + Number(item.itemAmount.replace(/,/, ''));
      itemObj.items.push(item);
      items.set(item.itemName, itemObj);
    } else {
      let itemObj = {
        itemAmount: Number(item.itemAmount.replace(/,/, '')),
        taxAmount: Number(item.taxAmount.replace(/,/, '')),
        profitAmount: Number(item.profitAmount.replace(/,/, '')),
        items: [item]
      };
      items.set(item.itemName, itemObj);
    }
  });
  let symbolList = [];
  let usAmount = 0;
  let jpAmount = 0;
  let taxAmount = 0;
  let jpItemAmount = 0;
  let usItemAmout = 0;
  items.forEach((item, key) => {
    item.itemName = key;
    if ('米国株式' === key) {
      usItemAmout = Number(usItemAmout) + Number(item.itemAmount);
      usAmount = Number(usAmount) + Number(item.profitAmount);
    } else if ('国内株式' === key || '投資信託' === key) {
      jpItemAmount = Number(jpItemAmount) + Number(item.itemAmount);
      jpAmount = Number(jpAmount) + Number(item.profitAmount);
    }
    taxAmount = Number(taxAmount) + Number(item.taxAmount);
    symbolList.push(item);
  });
  //console.log(items)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>商品</TableCell>
            <TableCell align="right">配当金・分配金</TableCell>
            <TableCell align="right">税額</TableCell>
            <TableCell align="right">受取金額</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(symbolList).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.itemName}</TableCell>
              <TableCell align="right">{row.itemAmount}</TableCell>
              <TableCell align="right">{row.taxAmount}</TableCell>
              <TableCell align="right">{ccyFormat(row.profitAmount)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell>合計</TableCell>
            <TableCell align="right">{ccyFormat(jpItemAmount)}円</TableCell>
            <TableCell align="right">{ccyFormat(taxAmount)}円</TableCell>
            <TableCell align="right">{ccyFormat(jpAmount)}円</TableCell>
          </TableRow>

          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">{ccyFormat(usItemAmout)}USドル</TableCell>
            <TableCell align="right">-</TableCell>
            <TableCell align="right">{ccyFormat(usAmount)}USドル</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
ReportPanel.propTypes = {
  className: PropTypes.string,
  symbolData: PropTypes.array.isRequired
};
export default ReportPanel;
