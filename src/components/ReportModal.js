import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    Snackbar,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const theme = createTheme({
    direction: "rtl",
});

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

const Report = (props) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
    const [select, setSelect] = useState();
    const [description, setDescription] = useState("");
    const [alert, setAlert] = useState(false);

    const handleClick = () => {
        if (description.length === 0) return setAlert(true);
        props.setShowSnackBar(true);
        props.close();
    };
    return (
        <>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <Modal
                        dir={"rtl"}
                        open={props.open}
                        onClose={props.close}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                minWidth: isDesktop ? "500px" : "300px",
                                minHeight: "500px",
                            }}
                        >
                            <Box sx={{ backgroundColor: "#0079c0", padding: "10px" }}>
                                <span
                                    onClick={props.close}
                                    style={{ cursor: "pointer", fontSize: "25px", color: "#fff" }}
                                >
                                    X
                                </span>
                                <Typography color="#fff" textAlign="center" variant="h5">
                                    דיווח על משתמש
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "40px",
                                    padding: "30px",
                                }}
                            >
                                <FormControl>
                                    <InputLabel id="report">בחירת סיבת דיווח</InputLabel>
                                    <Select
                                        id="report"
                                        label={"בחירת סיבת דיווח"}
                                        value={select}
                                        onChange={(e) => setSelect(e.target.value)}
                                    >
                                        <MenuItem dir="rtl" value="פגיעה מילולית">
                                            פגיעה מילולית
                                        </MenuItem>
                                        <MenuItem dir="rtl" value=" אחר">
                                            אחר
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    multiline
                                    rows={5}
                                    label="תיאור המקרה"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingBottom: "50px",
                                }}
                            >
                                <Button onClick={handleClick} variant="contained">
                                    שלח
                                </Button>
                            </Box>
                        </Paper>
                    </Modal>
                    {alert && (
                        <Snackbar
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            key={"top" + "center"}
                            open={alert}
                            autoHideDuration={6000}
                            onClose={() => setAlert(false)}
                        >
                            <Alert
                                onClose={() => setAlert(false)}
                                severity="error"
                                sx={{ width: "100%" }}
                            >
                                אנא מלא/י את כל השדות
                            </Alert>
                        </Snackbar>
                    )}
                </ThemeProvider>
            </CacheProvider>
        </>
    );
};

export default Report;
