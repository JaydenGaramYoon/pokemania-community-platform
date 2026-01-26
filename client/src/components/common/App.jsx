import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from '../../../MainRouter';

const App = () => {
  return (
    <Router>
      <div style={{ 
        minHeight: '100vh', 
        width: '100%',
        position: 'relative'
      }}>
        <div style={{ 
          minHeight: '100vh',
          paddingBottom: '80px' // add space for footer
        }}>
          <MainRouter />
        </div>
        <footer style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#666",
          fontSize: "11px",
          backgroundColor: "rgba(248, 249, 250, 0.71)",
          backdropFilter: "blur(5px)",
          borderTop: "1px solid rgba(233, 236, 239, 0.8)",
          zIndex: 1000,
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)"
        }}>
          © 2025 Centennial College | <span><img src="/images/TeamLogo.png" alt="TeamLogo" /></span>
          Bright Bridge | COMP 229 | Fall 2025 | All rights reserved.
        </footer>
      </div>
    </Router>
  );
};
export default App;
