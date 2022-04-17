import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import firstImg from "../assets/1.png";
import secondImg from "../assets/2.png";
import thirdImg from "../assets/3.png";

const Cards = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
    return (
        <Box
            sx={{
                display: "flex",
                gap: "30px",
                paddingBottom: "20px",
                flexDirection: isDesktop ? "row" : "column",
                marginTop: isDesktop ? "10px" : "20px",
                minWidth: '300px'
            }}
        >
            <Card sx={{ maxWidth: 345, direction: 'rtl' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={firstImg}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        סקיפי היא רשת חברתית ישראלית המאפשרת לאנשים מכל הארץ לדון על כל
                        נושא, לפתח קשרים חברתיים ואפילו עסקיים. הרשת החברתית סקיפי הוקמה
                        בשנת 2022 ומידי יום גולשים במערכת אלפי משתמשים.
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: 345, direction: 'rtl' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={secondImg}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        סקיפי חרטה על דגלה את בטחון המשתמשים במערכת ועושה מאמצים רבים על מנת
                        לשמור על אבטחת המשתמשים. מערכת השיח של סקיפי מאובטחת וצוות המערכת
                        במעקב קבוע על כלל דיווחי המשתמשים במערכת
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: 345, direction: 'rtl' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={thirdImg}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        הרשת החברתית סקיפי עתידה להתרחב ולהיות בעלת שלל אופציות חדשניות
                        ביותר אשר יאפשרו למשתמשים לנהל דו שיח ולהשמיע את קולם בצורה הנוחה
                        ביותר.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};
export default Cards;
