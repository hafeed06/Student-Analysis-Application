import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import headers from '../../utils/Headers';
import api from '../../utils/api';
import { getFrenchDate } from '../../utils/getRawDate';

const columns = [
  { id: 'dateEvaluation', label: 'Evaluation Date', maxWidth: 100 },
  { id: 'nameCourse', label: 'Course Name', minWidth: 150,},
  { id: 'result', label: 'Result', maxWidth: 100 },
];

function createData(dateEvaluation, nameCourse, result) {
  return { dateEvaluation, nameCourse, result };
}



const rows = [
//   createData('20/20/2021', 'Advanced Java', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
];

// rows.push(createData('20/20/2021', 'Advanced Java', 1324171354, 3287263))

export default function LatestResults() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([])

  React.useEffect(() => {

    api.post('evaluate/allMarksUser/', {}, {headers : headers})
    .then(res => {
        const tempRows = []

        const x = res.data.sort(function(a, b) {
            var x = new Date(a.dateEvaluation); var y = new Date(b.dateEvaluation)
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });

        console.log(x)

        x.map((e,k) => {
            if(k < 10) tempRows.push(
                createData(
                    getFrenchDate(e.dateEvaluation), 
                    e.course, 
                    e.result
                )
            )
        })
        setRows(tempRows)
        console.log(rows)
    })
    .catch(error => console.log(error.response.data))
  },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}