import { Box, Typography } from "@mui/material";
import logo from "../assets/img/background/logo.png"
const Header = () => {
    return (
        <Box>
            <img src={logo} style={{ maxHeight: '300px' }} />
        </Box>
    );
};

export default Header;