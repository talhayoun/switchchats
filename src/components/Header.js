import { Box, Typography } from "@mui/material";
import ReactGA from 'react-ga';
import logo from "../assets/img/background/logo.png"
const Header = (props) => {
    ReactGA.initialize('G-78SBDDVM0R');
    return (
        <Box>
            <img src={logo} style={{ maxHeight: '120px', ...props }} />
        </Box>
        
    );
    
};

export default Header;