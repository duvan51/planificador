import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Notes from './pages/Notes';
import Login  from './pages/Login';


import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { Route, Routes, Navigate } from 'react-router-dom';



function App() {

return (    
<div className="App">
  
<Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
      
        {/* Rutas de administración */}
        <Route path="/notes" element={<Notes />}>
          <Route path="/notes" element={<Notes />} />
        </Route>
</Routes>
  
  
  
  <Sidebar>
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem component={<Link to="/notes" />} element={<Notes />}> Notes </MenuItem>
          <MenuItem component={<Link to="#" />}> Calendar</MenuItem>
          <MenuItem component={<Link to="#" />}> E-commerce</MenuItem>
        </Menu>
  </Sidebar>
     
    </div>
  );
}

export default App;
