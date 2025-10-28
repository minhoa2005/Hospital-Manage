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
    Divider,
    FormLabel,
    Avatar,
    Menu,
    MenuItem
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import userManage from '../../../../service/Admin/userManage.ts';
import { useSnackbar } from 'notistack';
import type { userDetail, userInfo } from '../../../../../type/adminType.ts';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/EditDocument';
import BlockIcon from '@mui/icons-material/Block';
import ResetIcon from '@mui/icons-material/Restore';
import { getAva } from '../../../../function/stringModify.ts';

export default function UserList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { enqueueSnackbar } = useSnackbar();
    const [detail, setDetail] = useState<userDetail | null>(null);
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const [anchorData, setAnchorData] = useState<number | null>(null);
    const open = Boolean(anchor);

    const handleOpenMenu = (e: any) => {
        const element = e.currentTarget;
        setAnchorData(element.getAttribute('data-id'));
        setAnchor(element);
    }


    const resetPassword = async (id: number) => {
        try {
            const response = await userManage.resetPassword(id);
            if (response.success) {
                enqueueSnackbar(response.message, { variant: 'success', autoHideDuration: 3000 });
            }
            else {
                enqueueSnackbar(response.message, { variant: 'error', autoHideDuration: 3000 });
            }
        }
        catch (error) {
            enqueueSnackbar(`An unknown error occurred: ${error}`, { variant: 'error', autoHideDuration: 3000 });
        }
    };

    const fetchUserDetail = async (id: number) => {
        try {
            console.log(id)
            const response = await userManage.getUserDetailById(id);
            if (response.success) {
                setDetail(response.data);
            }
            else {
                setDetail(null)
                enqueueSnackbar(response.message, { variant: 'error', autoHideDuration: 3000 })
            }
        }
        catch (error) {
            enqueueSnackbar(`An unknown error occurred: ${error}`, { variant: 'error', autoHideDuration: 3000 });
        }
    };

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
    };

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
                        overflowY: 'auto',
                        minWidth: 0
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
                                    <TableRow
                                        key={i}
                                        onClick={() => fetchUserDetail(user.id)}
                                        sx={{
                                            ":hover": {
                                                backgroundColor: '#cac9c6ff',
                                                cursor: 'pointer'
                                            }
                                        }}

                                    >
                                        <TableCell component={'td'}>{i + 1}</TableCell>
                                        <TableCell component={'td'}>{user.fullName}</TableCell>
                                        <TableCell component={'td'}>{user.email}</TableCell>
                                        <TableCell component={'td'}>{user.roleName}</TableCell>
                                        <TableCell component={'td'}>
                                            <Button
                                                variant='outlined' color='info'
                                                onClick={(e) => { e.stopPropagation(); handleOpenMenu(e) }}
                                                id='menu-anchor'
                                                aria-controls={open ? 'menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                data-id={user.id}
                                            >
                                                Actions
                                                <ArrowRightIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table >
                    </TableContainer >
                    <Divider orientation="vertical" flexItem />
                    <Paper sx={{ flex: 1, minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box>
                            <Typography variant='h5' sx={{ textAlign: 'center', padding: '10px' }}>User Detail</Typography>
                            <Divider />
                        </Box>
                        {detail ? (
                            <Box sx={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                            <Typography>User ID: {detail.id}</Typography>
                                            <Typography>Role: {detail.roleName}</Typography>
                                            <Typography>Full Name: {detail.fullName}</Typography>
                                            <Typography>Email: {detail.email}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                                            <Avatar sx={{ width: '9rem', height: '9rem' }}>
                                                {getAva(detail.fullName)}
                                            </Avatar>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography>Gender: {detail?.gender || "Not provided"}</Typography>
                                        <Typography>Date of Birth: {detail.dateOfBirth ? new Date(detail.dateOfBirth).toLocaleString() : "Not provided"}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Typography>Created At: {new Date(detail.createdAt).toLocaleString().split(' ')[1]}</Typography>
                                        <Typography>Updated At: {new Date(detail.updatedAt).toLocaleString().split(' ')[1]}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{}}>
                                    <Divider />
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, gap: 1 }}>
                                        <Button variant='outlined' color='info'>
                                            <EditIcon />
                                            Edit
                                        </Button>
                                        <Button variant='outlined' color='error'>
                                            <BlockIcon />
                                            Disable
                                        </Button>
                                        <Button variant='outlined' color='warning'>
                                            <ResetIcon onClick={() => { resetPassword(anchorData!); setAnchor(null); }} />
                                            Reset Password
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85%' }}>
                                <Typography variant='body1' sx={{ padding: '10px' }}>Select a user to see details</Typography>
                            </Box>
                        )}
                    </Paper>
                </Box >
            )
            }
            <Menu
                open={open}
                id='menu'
                anchorEl={anchor}
                anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
                onClose={() => setAnchor(null)}
                transformOrigin={{ vertical: 'center', horizontal: 'left' }}
                sx={{ ml: 1 }}
            >
                <MenuItem>Edit</MenuItem>
                <MenuItem>Disable</MenuItem>
                <MenuItem onClick={() => { resetPassword(anchorData!); setAnchor(null); }}>Reset Password</MenuItem>
            </Menu>
        </Box >
    )
}
