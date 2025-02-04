// auth api's
const SIGNUP_ENDPOINT = "https://api-matrimonial.webseeder.tech/api/v1/user/signUp";
const LOGIN_ENDPOINT = "https://api-matrimonial.webseeder.tech/api/v1/user/signIn";

// profile's apis
const PROFILE_ENDPOINT = "https://api-matrimonial.webseeder.tech/api/v1/user/view";
const UPLOAD_PROFILE_PHOTO=" https://api-matrimonial.webseeder.tech/api/v1/user/updateProfileImage";
const UPDATE_PROFILE="https://api-matrimonial.webseeder.tech/api/v1/user/updateProfile";

// biodata api's
const CREATE_PERSONAL_DETAILS = "https://api-matrimonial.webseeder.tech/api/v1/biodata/createPersonalDetails";
const UPDATE_PERSONAL_DETAILS = "https://api-matrimonial.webseeder.tech/api/v1/biodata/updatePersonalDetails ";
const CREATE_PARTNER_PERFRENCES = "https://api-matrimonial.webseeder.tech/api/v1/biodata/createPartnerPreferences";
const UPDATE_PARTNER_PERFRENCES = "https://api-matrimonial.webseeder.tech/api/v1/biodata/updatePartnerPreferences";
const GET_BIODATA = "https://api-matrimonial.webseeder.tech/api/v1/biodata/getBiodata";
const GET_ALL_BIODATA_PROFILES = "https://api-matrimonial.webseeder.tech/api/v1/biodata/getAllBiodatas";

// send & received profiles api's 
// matched profile
const MATCHED_PROFILE="https://api-matrimonial.webseeder.tech/api/v1/user/profile";
// Receiver end 
const RECEIVER_REQUESTS="https://api-matrimonial.webseeder.tech/api/v1/connectionRequest/request/recieved"; // get
const REJECTED_API="https://api-matrimonial.webseeder.tech/api/v1/connectionRequest/review/rejected";
const ACCEPTED_API="https://api-matrimonial.webseeder.tech/api/v1/connectionRequest/review/accepted";
// Sender end  
const SENDER_REQUESTS="https://api-matrimonial.webseeder.tech/api/v1/connectionRequest/request/sent" // get
const SEND_REQUEST="https://api-matrimonial.webseeder.tech/api/v1/connectionRequest/send/interested" // ID PASS KRNA H
// pandit api's
const CREATE_PANDIT="https://api-matrimonial.webseeder.tech/api/v1/pandit/createPandit";
const GET_ALL_PANDIT_DATA="https://api-matrimonial.webseeder.tech/api/v1/pandit/allPanditProfiles";
const PANDIT_REVIEW="https://api-matrimonial.webseeder.tech/api/v1/pandit/addReviewRating/67811744a9969b543615e651";


export {
    SIGNUP_ENDPOINT,
    LOGIN_ENDPOINT,
    PROFILE_ENDPOINT,
    CREATE_PERSONAL_DETAILS,
    UPDATE_PERSONAL_DETAILS,
    GET_BIODATA,
    CREATE_PARTNER_PERFRENCES,
    UPDATE_PARTNER_PERFRENCES,
    CREATE_PANDIT,
    GET_ALL_PANDIT_DATA,
    PANDIT_REVIEW,
    UPLOAD_PROFILE_PHOTO,
    UPDATE_PROFILE,
    GET_ALL_BIODATA_PROFILES,
    RECEIVER_REQUESTS,
    SENDER_REQUESTS,
    SEND_REQUEST,
    REJECTED_API,
    ACCEPTED_API,
    MATCHED_PROFILE
}