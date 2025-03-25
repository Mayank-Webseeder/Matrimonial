// auth api's
const SIGNUP_ENDPOINT = "https://api-matrimonial.webseeder.tech/api/v1/user/signUp";
const LOGIN_ENDPOINT = "https://api-matrimonial.webseeder.tech/api/v1/user/signIn";
const OTP_ENDPOINT = "https://api-matrimonial.webseeder.tech/api/v1/user/sendOTP";
const FORGOT_PASSWORD = "https://api-matrimonial.webseeder.tech/api/v1/user/forgotPassword";
const CHANGE_PASSWORD = "https://api-matrimonial.webseeder.tech/api/v1/user/changePassword";
const FEEDBACK = "https://api-matrimonial.webseeder.tech/api/v1/user/create-feedback";

// report 
const REPORT = "https://api-matrimonial.webseeder.tech/api/v1/report/createReport";
// profile's apis
const PROFILE_ENDPOINT = "https://api-matrimonial.webseeder.tech/api/v1/user/view";
const UPLOAD_PROFILE_PHOTO = "https://api-matrimonial.webseeder.tech/api/v1/user/updateProfileImage";
const UPDATE_PROFILE = "https://api-matrimonial.webseeder.tech/api/v1/user/updateProfile";
const DELETE_USER="https://api-matrimonial.webseeder.tech/api/v1/user/deleteUser";
const DELETE_PROFILE_PHOTO="https://api-matrimonial.webseeder.tech/api/v1/user/delete-profileImage";

// biodata api's
const CREATE_PERSONAL_DETAILS = "https://api-matrimonial.webseeder.tech/api/v1/biodata/createPersonalDetails";
const UPDATE_PERSONAL_DETAILS = "https://api-matrimonial.webseeder.tech/api/v1/biodata/updatePersonalDetails";
const CREATE_PARTNER_PERFRENCES = "https://api-matrimonial.webseeder.tech/api/v1/biodata/createPartnerPreferences";
const UPDATE_PARTNER_PERFRENCES = "https://api-matrimonial.webseeder.tech/api/v1/biodata/updatePartnerPreferences";
const GET_BIODATA = "https://api-matrimonial.webseeder.tech/api/v1/biodata/getBiodata";
const GET_ALL_BIODATA_PROFILES = "https://api-matrimonial.webseeder.tech/api/v1/user/feed";
const REPOST = "https://api-matrimonial.webseeder.tech/api/v1/biodata/repostBiodata"
const DELETE_BIODATA = "https://api-matrimonial.webseeder.tech/api/v1/biodata/deleteBioData"
// send & received profiles api's 
// matched profile
const MATCHED_PROFILE = "https://api-matrimonial.webseeder.tech/api/v1/user/profile";
// Receiver end 
const RECEIVER_REQUESTS = "https://api-matrimonial.webseeder.tech/api/v1/connectionRequest/request/recieved"; // get
const REJECTED_API = "https://api-matrimonial.webseeder.tech/api/v1/connectionRequest/review/rejected";
const ACCEPTED_API = "https://api-matrimonial.webseeder.tech/api/v1/connectionRequest/review/accepted";
// Sender end  
const SENDER_REQUESTS = "https://api-matrimonial.webseeder.tech/api/v1/connectionRequest/request/sent" // get
const SEND_REQUEST = "https://api-matrimonial.webseeder.tech/api/v1/connectionRequest/send/interested" // ID PASS KRNA H

// pandit api's
const CREATE_PANDIT = "https://api-matrimonial.webseeder.tech/api/v1/pandit/createPandit";
const GET_ALL_PANDIT_DATA = "https://api-matrimonial.webseeder.tech/api/v1/pandit/getAllPandit";
const PANDIT_REVIEW = "https://api-matrimonial.webseeder.tech/api/v1/pandit/addReviewRating";
const PANDIT_DESCRIPTION = "https://api-matrimonial.webseeder.tech/api/v1/pandit/panditProfileData";
const VIEW_PANDIT = "https://api-matrimonial.webseeder.tech/api/v1/pandit/viewPandit";
const UPDATE_PANDIT = "https://api-matrimonial.webseeder.tech/api/v1/user/update-serviceProfile/Pandit";
const UPDATE_PANDIT_REVIEW = "https://api-matrimonial.webseeder.tech/api/v1/pandit/update-reviewRating";

// jyotish api's
const CREATE_JYOTISH = "https://api-matrimonial.webseeder.tech/api/v1/jyotish/createJyotish";
const GET_ALL_JYOTISH = "https://api-matrimonial.webseeder.tech/api/v1/jyotish/getAllJyotish";
const JYOTISH_REVIEW = "https://api-matrimonial.webseeder.tech/api/v1/jyotish/addReviewRating";
const JYOTISH_DESCRIPTION = "https://api-matrimonial.webseeder.tech/api/v1/jyotish/jyotishProfileData";
const VIEW_JYOTISH = "https://api-matrimonial.webseeder.tech/api/v1/jyotish/viewJyotish";
const UPDATE_JYOTISH = "https://api-matrimonial.webseeder.tech/api/v1/user/update-serviceProfile/Jyotish";
const UPDATE_JYOTISH_REVIEW = "https://api-matrimonial.webseeder.tech/api/v1/jyotish/update-reviewRating";

