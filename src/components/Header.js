import { Box, Typography } from "@mui/material";
import logo from "../assets/img/background/logo.png"
const Header = (props) => {
    return (
        <Box>
            <img src={logo} style={{ maxHeight: '120px', ...props }} />
        </Box>
    );
};

export default Header;