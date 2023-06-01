import React from 'react'
import { Typography, TableContainer, Table, TableHead, TableCell,TableRow, Paper, TableBody } from '@mui/material'

function createData(
  volume: string,
  floor: number,
  best: number,
  listed: number,
  owners: number,
  unique: Number,
) {
  return { volume, floor, best, listed, owners, unique };
}

const rows = [
  createData('1,079,107', 47.692, 45.013, 3, 6170, 68),
];

const Summary = () => {
  return (
    <div>
        <Typography align="center" variant="h6" sx={{mt: 1, mb: 1}} color="primary">Summary</Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Total Volume (TFUEL)</TableCell>
                <TableCell>Floor Price&nbsp;(TFUEL)</TableCell>
                <TableCell>Best Offer&nbsp;(TFUEL)</TableCell>
                <TableCell>Listed&nbsp;(%)</TableCell>
                <TableCell>Owners</TableCell>
                <TableCell>Unique Owners&nbsp;(%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell  sx={{fontSize: 20, fontWeight: 'bold'}} component="th" scope="row">
                    {row.volume}
                  </TableCell>
                  <TableCell sx={{fontSize: 20, fontWeight: 'bold'}}>{row.floor}</TableCell>
                  <TableCell sx={{fontSize: 20, fontWeight: 'bold'}}>{row.best}</TableCell>
                  <TableCell sx={{fontSize: 20, fontWeight: 'bold'}}>{row.listed}</TableCell>
                  <TableCell sx={{fontSize: 20, fontWeight: 'bold'}}>{row.owners}</TableCell>
                  <TableCell sx={{fontSize: 20, fontWeight: 'bold'}}>{row.unique}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}

export default Summary