// pandit api's
const CREATE_KATHAVACHAK = "https://api-matrimonial.webseeder.tech/api/v1/kathavachak/createKathavachak";
const GET_ALL_KATHAVACHAK = "https://api-matrimonial.webseeder.tech/api/v1/kathavachak/getAllKathavachak";
const KATHAVACHAK_REVIEW = "https://api-matrimonial.webseeder.tech/api/v1/kathavachak/addReviewRating";
const KATHAVACHAK_DESCRIPTION = "https://api-matrimonial.webseeder.tech/api/v1/kathavachak/kathavachakProfileData";
const VIEW_KATHAVACHAK = "https://api-matrimonial.webseeder.tech/api/v1/kathavachak/viewKathavachak";
const UPDATE_KATHAVACHAK = "https://api-matrimonial.webseeder.tech/api/v1/user/update-serviceProfile/Kathavachak";
const UPDATE_KATHAVACHAK_REVIEW ="https://api-matrimonial.webseeder.tech/api/v1/kathavachak/update-reviewRating";

// search api is directly integrate 
// filters API's
const SET_PREFRENCE_FILTER_API = "https://api-matrimonial.webseeder.tech/api/v1/user/getMatchProfiles";
const MALE_FILTER_API = "https://api-matrimonial.webseeder.tech/api/v1/user/feed?gender=male";
const FEMALE_FILTER_API = "https://api-matrimonial.webseeder.tech/api/v1/user/feed?gender=female";

// saved api's 
const SAVED_PROFILES = "https://api-matrimonial.webseeder.tech/api/v1/saved/save-profile";
const GET_SAVED__PROFILES = "https://api-matrimonial.webseeder.tech/api/v1/saved/getSavedProfiles";
const DELETE_SAVED_PROFILE = "https://api-matrimonial.webseeder.tech/api/v1/saved/deleteSavedProfiles";

// share api's 
const SHARED_PROFILES = "https://api-matrimonial.webseeder.tech/api/v1/user/share-bioDataprofile"

// activist 
const CREATE_ACTIVIST = "https://api-matrimonial.webseeder.tech/api/v1/activist/createActivist";
const GET_ACTIVIST = "https://api-matrimonial.webseeder.tech/api/v1/activist/viewActivist";
const UPDATE_ACTIVIST = "https://api-matrimonial.webseeder.tech/api/v1/activist/updateActivist";
const GET_ACTIVIST_PROFILES = "https://api-matrimonial.webseeder.tech/api/v1/activist/getAllActivist";
const VERIFY_PROFILE = "https://api-matrimonial.webseeder.tech/api/v1/activist/verify-metrimonialProfile";

// committes
const CREATE_COMMITTEE = "https://api-matrimonial.webseeder.tech/api/v1/committee/createCommittee";
const UPDATE_COMMITTEE = "https://api-matrimonial.webseeder.tech/api/v1/committee/updateCommittee";
const GET_COMMIITEE = "https://api-matrimonial.webseeder.tech/api/v1/committee/viewCommittee";
const GET_ALL_COMITTEE = "https://api-matrimonial.webseeder.tech/api/v1/committee/getAllCommittee"

// dharamsala 
const CREATE_DHARAMSALA = "https://api-matrimonial.webseeder.tech/api/v1/dharmshala/createDharmshala";
const UPDATE_DHARAMSALA = "https://api-matrimonial.webseeder.tech/api/v1/dharmshala/updateDharmshala";
const GET_DHARAMSALA = "https://api-matrimonial.webseeder.tech/api/v1/dharmshala/viewDharmshala";
const GET_ALL_DHARAMSALA = "https://api-matrimonial.webseeder.tech/api/v1/dharmshala/getAllDharmshala"

// get common api for all matrimony profiles for biodata page 
const MATRIMONY_SUMMRARY = "https://api-matrimonial.webseeder.tech/api/v1/user/getMetrimonial-Summary";

// event & news 
const GET_ALL_EVENT_NEWS = "https://api-matrimonial.webseeder.tech/api/v1/event/getAllEventsPost";
const VIEW_EVENT = "https://api-matrimonial.webseeder.tech/api/v1/event/viewPost";
const CREATE_EVENT_NEWS = "https://api-matrimonial.webseeder.tech/api/v1/event/createEventPost";
const UPDATE_EVENT_NEWS = "https://api-matrimonial.webseeder.tech/api/v1/event/updateEventPost";
const LIKEPOST = "https://api-matrimonial.webseeder.tech/api/v1/event/like";
const COMMENTPOST = "https://api-matrimonial.webseeder.tech/api/v1/event/comment";
const DELETE_EVENT = "https://api-matrimonial.webseeder.tech/api/v1/event/delete-eventPost";
// delete comments also done 

