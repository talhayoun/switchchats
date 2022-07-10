import Header from "../components/Header";
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Paper,
    Snackbar,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Regulations from "../components/Regulations";
import Cards from "../components/Cards";
import ReactGA from "react-ga";
import { OutbrainWidget } from "react-outbrain-widget";

const Home = () => {
    ReactGA.initialize("G-78SBDDVM0R");
    ReactGA.pageview(window.location.pathname + window.location.search);

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
    const [isRulesDisplay, setIsRulesDisplay] = useState(false);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [snackStatus, setSnackStatus] = useState(false);
    const [regulationVisible, setRegulationVisible] = useState(false);

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/chat");
    };

    const searchChatHandler = () => {
        if (username.length >= 3) {
            localStorage.setItem("nickname", username);
            setIsRulesDisplay(true);
        } else {
            setSnackStatus(true);
            setMessage("שם חייב להיות לפחות 3 תווים");
            setTimeout(() => {
                setSnackStatus(false);
            }, 3000);
        }
    };

    const onChangeUsername = (e) => {
        if (e.key == "Enter") {
            searchChatHandler();
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    overflowX: "hidden",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        width: "100%",
                        maxWidth: "500px",
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: isDesktop ? "20px 150px" : "10px 20px 30px 20px",
                            width: "95%",
                            overflow: "scroll",
                            height: "100vh",
                        }}
                    >
                        <Header />
                        <Typography
                            sx={{
                                margin: 0,
                                fontSize: isDesktop ? "1.4rem" : "16px",
                                color: "#6d8fba",
                                direction: "rtl",
                            }}
                        >
                            למה אתה מחכים? כנסו עכשיו למערכת!
                        </Typography>
                        <Box sx={{ width: isDesktop ? "480px" : "100%" }}>
                            {!isRulesDisplay ? (
                                <>
                                    <Typography
                                        variant="h6"
                                        textAlign
                                        sx={{
                                            fontSize: isDesktop ? "18px" : "14px",
                                            textAlign: "center",
                                            mb: "4px",
                                            color: "#486890",
                                        }}
                                    >
                                        על מנת להתחיל שיחה, בחרו כינוי שיופיע במערכת ולאחר מכן לחצו
                                        על הכפתור למטה
                                    </Typography>
                                    <TextField
                                        value={username}
                                        onKeyDown={(e) => onChangeUsername(e)}
                                        onChange={(e) => setUsername(e.target.value)}
                                        dir="rtl"
                                        variant="standard"
                                        inputProps={{
                                            root: "none",
                                        }}
                                        sx={{
                                            background: "#f3f8ff",
                                            padding: "20px 12px",
                                            borderRadius: "8px",
                                            width: "95%",
                                            border: "0px",
                                            boxShadow: "1px 1px 1px 1px #ccc",
                                        }}
                                        placeholder="הקלד שם..."
                                    ></TextField>
                                </>
                            ) : (
                                <Box
                                    sx={{
                                        margin: "16px 0px",
                                        direction: "rtl",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Checkbox defaultChecked required />
                                    <Typography variant="subtitle2" sx={{ marginRight: "20px" }}>
                                        אני מאשר שקראתי את{" "}
                                        <span
                                            style={{ cursor: "pointer", color: "blue" }}
                                            onClick={() => setRegulationVisible(true)}
                                        >
                                            התקנון
                                        </span>
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        <Button
                            onClick={isRulesDisplay ? handleButtonClick : searchChatHandler}
                            variant="contained"
                            sx={{
                                marginTop: "50px",
                                color: "#fff",
                                minWidth: "180px",
                                padding: "15px 30px",
                                appearance: "none",
                                textDecoration: "none",
                                fontSize: "1.2rem",
                            }}
                        >
                            {isRulesDisplay ? "המשך" : "התחל שיחה"}
                        </Button>
                        <OutbrainWidget />
                        <div
                            class="OUTBRAIN"
                            data-ob-contentUrl="DROP_PERMALINK_HERE"
                            data-widget-id="AR_3"
                            data-ob-installation-key="ADNIMKAJDGAG4GAO6AGG6H5KP"
                        ></div>
                        <script
                            type="text/javascript"
                            async="async"
                            src="https://widgets.outbrain.com/outbrain.js"
                        ></script>
                        <Cards />
                    </Paper>
                </Box>
            </Box>
            <Snackbar
                open={snackStatus}
                autoHideDuration={3000}
                sx={{
                    height: "fit-content",
                    width: "fit-content",
                    top: "20px",
                    left: "45% !important",
                }}
            >
                <Alert sx={{ width: "100%" }} severity="warning">
                    {message}
                </Alert>
            </Snackbar>
            {regulationVisible && (
                <Regulations
                    open={regulationVisible}
                    close={() => setRegulationVisible(false)}
                />
            )}
        </>
    );
};

export default Home;
