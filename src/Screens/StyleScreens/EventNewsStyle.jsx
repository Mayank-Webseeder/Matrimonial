import { StyleSheet } from "react-native";
import { SH, SW, SF } from "../../utils/Dimensions";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    disabledButton: {
        backgroundColor: '#ccc',
        opacity: 0.6,
    },
    righticons: {
        flexDirection: 'row',
        alignItems: "center"
    },
    Imagecontainer: {
        marginVertical: SH(10)
    },
    button: {
        backgroundColor: Colors.theme_color,
        borderRadius: 5,
        paddingHorizontal: SW(15),
        marginRight: SW(10),
        justifyContent: 'center',
        paddingVertical: SH(1)
    },
    buttonText: {
        color: Colors.light,
        fontSize: SF(13),
        fontFamily: 'Poppins-Regular',
        textAlign: "center"
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: SW(10),
        marginVertical: SH(10),
        marginBottom: SH(3),
        paddingHorizontal: SW(5),
        paddingVertical: SH(5),
    },
    EventheaderImage: {
        width: SW(50),
        height: SH(50),
        borderRadius: 30,
    },
    cardheader: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    image1: {
        width: SW(160),
        height: SH(150),
        marginRight: 0,
        borderRadius: 2,
    },
    image2: {
        width: SW(320),
        height: SH(150),
        marginRight: 0,
        borderRadius: 2,
    },
    noImageText: {
        color: '#777',
        fontSize: SF(13),
        marginTop: SH(10),
        marginLeft: SW(14)
    },
    captionText: {
        marginHorizontal: SW(7),
        fontSize: SF(12),
        fontFamily: 'Poppins-Regular',
        marginVertical: SH(10)
    },
    name: {
        fontSize: SF(13),
        fontFamily: 'Poppins-Bold',
        marginLeft: SW(10),
    },
    date_time: {
        fontSize: SF(12),
        fontFamily: 'Poppins-Regular',
        marginLeft: SW(10),
    },
    hour: {
        color: 'gray',
        fontSize: SF(12),
        fontFamily: 'Poppins-Regular',
    },
    likeShareComment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SW(10),
        paddingVertical: SH(3)
    },
    likeShare: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareText: {
        fontSize: SF(10),
        color: Colors.dark,
        marginVertical: SH(5),
        marginHorizontal: SW(10),
        fontFamily: "Poppins-Regular",
    },
    bannerImage: {
        width: '100%',
        height: SH(200),
        marginVertical: SH(10),
    },
    loadMoreButton: {
        backgroundColor: Colors.theme_color,
        borderRadius: 5,
        paddingVertical: SH(5),
        marginVertical: SH(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: SW(100)
    },
    loadMoreText: {
        color: Colors.light,
        fontSize: SF(13),
        fontFamily: 'Poppins-Regular',
    },
    bottomSheetContent: {
        paddingVertical: SH(15),
        paddingHorizontal: SW(15),
        backgroundColor: '#fff',
        borderTopLeftRadius: SH(15),
        borderTopRightRadius: SW(15),
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SH(10),
    },
    sheetHeader: {
        fontSize: SF(18),
        fontFamily: "Poppins-Bold",
        color: Colors.dark,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: SH(20),
    },
    emptyText: {
        color: Colors.gray,
        fontSize: SF(14),
    },
    commentRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: SH(10),
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.lightGray,
    },
    profileImage: {
        width: SW(40),
        height: SH(40),
        borderRadius: 20,
        marginRight: SW(10),
    },
    commentDetails: {
        flex: 1,
    },
    nameTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:SH(2),
    },
    userName: {
        fontSize: SF(12),
        fontFamily: "Poppins-Bold",
        color: Colors.black,
        marginRight: SW(8),
    },
    commentTime: {
        fontSize: SF(12),
        color: "gray",
        fontFamily: "Poppins-Regular"
    },
    commentText: {
        fontSize: SF(13),
        color: Colors.dark,
        lineHeight: SH(18),
    },
    bottomSheetContent: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: SW(16),
        paddingTop: SH(10),
    },
    headerContainer: {
        display:"flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SH(10),
    },
    sheetHeader: {
        fontSize: SF(18),
        fontFamily: "poppins-Bold"
    },
    fixedCommentInputContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: SH(10),
        paddingHorizontal: SW(16),
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 25,
        paddingHorizontal: SW(15),
        paddingVertical: SH(8),
        backgroundColor: "#f9f9f9",
    },
    postButton: {
        marginLeft: SW(10),
        backgroundColor: "#007bff",
        paddingVertical: SH(8),
        paddingHorizontal: SW(15),
        borderRadius: 25,
    },
    postButtonText: {
        color: "#fff",
        fontWeight: "bold",
    }, fixedCommentInputContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: SH(10),
        paddingHorizontal: SW(16),
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    commentInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingVertical: SH(10),
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 20,
        paddingVertical: SH(10),
        paddingHorizontal: SW(10),
        marginRight: SW(10),
    },
    postButton: {
        backgroundColor: "#007bff",
        paddingVertical: SH(8),
        paddingHorizontal: SW(15),
        borderRadius: 20,
    },
    postButtonText: {
        color: "#fff",
        fontFamily: "Poppins-Bold"
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)", // Dim background
    },
    modalContent: {
        position: "absolute",
        backgroundColor: "white",
        paddingHorizontal: SW(15),
        paddingVertical: SH(10),
        borderRadius: 10,
        width: SW(150),
        elevation: 5,
    },
    modalOption: {
        paddingHorizontal: SW(10),
        paddingVertical: SH(2),
    },
    optionText: {
        fontSize: SF(15),
        fontFamily: "Poppins-Regular"
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: SH(200),
    },
    emptyText: {
        fontSize: SF(15),
        color: "gray",
        fontFamily: 'Poppins-Regular',
    },
    bottomContainer: {
        paddingBottom: SH(50)
    }
});

export default styles;
