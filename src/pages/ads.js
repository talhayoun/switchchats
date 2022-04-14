import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Ads = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ width: "100vw", height: "100vh" }}>
            <Box
                sx={{
                    height: "85%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <Header />
                <Typography variant="h6" textAlign dir="rtl">
                    השיחה סתיימה וזה הזמן להתחיל שיחה עם מישהו/י חדש/ה
                </Typography>
                <Typography variant="subtitle2">
                    על מנת להתחיל שיחה חדשה, לחצו על הכפתור למטה
                </Typography>
                <center style={{ marginTop: '50px', marginBottom: '50px' }}>
                    <iframe
                        src="https://www.noar-il.co.il/flappy/ads.html"
                        width="98%"
                        height="300"
                        frameBorder="0"
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
