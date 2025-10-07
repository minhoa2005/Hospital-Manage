import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import Apartment from './component/Apartment.tsx';
import ApartmentDetail from './component/ApartmentDetail.tsx';
import Login from './component/pages/public/login.tsx';
import Register from './component/pages/public/register.tsx';
import UserProvider from './UserContext.tsx';
import { useEffect } from 'react';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path='/apartment-list' element={<Apartment />} />
          <Route path='/apartment/edit/:id' element={<ApartmentDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to="/apartment-list" replace />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
