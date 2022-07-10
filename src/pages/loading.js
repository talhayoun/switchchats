import Header from "../components/Header";
import { Box, Typography } from "@mui/material";

const Loading = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Header />
                <div class="lds-ripple" style={{ marginTop: '30px', marginBottom: '20px' }}><div></div><div></div></div>
                <Typography variant="h6" sx={{ marginTop: '10px', color: "#820096" }}>
                    ...אנחנו מחפשים לך שותף/ה לשיחה
                </Typography>
            </Box>
        </Box>
    );
};

export default Loading;
