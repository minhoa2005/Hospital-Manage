import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import Login from './component/pages/public/Login.tsx';
import Register from './component/pages/public/Register.tsx';
import UserProvider from './UserContext.tsx';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, CssBaseline, Button } from '@mui/material';
import { useState } from 'react';
import { lightTheme, darkTheme } from "./layout/theme.tsx";
import PublicRoute from './PublicRoute.tsx';
import PrivateRoute from './PrivateRoute.tsx';
import OtpPage from './component/pages/public/OtpPage.tsx';
import ForgotPassword from './component/pages/public/ForgotPassword.tsx';
import RecoverPassword from './component/pages/public/RecoverPassword.tsx';
import Apartment from './component/Apartment.tsx';
import ApartmentDetail from './component/ApartmentDetail.tsx';

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    setIsDark(!isDark);
  }
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <div style={{ padding: 20 }}>
        <Button variant="contained" onClick={toggleTheme}>
          Chuyển sang {isDark ? "Light" : "Dark"} Mode
        </Button>
      </div>
      <SnackbarProvider>
        <Router>
          <UserProvider>
            <Routes>
              <Route path='/apartment-list' element={
                <PrivateRoute>
                  <Apartment />
                </PrivateRoute>
              } />
              <Route path='/apartment/edit/:id' element={
                <PrivateRoute>
                  <ApartmentDetail />
                </PrivateRoute>
              } />
              <Route path='/login' element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
              />
              <Route path='/register' element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              <Route path='/forgot-password' element={<PublicRoute><ForgotPassword /></PublicRoute>} />
              <Route path='/verify-Otp' element={<PublicRoute><OtpPage /></PublicRoute>} />
              <Route path='/reset-password' element={<PublicRoute><RecoverPassword /></PublicRoute>} />
              <Route path='*' element={<Navigate to="/login" replace />} />
            </Routes>
          </UserProvider>
        </Router >
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
