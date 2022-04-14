import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";

const User = (props) => {
    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <Avatar alt="Remy Sharp" src={props.user?.avatarUrl} />
            <Box>
                <Typography
                    sx={{ color: "#2d4b71", fontSize: "1rem" }}
                    variant="subtitle2"
                >
                    {props?.user?.nickname || "דוד"}
                </Typography>
                <Typography
                    sx={{ color: "#2d4b71", fontSize: "1rem", marginTop: "-5px" }}
                    variant="subtitle1"
                >
                    {props?.isTyping ? "מקליד/ה" : "מחובר/ת"}
                </Typography>
            </Box>
        </div>
    );
};

export default User;
