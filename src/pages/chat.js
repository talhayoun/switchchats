import { useNavigate } from "react-router-dom";
import {
    Alert,
    Box,
    Paper,
    Snackbar,
    Tooltip,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import Header from "../components/Header";
import User from "../components/User";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import apiHelper from "../api/api";
import socketIOClient from "socket.io-client";
import Loading from "./loading";
import ConversationType from "../components/ConversationType";
import ChatTextfield from "../components/ChatTextfield";
import Report from "../components/ReportModal";

const conversationTopics = [
    "משחקי מחשב",
    "סרטי בורקס",
    "מערכות יחסים",
    "אהבה",
    "פארק שעשועים",
    "אופנה",
    "אקטואליה",
    "אוכל",
    "בית ספר",
    "צבא",
    "ספורט",
    "שחייה",
];

const initialState = {
    state: {
        nickname: localStorage.getItem("nickname") || "",
        readRules: false,
        home: {
            step: 0,
            rulesBottom: false,
            online: 0,
        },
        emoji: {
            visible: false,
            loading: false,
            gifs: [],
            popularGifs: [],
            recentGifs: [],
            query: "",
            searchOffset: 0,
            activeTab: "gifs",
        },
        chat: {
            loading: false,
            inQueue: false,
            message: "",
            messages: [],
            currentUser: null,
            typing: false,
            peer: null,
            peerTyping: false,
            room: null,
        },
        window: {
            maxHeight: null,
        },
        roomId: "",
        conversationTopic: "",
        reportType: "",
        reportText: "",
    },
};

const Chat = (props) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
    const chatRef = useRef();
    const inputRef = useRef();
    const [state, setState] = useState(initialState);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState();
    const [reportModal, setReportModal] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [peeringTypingTimeout, setPeeringTypingTimeout] = useState(null);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const newSocket = socketIOClient("https://api.switchats.com");
        setSocket(newSocket);
        return () => {
            socket.emit("leaveRoom");
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;
        let userId = uuidv4();
        let username = localStorage.getItem("nickname");
        if (!username) navigate("/");
        if (localStorage.getItem("uid")) {
            userId = localStorage.getItem("uid");
        } else {
            userId = uuidv4();
            localStorage.setItem("uid", userId);
        }

        socket.on(
            "connect",
            () => {
                console.log("[WS] Connected");

                const newUser = {
                    id: userId,
                    nickname: username,
                };

                socket.emit("join", newUser);
            },
            {
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                forceNew: true,
            }
        );

        socket.on("joined", (payload) => {
            setState((prevState) => {
                let cloneState = { ...prevState };
                cloneState.state.chat.currentUser = payload;
                cloneState.state.chat.loading = false;
                cloneState.state.chat.inQueue = true;
                return cloneState;
            });
        });

        socket.on("chatStart", (payload) => {
            apiHelper.attachRoom(payload.room);

            setState((prevState) => {
                let cloneState = { ...prevState };
                cloneState.state.roomId = payload.room;

                cloneState.state.conversationTopic =
                    conversationTopics[payload.room.replace(/\D/g, "")[0]];

                cloneState.state.chat.loading = false;
                cloneState.state.chat.inQueue = false;
                cloneState.state.chat.message = "";
                cloneState.state.chat.messages = [];
                cloneState.state.chat.peer = payload.user;
                cloneState.state.chat.room = payload.room;
                return cloneState;
            });
        });

        socket.on("chatEnd", () => {
            apiHelper.leaveRoom(state.state.roomId);
            setState((prevState) => {
                let cloneState = { ...prevState };
                cloneState.state.chat.loading = false;
                cloneState.state.chat.message = "";
                cloneState.state.chat.messages = [];
                cloneState.state.chat.peer = null;
                cloneState.state.chat.room = null;
                cloneState.state.chat.inQueue = true;
                return cloneState;
            });
            navigate("/ads");
        });

        socket.on("message", (payload) => {
            setState((prevState) => {
                let cloneState = { ...prevState };
                cloneState.state.chat.messages = [
                    ...cloneState.state.chat.messages,
                    payload,
                ];
                return cloneState;
            });
            clearTimeout(typingTimeout);
            setState((prevState) => {
                let cloneState = { ...prevState };
                cloneState.state.chat.peerTyping = false;
                return cloneState;
            });
        });

        socket.on("typingStatus", (payload) => {
            setState((prevState) => {
                let cloneState = { ...prevState };
                cloneState.state.chat.peerTyping = payload;
                return cloneState;
            });
            clearTimeout(peeringTypingTimeout);
            setPeeringTypingTimeout(
                setTimeout(() => {
                    setState((prevState) => {
                        let cloneState = { ...prevState };
                        cloneState.state.chat.peerTyping = false;
                        return cloneState;
                    });
                }, 2000)
            );
        });
    }, [socket]);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [state]);

    const chatInputKeyUp = (e) => {
        if (e.key === "Enter") return sendMessageHandler();

        if (state.state.chat.typing === false) {
            setState((prevState) => {
                let cloneState = { ...prevState };
                cloneState.state.chat.typing = true;
                return cloneState;
            });
            socket.emit("isTyping", true);
            typingTimeoutHandler();
        } else {
            clearTimeout(typingTimeout);
            typingTimeoutHandler();
        }
    };

    const typingTimeoutHandler = () => {
        clearTimeout(typingTimeout);
        setTypingTimeout(
            setTimeout(() => {
                setState((prevState) => {
                    let cloneState = { ...prevState };
                    cloneState.state.chat.typing = false;
                    return cloneState;
                });
            }, 2000)
        );
    };

    const changeNameHandler = () => {
        localStorage.removeItem("nickname");
        localStorage.removeItem("uid");
        socket.emit("leaveRoom");
        navigate("/");
    };

    const sendMessageHandler = () => {
        if (message.length === 0) return;

        const newMessage = {
            type: "text",
            uid: state.state.chat.currentUser.id,
            data: {
                text: message,
            },
        };
        clearTimeout(typingTimeout);
        setState((prevState) => {
            let cloneState = { ...prevState };
            cloneState.state.chat.typing = false;
            return cloneState;
        });
        socket.emit("message", newMessage);
        setMessage("");
    };

    return (
        <>
            {state.state.chat.loading || !state.state.chat.inQueue ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        maxWidth: "500px",
                        height: "100%",
                        margin: "0 auto",
                    }}
                >
                    {isDesktop && <Header height={"150px"} marginBottom={"50px"} />}
                    <Paper
                        sx={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            width: isDesktop ? "90%" : "100%",
                            height: isDesktop ? "550px" : "100%",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "5px",
                                position: isDesktop ? "relative" : "fixed",
                                top: 0,
                                width: "99%",
                                background: "#c8e7f5",
                                zIndex: "999",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    maxWidth: "30px",
                                    marginLeft: "10px",
                                }}
                            >
                                <Tooltip title="יציאה מהצאט">
                                    <HomeIcon
                                        onClick={changeNameHandler}
                                        sx={{
                                            textDecoration: "none",
                                            width: "95%",
                                            margin: "0 auto",
                                            maxWidth: "100px",
                                            color: "#3c5a7f",
                                            cursor: "pointer",
                                            marginBottom: "3%",
                                            textAlign: "center",
                                            fontSize: "35px",
                                        }}
                                    />
                                </Tooltip>
                            </Box>
                            <User
                                user={state.state.chat.peer}
                                isTyping={state.state.chat.peerTyping}
                            />
                        </Box>
                        <Box
                            className="chatblock"
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                padding: "5px",

                            }}
                        >
                            <ConversationType
                                conversation={state?.state?.conversationTopic}
                            />
                            <Box
                                ref={chatRef}
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    flexDirection: "column",
                                    overflow: "auto",
                                    width: "100%",
                                    maxHeight: isDesktop ? "400px" : "90%",
                                    minHeight: "400px",
                                    marginTop: isDesktop ? "0px" : "4rem"
                                }}
                            >
                                {state.state.chat.messages.length > 0 &&
                                    state.state.chat.messages.map((curMessage, index) => (
                                        <p
                                            key={index}
                                            style={{
                                                direction: "rtl",
                                                alignSelf:
                                                    state.state.chat.currentUser.id === curMessage.uid
                                                        ? "end"
                                                        : "flex-start",
                                                margin: "5px 10px 5px 0px",
                                                maxWidth: "65%",
                                                fontSize: "1.1rem",
                                                overflowWrap: "break-word",
                                                width: "fit-content",
                                                padding: "6px 15px",
                                                borderRadius: "6px",
                                                backgroundColor:
                                                    state.state.chat.currentUser.id === curMessage.uid
                                                        ? "#b4cbee"
                                                        : "#CBC3E3",
                                            }}
                                        >
                                            {curMessage.data?.text}
                                        </p>
                                    ))}
                            </Box>
                        </Box>
                        <ChatTextfield
                            keyDown={chatInputKeyUp}
                            message={message}
                            onChangeMessage={setMessage}
                            sendMessage={sendMessageHandler}
                            socket={socket}
                            reportModal={() => setReportModal(true)}
                        />
                    </Paper>
                </Box>
            ) : (
                <Loading />
            )}
            {reportModal && (
                <Report
                    setShowSnackBar={setShowSnackBar}
                    open={reportModal}
                    close={() => setReportModal(false)}
                />
            )}
            {showSnackBar && (
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    key={"top" + "center"}
                    open={showSnackBar}
                    autoHideDuration={6000}
                    onClose={() => setShowSnackBar(false)}
                >
                    <Alert
                        onClose={() => setShowSnackBar(false)}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        הדיווח נשלח ויוטפל בהקדם
                    </Alert>
                </Snackbar>
            )}
        </>
    );
};

export default Chat;
