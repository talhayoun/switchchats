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

const ChatTextfield = (props) => {
    const { socket } = props;
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
    const switchHandler = () => {
        socket.emit("leaveRoom");
    };

    return (
        <Box
            sx={{
                width: "100%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: 'center',
                position: isDesktop ? "relative" : "sticky",
                bottom: 0
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
