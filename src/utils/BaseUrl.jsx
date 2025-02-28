// auth api's
const SIGNUP_ENDPOINT = "https://api-matrimonial.webseeder.tech/api/v1/user/signUp";
const LOGIN_ENDPOINT = "https://api-matrimonial.webseeder.tech/api/v1/user/signIn";
const OTP_ENDPOINT = "https://api-matrimonial.webseeder.tech/api/v1/user/sendOTP";
const FORGOT_PASSWORD="https://api-matrimonial.webseeder.tech/api/v1/user/forgotPassword"

// profile's apis
const PROFILE_ENDPOINT = "https://api-matrimonial.webseeder.tech/api/v1/user/view";
const UPLOAD_PROFILE_PHOTO = " https://api-matrimonial.webseeder.tech/api/v1/user/updateProfileImage";
const UPDATE_PROFILE = "https://api-matrimonial.webseeder.tech/api/v1/user/updateProfile";

// biodata api's
const CREATE_PERSONAL_DETAILS = "https://api-matrimonial.webseeder.tech/api/v1/biodata/createPersonalDetails";
const UPDATE_PERSONAL_DETAILS = "https://api-matrimonial.webseeder.tech/api/v1/biodata/updatePersonalDetails";
const CREATE_PARTNER_PERFRENCES = "https://api-matrimonial.webseeder.tech/api/v1/biodata/createPartnerPreferences";
const UPDATE_PARTNER_PERFRENCES = "https://api-matrimonial.webseeder.tech/api/v1/biodata/updatePartnerPreferences";
const GET_BIODATA = "https://api-matrimonial.webseeder.tech/api/v1/biodata/getBiodata";
const GET_ALL_BIODATA_PROFILES = "https://api-matrimonial.webseeder.tech/api/v1/user/feed";
const REPOST = "https://api-matrimonial.webseeder.tech/api/v1/biodata/repostBiodata"

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
const CREATE_PANDIT ="https://api-matrimonial.webseeder.tech/api/v1/pandit/createPandit";
const GET_ALL_PANDIT_DATA ="https://api-matrimonial.webseeder.tech/api/v1/pandit/getAllPandit";
const PANDIT_REVIEW ="https://api-matrimonial.webseeder.tech/api/v1/pandit/addReviewRating ";
const PANDIT_DESCRIPTION ="https://api-matrimonial.webseeder.tech/api/v1/pandit/panditProfileData";
const VIEW_PANDIT="https://api-matrimonial.webseeder.tech/api/v1/pandit/viewPandit"
const UPDATE_PANDIT="https://api-matrimonial.webseeder.tech/api/v1/user/update-serviceProfile/Pandit";

// jyotish api's
const CREATE_JYOTISH ="https://api-matrimonial.webseeder.tech/api/v1/jyotish/createJyotish";
const GET_ALL_JYOTISH="https://api-matrimonial.webseeder.tech/api/v1/jyotish/getAllJyotish";
const JYOTISH_REVIEW ="https://api-matrimonial.webseeder.tech/api/v1/jyotish/addReviewRating";
const JYOTISH_DESCRIPTION="https://api-matrimonial.webseeder.tech/api/v1/jyotish/jyotishProfileData";
const VIEW_JYOTISH="https://api-matrimonial.webseeder.tech/api/v1/jyotish/viewJyotish";
const UPDATE_JYOTISH="https://api-matrimonial.webseeder.tech/api/v1/user/update-serviceProfile/Jyotish";

// pandit api's
const CREATE_KATHAVACHAK="https://api-matrimonial.webseeder.tech/api/v1/kathavachak/createKathavachak";
const GET_ALL_KATHAVACHAK="https://api-matrimonial.webseeder.tech/api/v1/kathavachak/getAllKathavachak";
const KATHAVACHAK_REVIEW ="https://api-matrimonial.webseeder.tech/api/v1/kathavachak/addReviewRating";
const KATHAVACHAK_DESCRIPTION =" https://api-matrimonial.webseeder.tech/api/v1/kathavachak/kathavachakProfileData";
const VIEW_KATHAVACHAK="https://api-matrimonial.webseeder.tech/api/v1/kathavachak/viewKathavachak";
const UPDATE_KATHAVACHAK="https://api-matrimonial.webseeder.tech/api/v1/user/update-serviceProfile/Kathavachak";

// search api is directly integrate 
// filters API's
const SET_PREFRENCE_FILTER_API = "https://api-matrimonial.webseeder.tech/api/v1/user/getMatchProfiles";
const MALE_FILTER_API = "https://api-matrimonial.webseeder.tech/api/v1/user/feed?gender=male";
const FEMALE_FILTER_API = "https://api-matrimonial.webseeder.tech/api/v1/user/feed?gender=female";

// saved api's 
const SAVED_PROFILES = "https://api-matrimonial.webseeder.tech/api/v1/saved/save-profile";
const GET_SAVED__PROFILES = "https://api-matrimonial.webseeder.tech/api/v1/saved/getSavedProfiles";

// share api's 
const SHARED_PROFILES = "https://api-matrimonial.webseeder.tech/api/v1/user/share-bioDataprofile"

// activist 
const CREATE_ACTIVIST = "https://api-matrimonial.webseeder.tech/api/v1/activist/createActivist";
const GET_ACTIVIST = "https://api-matrimonial.webseeder.tech/api/v1/activist/viewActivist";
const UPDATE_ACTIVIST = "https://api-matrimonial.webseeder.tech/api/v1/activist/updateActivist";
const GET_ACTIVIST_PROFILES = "https://api-matrimonial.webseeder.tech/api/v1/activist/getAllActivist";

// committes
const CREATE_COMMITTEE = "https://api-matrimonial.webseeder.tech/api/v1/committee/createCommittee";
const UPDATE_COMMITTEE = "https://api-matrimonial.webseeder.tech/api/v1/committee/updateCommittee";
const GET_COMMIITEE = "https://api-matrimonial.webseeder.tech/api/v1/committee/viewCommittee";
const GET_ALL_COMITTEE = "https://api-matrimonial.webseeder.tech/api/v1/committee/getAllCommittee"

// dharamsala 
const CREATE_DHARAMSALA = "https://api-matrimonial.webseeder.tech/api/v1/dharmshala/createDharmshala";
const UPDATE_DHARAMSALA = " https://api-matrimonial.webseeder.tech/api/v1/dharmshala/updateDharmshala";
const GET_DHARAMSALA = " https://api-matrimonial.webseeder.tech/api/v1/dharmshala/viewDharmshala";
const GET_ALL_DHARAMSALA = "https://api-matrimonial.webseeder.tech/api/v1/dharmshala/getAllDharmshala"

export {
    SIGNUP_ENDPOINT,
    LOGIN_ENDPOINT,
    OTP_ENDPOINT,
    FORGOT_PASSWORD,
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
    GET_ALL_DHARAMSALA
}