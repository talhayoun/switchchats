import { Button, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";

const Report = (props) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <Modal
            open={props.open}
            onClose={props.close}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper elevation={3} sx={{ minWidth: isDesktop ? '500px' : '300px', minHeight: '500px' }}>
                <Box sx={{ backgroundColor: "#0079c0", padding: '10px' }}>
                    <span onClick={props.close} style={{ cursor: 'pointer', fontSize: '25px', color: "#fff" }}>X</span>
                    <Typography color="#fff" textAlign="center" variant="h5">דיווח על משתמש</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '30px' }} >
                    <TextField label="שם"></TextField>
                    <Select dir="rtl">
                        <MenuItem>פגיעה מילולית</MenuItem>
                        <MenuItem>אחר</MenuItem>
                    </Select>
                    <TextField multiline rows={5} label="תיאור המקרה"></TextField>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '50px' }}>
                    <Button variant="contained">שלח</Button>
                </Box>
            </Paper>
        </Modal >
    )
};

export default Report;