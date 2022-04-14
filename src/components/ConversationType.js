import { Box } from "@mui/material";

const ConversationType = () => {
    return (
        <Box
            sx={{
                marginBottom: '20px',
                paddingTop: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <span style={{ color: "#2d4b71" }}>
                נושא השיחה שלכם הוא: "בית ספר"
            </span>
        </Box>
    );
};

export default ConversationType;