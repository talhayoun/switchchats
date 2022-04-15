
import {
    Alert,
    Button,
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

const Report = (props) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
    const [select, setSelect] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [alert, setAlert] = useState(false);
    const handleClick = () => {
        if (name.length === 0 || description.length === 0) return setAlert(true)
        props.setShowSnackBar(true);
        props.close();
    };
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.close}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <Paper
                    elevation={3}
                    sx={{ minWidth: isDesktop ? "500px" : "300px", minHeight: "500px" }}
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
                        <TextField
                            dir="rtl"
                            label="שם"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Select
                            dir="rtl"
                            value={select}
                            onChange={(e) => setSelect(e.target.value)}
                        >
                            <MenuItem value="פגיעה מילולית">פגיעה מילולית</MenuItem>
                            <MenuItem value="אחר">אחר</MenuItem>
                        </Select>
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
            {alert && <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                key={'top' + 'center'}
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
            </Snackbar>}
        </>
    );
};

export default Report;
