import SendIcon from "@mui/icons-material/Send";
import {
    Box,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { useNavigate } from "react-router-dom";

const ChatTextfield = (props) => {
    const { socket } = props;
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
    const navigate = useNavigate();
    const switchHandler = () => {
        socket.emit("leaveRoom");
        navigate("/ads");
    };

    // const onFocusHandler = () => {
    //     window.scrollTo(0, 0);
    // }

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: 'center',
                position: 'fixed',
                // position: isDesktop ? "relative" : "fixed",
                bottom: 0,
                background: "#fff"
            }}
        >
            <SwapVertIcon
                onClick={switchHandler}
                sx={{
                    cursor: "pointer",
                    border: "1px solid black",
                    borderRadius: '10px',
                    fontSize: '2rem'
                }}
            />

            <FormControl sx={{ m: 1, width: "75%" }} variant="standard" dir="rtl">
                <Input
                    // onFocus={onFocusHandler}
                    onKeyDown={props.keyDown}
                    sx={{
                        backgroundColor: "#f1f3f6",
                        borderRadius: "20px",
                        padding: "5px",
                    }}
                    id="standard-adornment-password"
                    type="text"
                    value={props.message}
                    onChange={(e) => props.onChangeMessage(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end" style={{ marginLeft: 0 }}>
                            <IconButton
                                aria-label="toggle password visibility"
                            >
                                <ReportGmailerrorredIcon onClick={props.reportModal} />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <SendIcon sx={{ cursor: "pointer" }} onClick={() => props.sendMessage()} />
        </Box>
    );
};

export default ChatTextfield;
