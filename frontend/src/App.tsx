import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import Apartment from './component/Apartment.tsx';
import ApartmentDetail from './component/ApartmentDetail.tsx';
import Login from './component/pages/public/login.tsx';
import Register from './component/pages/public/register.tsx';
import UserProvider from './UserContext.tsx';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, CssBaseline, Button } from '@mui/material';
import { useState } from 'react';
import { lightTheme, darkTheme } from "./layout/theme.tsx";
import PublicRoute from './PublicRoute.tsx';

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
              <Route path='/apartment-list' element={<Apartment />} />
              <Route path='/apartment/edit/:id' element={<ApartmentDetail />} />
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
              <Route path='*' element={<Navigate to="/apartment-list" replace />} />
            </Routes>
          </UserProvider>
        </Router >
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
