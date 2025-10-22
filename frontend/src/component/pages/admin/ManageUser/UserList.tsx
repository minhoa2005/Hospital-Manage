import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import userManage from '../../../../service/Admin/userManage.ts';
import { useSnackbar } from 'notistack';
import type { userInfo } from '../../../../../type/adminType.ts'

export default function UserList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await userManage.getAllUser();
            if (response.success) {
                setData(response.data);
                setLoading(false);
            }
        }
        catch (error) {
            enqueueSnackbar('Failed to get data from server', { variant: 'error', autoHideDuration: 3000 })
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <Box>
            <Typography variant='h4'>User List</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell component={'th'}>No.</TableCell>
                            <TableCell component={'th'}>Name</TableCell>
                            <TableCell component={'th'}>Email</TableCell>
                            <TableCell component={'th'}>Role</TableCell>
                            <TableCell component={'th'}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(data || []).map((user: userInfo, i) => (
                            <TableRow>
                                <TableCell component={'td'}>{i + 1}</TableCell>
                                <TableCell component={'td'}>{user.fullName}</TableCell>
                                <TableCell component={'td'}>{user.email}</TableCell>
                                <TableCell component={'td'}>{user.roleName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
