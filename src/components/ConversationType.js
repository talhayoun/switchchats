const ConversationType = (props) => {
    return (
        <span style={{ color: "#2d4b71", textAlign: "center", direction: "rtl" }}>
            נושא השיחה שלכם הוא: "{props.conversation}"
        </span>
    );
};

export default ConversationType;
