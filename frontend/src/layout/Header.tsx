import { Box, Button, Typography, Link, Menu, MenuItem, Divider, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { useUserContext } from '../UserContext.tsx';
import HistoryIcon from '@mui/icons-material/History';
import AccountIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSnackbar } from 'notistack';
export default function Header({ children }: { children: React.ReactNode }) {
    const [anchor, setAnchor] = useState();
    const [anchorMenu, setAnchorMenu] = useState();
    const open = Boolean(anchor);
    const avatarMenu = Boolean(anchorMenu);
    const { authen, user, logout } = useUserContext();
    const { enqueueSnackbar } = useSnackbar();
    const handleClick = (e: any) => {
        setAnchor(e.currentTarget);
    };
    const handleOpenAvaMenu = (e: any) => {
        setAnchorMenu(e.currentTarget);
    }
    const handleCloseAvaMenu = () => {
        setAnchorMenu(null!);
    }
    const handleClose = () => {
        setAnchor(null!)
    }
    const handleLogout = async () => {
        try {
            await logout();
            enqueueSnackbar('Logout success', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: { vertical: 'bottom', horizontal: 'left' }
            })
            setAnchorMenu(null!);
        } catch (error) {
            enqueueSnackbar('Logout failed', {
                variant: 'error',
                autoHideDuration: 2000,
                anchorOrigin: { vertical: 'bottom', horizontal: 'left' }
            })
        }
    }
    return (
        <Box>
            {user?.role !== "Admin" && (
                <Box sx={{ display: 'flex', padding: '10px', gap: '20px' }}>
                    <img src='logo.png' style={{ width: '10%', marginLeft: '10px' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flex: '1' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '25%', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', gap: '10px' }}>
                                <Box sx={{ display: 'flex', gap: '5px' }}>
                                    <MedicalServicesIcon />
                                    <Typography>Emergency 097 574 3469</Typography>
                                </Box>
                                <Typography> | </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <img src='contactPhone.svg' style={{ width: '10%' }} />
                                    <Typography>Support  097 574 3469 </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Button variant='outlined' sx={{ borderRadius: '30px' }}>Promotion</Button>
                                {authen ? (
                                    <>
                                        <img
                                            id='ava-control'
                                            aria-controls={avatarMenu ? 'ava-menu' : undefined}
                                            src='logo192.png'
                                            alt='avatar'
                                            style={{ borderRadius: '50%', width: '10%', border: '1px solid gray', objectFit: 'cover', cursor: 'pointer' }}
                                            onClick={(e) => handleOpenAvaMenu(e)}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Link href='/login' sx={{ textDecoration: 'none', padding: '2%', ":hover": { backgroundColor: 'lightgray' }, borderRadius: '30px' }}>Login</Link>
                                        <Link href='/register' sx={{ textDecoration: 'none', padding: '2%', ":hover": { backgroundColor: 'lightgray' }, borderRadius: '30px' }}>Register</Link>
                                    </>
                                )}
                                <Menu
                                    id='ava-menu'
                                    open={avatarMenu}
                                    anchorEl={anchorMenu}
                                    onClose={handleCloseAvaMenu}
                                >
                                    <MenuItem>
                                        <ListItemIcon>
                                            <HistoryIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>
                                            History
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <AccountIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>
                                            Account Setting
                                        </ListItemText>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => handleLogout()}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>
                                            Logout
                                        </ListItemText>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                id='menu-control'
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Services
                                {open ? (<ArrowUpIcon fontSize='small' />) : (<ArrowDownIcon fontSize='small' />)}
                            </Button>
                            <Button>Doctors</Button>
                            <Button>Specialist</Button>
                            <Button>Promotional News</Button>
                            <Button>Contact</Button>
                            <Button>About Us</Button>
                            <Menu
                                open={open}
                                id='basic-menu'
                                anchorEl={anchor}
                                onClose={handleClose}
                                slotProps={{
                                    list: {
                                        "aria-labelledby": 'menu-control'
                                    }
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    Make Appointment
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    Give Symptoms
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    Check History
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Box>
            )}
            {user?.role === 'Admin' && (
                <Box sx={{ display: 'flex', padding: '10px', gap: '20px' }}>
                    <img src='logo.png' style={{ width: '10%', marginLeft: '10px' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'end', flex: '1' }}>
                        {authen ? (
                            <img
                                id='ava-control'
                                aria-controls={avatarMenu ? 'ava-menu' : undefined}
                                src='logo192.png'
                                alt='avatar'
                                style={{ borderRadius: '50%', width: '3%', border: '1px solid gray', objectFit: 'cover', cursor: 'pointer' }}
                                onClick={(e) => handleOpenAvaMenu(e)}
                            />
                        ) : (
                            <>
                                <Link href='/login' sx={{ textDecoration: 'none', padding: '2%', ":hover": { backgroundColor: 'lightgray' }, borderRadius: '30px' }}>Login</Link>
                                <Link href='/register' sx={{ textDecoration: 'none', padding: '2%', ":hover": { backgroundColor: 'lightgray' }, borderRadius: '30px' }}>Register</Link>
                            </>
                        )}
                        <Menu
                            id='ava-menu'
                            open={avatarMenu}
                            anchorEl={anchorMenu}
                            onClose={handleCloseAvaMenu}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <HistoryIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>
                                    History
                                </ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <AccountIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>
                                    Account Setting
                                </ListItemText>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => handleLogout()}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>
                                    Logout
                                </ListItemText>
                            </MenuItem>
                        </Menu>
                        <Box>
                            <Button>User List</Button>
                            <Button>Ticket</Button>
                        </Box>
                    </Box>
                </Box>
            )
            }
            <Box sx={{ margin: '5px' }}>
                {children}
            </Box>
            <hr></hr>
        </Box >
    )
}
