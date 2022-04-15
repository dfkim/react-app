import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';

import NumberFormat from 'react-number-format';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const FundTables = ({ className, title, dataList, ...rest }) => {
  const classes = useStyles();

  let datas = dataList;

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title={title} />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>取得単価</TableCell>
                <TableCell>評価額</TableCell>
                <TableCell>評価損益</TableCell>
                <TableCell>前日比</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datas.map((item, index) => (
                <TableRow hover key={index}>
                  <TableCell>{item.orderDate}</TableCell>
                  <TableCell>
                    <NumberFormat
                      value={item.blancePrice}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'¥'}
                    />
                  </TableCell>
                  <TableCell>
                    <NumberFormat
                      value={item.currentPrice}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'¥'}
                    />
                  </TableCell>
                  <TableCell>
                    <NumberFormat
                      value={item.profitPrice}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'¥'}
                    />
                  </TableCell>
                  <TableCell>
                    <NumberFormat
                      value={item.ratioPrice}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'¥'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

FundTables.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  dataList: PropTypes.array
};

export default FundTables;
