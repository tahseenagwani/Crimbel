
import {BrowserRouter,Navigate,Routes,Route} from 'react-router-dom'
import HomePage from 'scenes/homePage/index.jsx';
import LoginPage from 'scenes/loginPage/index.jsx';
import ProfilePage from 'scenes/profilePage/index.jsx';
import {useMemo} from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline,ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme.js';

function App() {

  const mode =useSelector((state)=> {return state.mode});
  console.log("mode is ",mode);
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  return (
    <div className="app">
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/profile/:userId" element={<ProfilePage/>} />
        
      </Routes>
      </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
