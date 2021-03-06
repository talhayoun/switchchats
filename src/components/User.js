import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";

const User = (props) => {
    return (
        <div style={{ display: "flex", gap: "20px", alignItems: 'center' }}>

            <Box>
                <Typography
                    sx={{ color: "#2d4b71", fontSize: "1rem", textAlign: 'right' }}
                    variant="subtitle2"
                >
                    {props?.user?.nickname}
                </Typography>
                <Typography
                    sx={{ color: "#2d4b71", fontSize: "1rem", marginTop: "-5px" }}
                    variant="subtitle1"
                >
                    {props?.isTyping ? "מקליד/ה" : "מחובר/ת"}
                </Typography>
            </Box>
            <Avatar alt="Remy Sharp" src={props.user?.avatarUrl} />
        </div>
    );
};

export default User;
