import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import PropTypes from 'prop-types';

const columns = [
  { id: 'date', label: 'Date', minWidth: 80, align: 'left' },
  { id: 'symbolCode', label: 'コード', minWidth: 80, align: 'left' },
  { id: 'symbolName', label: '銘柄', minWidth: 150, align: 'left' },
  {
    id: 'itemPrice',
    label: '単価',
    minWidth: 80,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'itemBlance',
    label: '数量',
    minWidth: 80,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'itemAmount',
    label: '配当・分配金',
    minWidth: 120,
    align: 'right',
    format: value => value.toFixed(2)
  },
  {
    id: 'taxAmount',
    label: '税額',
    minWidth: 80,
    align: 'right',
    format: value => value.toFixed(2)
  },
  {
    id: 'profitAmount',
    label: '受取金額',
    minWidth: 100,
    align: 'right',
    format: value => value.toFixed(2)
  }
];

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
});

const ReportTable = ({ symbolData }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, idx) => (
                <TableCell
                  key={idx}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {symbolData.map((row, idx) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                  {columns.map((column, cid) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={cid} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

ReportTable.propTypes = {
  className: PropTypes.string,
  symbolData: PropTypes.array.isRequired
};
export default ReportTable;
