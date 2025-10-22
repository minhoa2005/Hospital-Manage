import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material'
import React from 'react'

export default function UserList() {
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell component={'th'}>No.</TableCell>
                            <TableCell component={'th'}>Name</TableCell>
                            <TableCell component={'th'}>Email</TableCell>
                            <TableCell component={'th'}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
