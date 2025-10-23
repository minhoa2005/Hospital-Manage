import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    CircularProgress,
    Drawer,
    Divider
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import userManage from '../../../../service/Admin/userManage.ts';
import { useSnackbar } from 'notistack';
import type { userDetail, userInfo } from '../../../../../type/adminType.ts';

export default function UserList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const [detail, setDetail] = useState<userDetail | null>(null);
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
            enqueueSnackbar('Failed to get data from server', { variant: 'error', autoHideDuration: 3000 });
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <Box>
            <Typography variant='h4'>User List</Typography>
            {loading ? (
                <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ display: 'flex', gap: 2, height: '70vh' }}>
                    <TableContainer id='left' component={Paper} sx={{
                        flex: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell component={'th'}>No.</TableCell>
                                    <TableCell component={'th'}>Name</TableCell>
                                    <TableCell component={'th'}>Email</TableCell>
                                    <TableCell component={'th'}>Role</TableCell>
                                    <TableCell component={'th'}></TableCell>
                                </TableRow >
                            </TableHead >
                            <TableBody>
                                {(data || []).map((user: userInfo, i) => (
                                    <TableRow>
                                        <TableCell component={'td'}>{i + 1}</TableCell>
                                        <TableCell component={'td'}>{user.fullName}</TableCell>
                                        <TableCell component={'td'}>{user.email}</TableCell>
                                        <TableCell component={'td'}>{user.roleName}</TableCell>
                                        <TableCell component={'td'}>
                                            <Button variant='outlined'>Detail</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table >
                    </TableContainer >
                    <Divider orientation="vertical" flexItem />
                    <Paper sx={{ flex: 1, height: '100%', overflow: 'auto' }}>
                        <Typography variant='h5' sx={{ textAlign: 'center', padding: '10px' }}>User Detail</Typography>
                        <Divider />
                        {detail ? (
                            <>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85%' }}>
                                <Typography variant='body1' sx={{ padding: '10px' }}>Select a user to see details</Typography>
                            </Box>
                        )}
                    </Paper>
                </Box >
            )
            }
        </Box >
    )
}
