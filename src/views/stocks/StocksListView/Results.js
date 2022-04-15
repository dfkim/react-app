import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { lighten } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core';

import TableSortLabel from '@material-ui/core/TableSortLabel';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  }
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: 'marketData', numeric: false, disablePadding: false, label: '日付' },
  { id: 'balance', numeric: false, disablePadding: false, label: '保有数量' },
  { id: 'currencyUnit', numeric: false, disablePadding: false, label: '単位' },
  {
    id: 'presentValue',
    numeric: false,
    disablePadding: false,
    label: '現在値'
  },
  { id: 'presentUnit', numeric: false, disablePadding: false, label: '単位' },
  { id: 'dayBefore', numeric: false, disablePadding: false, label: '前日比' },
  { id: 'unitName', numeric: false, disablePadding: false, label: '単位' },
  {
    id: 'protein1',
    numeric: false,
    disablePadding: false,
    label: '時価評価額[円]'
  },
  {
    id: 'protein2',
    numeric: false,
    disablePadding: false,
    label: '時価評価額[外貨]'
  },
  {
    id: 'protein3',
    numeric: false,
    disablePadding: false,
    label: '評価損益[円]'
  },
  {
    id: 'protein4',
    numeric: false,
    disablePadding: false,
    label: '評価損益[％]'
  }
];

function StockDataTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

StockDataTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const Results = ({ className, stockDataList, ...rest }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const classes = useStyles();
  const [limit, setLimit] = useState(10);

  const handleLimitChange = event => {
    setLimit(event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    //setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <StockDataTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={stockDataList.length}
            />
            <TableBody>
              {stableSort(stockDataList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(stockData => (
                  <TableRow hover key={stockData.id}>
                    <TableCell>
                      {moment(stockData.marketDate).format(
                        'YYYY/MM/DD HH:mm:ss'
                      )}
                    </TableCell>
                    <TableCell>
                      <Box alignItems="right" display="flex">
                        {stockData.balance}
                      </Box>
                    </TableCell>
                    <TableCell>{stockData.currencyUnit}</TableCell>
                    <TableCell>{stockData.presentValue}</TableCell>
                    <TableCell>{stockData.presentUnit}</TableCell>
                    <TableCell>{stockData.dayBefore}</TableCell>
                    <TableCell>{stockData.unitName}</TableCell>
                    <TableCell>{stockData.marketPriceYen}</TableCell>
                    <TableCell>{stockData.marketPriceForeign}</TableCell>
                    <TableCell>{stockData.plYen}</TableCell>
                    <TableCell>{stockData.plForeign}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={stockDataList.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  stockDataList: PropTypes.array.isRequired
};

export default Results;
