import SendIcon from "@mui/icons-material/Send";
import {
    Box,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

const ChatTextfield = (props) => {
    const { socket } = props;
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
                justifyContent: 'center'
            }}
        >
            <SendIcon sx={{ cursor: "pointer" }} onClick={() => props.sendMessage()} />
            <FormControl sx={{ m: 1, width: "80%" }} variant="standard" dir="rtl">
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
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                            >
                                <ReportGmailerrorredIcon onClick={props.reportModal} />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <SwapVertIcon
                onClick={switchHandler}
                sx={{
                    cursor: "pointer",
                }}
            />
        </Box>
    );
};

export default ChatTextfield;
