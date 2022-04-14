import { Box, Button } from "@mui/material";

const SwitchButton = () => {
    return (
        <Box
            sx={{
                position: "absolute",
                left: "48%",
                zIndex: '999'
            }}
        >
            <button
                style={{
                    padding: "0px",
                    color: "#fff",
                    boxShadow: "0 0 8px rgb(237 55 22 / 48%)",
                    textAlign: "center",
                    border: "3px solid #fff",
                    backgroundColor: "#ed3416",
                    outline: "none",
                    borderRadius: "50%",
                    height: "72px",
                    width: "72px",
                    fontSize: "14px",
                    cursor: "pointer",
                }}
            >
                Switch
            </button>
        </Box>
    );
};

export default SwitchButton;
