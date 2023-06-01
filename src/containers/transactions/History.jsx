import React from 'react';
import { styled } from '@mui/material/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#cae5f0",
    color: 'black',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  item: string,
  price: number,
  quantity: number,
  from: number,
  time: number,
) {
  return { item, price, quantity, from, time };
}

const rows = [
  createData('Aaliyah', 0.12, 1, 'CoolLizzard', '20m ago'),
  createData('Chippy', 0.31, 1, '20238', '30m ago'),
  createData('Mr.Bean', 0.23, 1, 'Azuki', '45m ago'),
  createData('Chai Latte', 0.41, 1, 'MochiDonut', '1h ago'),
  createData('Aaliyah', 0.12, 1, 'EpicUser', '2h ago'),
  createData('Aaliyah', 0.12, 1, 'User28017', '2h ago'),
  createData('Aaliyah', 0.12, 1, 'RKelly111', '2h ago'),
  createData('Chai Latte', 0.41, 1, 'KrispyCream', '2h ago'),
  createData('Chippy', 0.31, 1, 'SanDiegoBae', '3h ago'),
  createData('Chippy', 0.31, 1, 'SleepAllDay', '5h ago'),
  createData('Chai Latte', 0.41, 1, 'User49200', '12h ago'),
];


const History = () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="transaction table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{fontWeight: 'bold'}}>Item</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 'bold'}} align="right">Price&nbsp;(TFUEL)</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 'bold'}} align="right">Quantity</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 'bold'}} align="right">From</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 'bold'}} align="right">Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.item}>
                <StyledTableCell component="th" scope="row">
                  {row.item}
                </StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                <StyledTableCell align="right">{row.from}</StyledTableCell>
                <StyledTableCell align="right">{row.time}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default History