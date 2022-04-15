import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Ads = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const navigate = useNavigate();
    return (
        <Box sx={{ width: "100vw", height: "100vh" }}>
            <Box
                sx={{
                    height: "85%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                }}
            >
                <Header />
                <Typography variant="h6" textAlign="center" dir="rtl" sx={{ fontSize: isDesktop ? '18px' : '14px' }}>
                    השיחה סתיימה וזה הזמן להתחיל שיחה עם מישהו/י חדש/ה
                </Typography>
                <Typography variant="subtitle2">
                    על מנת להתחיל שיחה חדשה, לחצו על הכפתור למטה
                </Typography>
                <center style={{ height: '200px' }}>
                    <iframe
                        src="https://www.noar-il.co.il/flappy/ads.html"
                        width="85%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"

                    ></iframe>
                </center>
                <Button
                    variant="contained"
                    sx={{
                        marginTop: "50px",
                        padding: "15px 30px",
                        backgroundColor: "#C70039",
                    }}
                    onClick={() => navigate("/chat")}
                >
                    התחלת שיחה חדשה
                </Button>
            </Box>
        </Box>
    );
};
export default Ads;