// advertise with us 

const ADVERTISE_WITH_US = "https://api-matrimonial.webseeder.tech/api/v1/user/advertise-WithUs";

// privacy settings api
const HIDE_CONTACT = "https://api-matrimonial.webseeder.tech/api/v1/settings/hide-contact";
const HIDE_OPTIONAL_DETAILS = "https://api-matrimonial.webseeder.tech/api/v1/settings/hide-optionalDetails";
const INACTIVE_ID = "https://api-matrimonial.webseeder.tech/api/v1/settings/set-activityStatus";

//notification
const NOTIFICATION = "https://api-matrimonial.webseeder.tech/api/v1/notification/getAllNotification";
const VIEW_NOTIFICATION = "https://api-matrimonial.webseeder.tech/api/v1/notification/seeNotification";
const SEEN_NOTIFICATION = "https://api-matrimonial.webseeder.tech/api/v1/notification/getAllNotification?seen=true";

// notification seetings api
const CONNECTION_REQUEST_HANDLE_API = "https://api-matrimonial.webseeder.tech/api/v1/settings/set-connReqNotification";
const EVENT_NEWS_NOTIFICATION_HANDLE_API = "https://api-matrimonial.webseeder.tech/api/v1/settings/set-eventPostNotification";

export {
    SIGNUP_ENDPOINT,
    LOGIN_ENDPOINT,
    OTP_ENDPOINT,
    FORGOT_PASSWORD,
    CHANGE_PASSWORD,
    FEEDBACK,
    PROFILE_ENDPOINT,
    CREATE_PERSONAL_DETAILS,
    UPDATE_PERSONAL_DETAILS,
    GET_BIODATA,
    CREATE_PARTNER_PERFRENCES,
    UPDATE_PARTNER_PERFRENCES,
    CREATE_PANDIT,
    GET_ALL_PANDIT_DATA,
    PANDIT_REVIEW,
    CREATE_JYOTISH,
    GET_ALL_JYOTISH,
    JYOTISH_REVIEW,
    CREATE_KATHAVACHAK,
    GET_ALL_KATHAVACHAK,
    KATHAVACHAK_REVIEW,
    UPLOAD_PROFILE_PHOTO,
    UPDATE_PROFILE,
    GET_ALL_BIODATA_PROFILES,
    RECEIVER_REQUESTS,
    SENDER_REQUESTS,
    SEND_REQUEST,
    REJECTED_API,
    ACCEPTED_API,
    MATCHED_PROFILE,
    SET_PREFRENCE_FILTER_API,
    MALE_FILTER_API,
    FEMALE_FILTER_API,
    REPOST,
    SAVED_PROFILES,
    GET_SAVED__PROFILES,
    SHARED_PROFILES,
    CREATE_ACTIVIST,
    GET_ACTIVIST,
    UPDATE_ACTIVIST,
    GET_ACTIVIST_PROFILES,
    CREATE_COMMITTEE,
    UPDATE_COMMITTEE,
    GET_COMMIITEE,
    GET_ALL_COMITTEE,
    PANDIT_DESCRIPTION,
    JYOTISH_DESCRIPTION,
    KATHAVACHAK_DESCRIPTION,
    VIEW_JYOTISH,
    VIEW_PANDIT,
    VIEW_KATHAVACHAK,
    UPDATE_PANDIT,
    UPDATE_JYOTISH,
    UPDATE_KATHAVACHAK,
    CREATE_DHARAMSALA,
    UPDATE_DHARAMSALA,
    GET_DHARAMSALA,
    GET_ALL_DHARAMSALA,
    MATRIMONY_SUMMRARY,
    REPORT,
    GET_ALL_EVENT_NEWS,
    VIEW_EVENT,
    UPDATE_EVENT_NEWS,
    CREATE_EVENT_NEWS,
    LIKEPOST,
    COMMENTPOST,
    ADVERTISE_WITH_US,
    DELETE_EVENT,
    DELETE_BIODATA,
    HIDE_CONTACT,
    HIDE_OPTIONAL_DETAILS,
    INACTIVE_ID,
    NOTIFICATION,
    VIEW_NOTIFICATION,
    SEEN_NOTIFICATION,
    VERIFY_PROFILE,
    DELETE_SAVED_PROFILE,
    CONNECTION_REQUEST_HANDLE_API,
    EVENT_NEWS_NOTIFICATION_HANDLE_API,
    UPDATE_PANDIT_REVIEW,
    UPDATE_JYOTISH_REVIEW,
    UPDATE_KATHAVACHAK_REVIEW,
    DELETE_PROFILE_PHOTO,
    DELETE_USER
}