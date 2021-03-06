import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { OutbrainWidget } from 'react-outbrain-widget';


const Ads = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const navigate = useNavigate();
    return (
        <Box sx={{ height: "100vh" }}>
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "center",
                    flexDirection: "column",
                    overflow: 'hidden'
                }}
            >
                <Header height={'200px'} />
                <Typography variant="h6" textAlign="center" dir="rtl" sx={{ fontSize: isDesktop ? '18px' : '14px' }}>
                    השיחה סתיימה וזה הזמן להתחיל שיחה עם מישהו/י חדש/ה
                </Typography>
                <Typography variant="subtitle2">
                    על מנת להתחיל שיחה חדשה, לחצו על הכפתור למטה
                </Typography>

                <OutbrainWidget
                />
                <div class="OUTBRAIN"
                    data-ob-contentUrl="DROP_PERMALINK_HERE"
                    data-widget-id="AR_3"
                    data-ob-installation-key="ADNIMKAJDGAG4GAO6AGG6H5KP"
                ></div>
                <script type="text/javascript" async="async" src="https://widgets.outbrain.com/outbrain.js"></script>
                <Button
                    variant="contained"
                    sx={{
                        marginTop: "42px",
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
