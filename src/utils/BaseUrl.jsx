// deeplinking url for sharing app is
export const DeepLink = 'https://profile.brahminmilan.in/app/profile';

// for show the image
const PHOTO_URL = 'https://api-matrimonial.webseeder.tech';

const BASE_URL = 'https://api-matrimonial.webseeder.tech/api/v1';
// const BASE_URL = "https://matrimonial-backend-oikh.onrender.com/api/v1";
// auth api's
const SIGNUP_ENDPOINT = `${BASE_URL}/user/signUp`;
const LOGIN_ENDPOINT = `${BASE_URL}/user/signIn`;
const OTP_ENDPOINT = `${BASE_URL}/user/sendOTP`;
const FORGOT_PASSWORD = `${BASE_URL}/user/forgotPassword`;
const FORGOT_PASSWORD_OTP = `${BASE_URL}/user/sendResetOTP`;
const CHANGE_PASSWORD = `${BASE_URL}/user/changePassword`;
const FEEDBACK = `${BASE_URL}/user/create-feedback`;

// report
const REPORT = `${BASE_URL}/report/createReport`;

// profile's apis
const PROFILE_ENDPOINT = `${BASE_URL}/user/view`;
const UPLOAD_PROFILE_PHOTO = `${BASE_URL}/user/updateProfileImage`;
const UPDATE_PROFILE = `${BASE_URL}/user/updateProfile`;
const DELETE_USER = `${BASE_URL}/user/deleteUser`;
const DELETE_PROFILE_PHOTO = `${BASE_URL}/user/delete-profileImage`;
const PROFILE_TYPE = `${BASE_URL}/user/profiles`;

// biodata api's
const CREATE_PERSONAL_DETAILS = `${BASE_URL}/biodata/createPersonalDetails`;
const UPDATE_PERSONAL_DETAILS = `${BASE_URL}/biodata/updatePersonalDetails`;
const CREATE_PARTNER_PERFRENCES = `${BASE_URL}/biodata/createPartnerPreferences`;
const UPDATE_PARTNER_PERFRENCES = `${BASE_URL}/biodata/updatePartnerPreferences`;
const GET_BIODATA = `${BASE_URL}/biodata/getBiodata`;
const GET_ALL_BIODATA_PROFILES = `${BASE_URL}/user/feed`;
const REPOST = `${BASE_URL}/biodata/repostBiodata`;
const DELETE_BIODATA = `${BASE_URL}/biodata/deleteBioData`;
const GET_BIODATA_BY_ID = `${BASE_URL}/biodata/getBiodataByUserId`;

// send & received profiles APIs
const MATCHED_PROFILE = `${BASE_URL}/user/profile`;
const RECEIVER_REQUESTS = `${BASE_URL}/connectionRequest/request/recieved`;
const REJECTED_API = `${BASE_URL}/connectionRequest/review/rejected`;
const ACCEPTED_API = `${BASE_URL}/connectionRequest/review/accepted`;
const SENDER_REQUESTS = `${BASE_URL}/connectionRequest/request/sent`;
const SEND_REQUEST = `${BASE_URL}/connectionRequest/send/interested`;
const DELETE_SEND_REQUEST = `${BASE_URL}/connectionRequest/delete/connection`;
// pandit APIs
const CREATE_PANDIT = `${BASE_URL}/pandit/createPandit`;
const GET_ALL_PANDIT_DATA = `${BASE_URL}/pandit/getAllPandit`;
const PANDIT_REVIEW = `${BASE_URL}/pandit/addReviewRating`;
const PANDIT_DESCRIPTION = `${BASE_URL}/pandit/panditProfileData`;
const VIEW_PANDIT = `${BASE_URL}/pandit/viewPandit`;
const UPDATE_PANDIT = `${BASE_URL}/user/update-serviceProfile/Pandit`;
const UPDATE_PANDIT_REVIEW = `${BASE_URL}/pandit/update-reviewRating`;

// jyotish APIs
const CREATE_JYOTISH = `${BASE_URL}/jyotish/createJyotish`;
const GET_ALL_JYOTISH = `${BASE_URL}/jyotish/getAllJyotish`;
const JYOTISH_REVIEW = `${BASE_URL}/jyotish/addReviewRating`;
const JYOTISH_DESCRIPTION = `${BASE_URL}/jyotish/jyotishProfileData`;
const VIEW_JYOTISH = `${BASE_URL}/jyotish/viewJyotish`;
const UPDATE_JYOTISH = `${BASE_URL}/user/update-serviceProfile/Jyotish`;
const UPDATE_JYOTISH_REVIEW = `${BASE_URL}/jyotish/update-reviewRating`;

// kathavachak APIs
const CREATE_KATHAVACHAK = `${BASE_URL}/kathavachak/createKathavachak`;
const GET_ALL_KATHAVACHAK = `${BASE_URL}/kathavachak/getAllKathavachak`;
const KATHAVACHAK_REVIEW = `${BASE_URL}/kathavachak/addReviewRating`;
const KATHAVACHAK_DESCRIPTION = `${BASE_URL}/kathavachak/kathavachakProfileData`;
const VIEW_KATHAVACHAK = `${BASE_URL}/kathavachak/viewKathavachak`;
const UPDATE_KATHAVACHAK = `${BASE_URL}/user/update-serviceProfile/Kathavachak`;
const UPDATE_KATHAVACHAK_REVIEW = `${BASE_URL}/kathavachak/update-reviewRating`;

// filters APIs
const SET_PREFRENCE_FILTER_API = `${BASE_URL}/user/getMatchProfiles`;
const MALE_FILTER_API = `${BASE_URL}/user/feed?gender=male`;
const FEMALE_FILTER_API = `${BASE_URL}/user/feed?gender=female`;

// saved APIs
const SAVED_PROFILES = `${BASE_URL}/saved/save-profile`;
const GET_SAVED__PROFILES = `${BASE_URL}/saved/getSavedProfiles`;
const DELETE_SAVED_PROFILE = `${BASE_URL}/saved/deleteSavedProfiles`;

// share
const SHARED_PROFILES = `${BASE_URL}/user/share-bioDataprofile`;
const SUCESS_STORIES = `${BASE_URL}/user/get-successStories`;
const POST_SUCESS_sTORY = `${BASE_URL}/user/create-successStory`;
const MY_SUCCESS_STORY = `${BASE_URL}/user/get-successStories?myStory=true`;
const DELETE_SUCCESS_STORY = `${BASE_URL}/user/delete-successStory`;

// activist APIs
const CREATE_ACTIVIST = `${BASE_URL}/activist/createActivist`;
const GET_ACTIVIST = `${BASE_URL}/activist/viewActivist`;
const UPDATE_ACTIVIST = `${BASE_URL}/activist/updateActivist`;
const GET_ACTIVIST_PROFILES = `${BASE_URL}/activist/getAllActivist`;
const VERIFY_PROFILE = `${BASE_URL}/activist/verify-metrimonialProfile`;

// committee APIs
const CREATE_COMMITTEE = `${BASE_URL}/committee/createCommittee`;
const UPDATE_COMMITTEE = `${BASE_URL}/committee/updateCommittee`;
const GET_COMMIITEE = `${BASE_URL}/committee/viewCommittee`;
const GET_ALL_COMITTEE = `${BASE_URL}/committee/getAllCommittee`;
const DELETE_COMMITTEE = `${BASE_URL}/committee/delete-Committee`;

// dharamsala APIs
const CREATE_DHARAMSALA = `${BASE_URL}/dharmshala/createDharmshala`;
const UPDATE_DHARAMSALA = `${BASE_URL}/dharmshala/updateDharmshala`;
const GET_DHARAMSALA = `${BASE_URL}/dharmshala/viewDharmshala`;
const GET_ALL_DHARAMSALA = `${BASE_URL}/dharmshala/getAllDharmshala`;
const VIEW_DHARAMSALA = `${BASE_URL}/dharmshala/getDharmshalaById`;
const DELETE_DHARAMSALA = `${BASE_URL}/dharmshala/delete-Dharmshala`;

// summary
const MATRIMONY_SUMMRARY = `${BASE_URL}/user/getMetrimonial-Summary`;

// events & news
const GET_ALL_EVENT_NEWS = `${BASE_URL}/event/getAllEventsPost`;
const VIEW_EVENT = `${BASE_URL}/event/viewPost`;
const CREATE_EVENT_NEWS = `${BASE_URL}/event/createEventPost`;
const UPDATE_EVENT_NEWS = `${BASE_URL}/event/updateEventPost`;
const LIKEPOST = `${BASE_URL}/event/like`;
const COMMENTPOST = `${BASE_URL}/event/comment`;
const DELETE_EVENT = `${BASE_URL}/event/delete-eventPost`;
const VIEW_LIKE_COMMENT_EVENTNEWS = `${BASE_URL}/event/getEventPostById`;

// advertise with us
const ADVERTISE_WITH_US = `${BASE_URL}/user/advertise-WithUs`;

// privacy settings
const HIDE_CONTACT = `${BASE_URL}/settings/hide-contact`;
const HIDE_OPTIONAL_DETAILS = `${BASE_URL}/settings/hide-optionalDetails`;
const INACTIVE_ID = `${BASE_URL}/settings/set-activityStatus`;
const BLUR_PHOTOS = `${BASE_URL}/settings/set-Blur`;

// notifications
const NOTIFICATION = `${BASE_URL}/notification/getAllNotification`;
const VIEW_NOTIFICATION = `${BASE_URL}/notification/seeNotification`;
const SEEN_NOTIFICATION = `${BASE_URL}/notification/getAllNotification?seen=true`;

// notification settings
const CONNECTION_REQUEST_HANDLE_API = `${BASE_URL}/settings/set-connReqNotification`;
const EVENT_NEWS_NOTIFICATION_HANDLE_API = `${BASE_URL}/settings/set-eventPostNotification`;

// subscriptions

const MATRIMONIALFETCH_PLAN = `${BASE_URL}/user/getPlans/Biodata`;
const PANDIT_PLANS = `${BASE_URL}/user/getPlans/Pandit`;
const JYOISH_PLANS = `${BASE_URL}/user/getPlans/Jyotish`;
const KATHAVACHAK_PLANS = `${BASE_URL}/user/getPlans/Kathavachak`;
const FETCH_PLANS = `${BASE_URL}/user/getPlans`;
const RAZORPAY = `${BASE_URL}/subscription/getRazorPayKey`;
const FREE_TRIAL = `${BASE_URL}/subscription/setTrial`;
const PAYMENT_VERIFICATION = `${BASE_URL}/subscription/verifyPayment`;
const PAID_URL = `${BASE_URL}/subscription/buy`;
const SUBSCRIPTION_HISTORY = `${BASE_URL}/subscription/history`;
const FREE_TRIAL_HISTORY = `${BASE_URL}/subscription/trialHistory`;
// Advertise Windows

// Base types without sections
// HomePage

const TOP_HOME_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=HomePage&section=Top`;
const BOTTOM_HOME_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=HomePage&section=Bottom`;

// Dharmshala
const TOP_DHARMSHALA_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Dharmshala&section=Top`;
const BOTTOM_DHARMSHALA_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Dharmshala&section=Bottom`;

// Pandit
const TOP_PANDIT_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Pandit&section=Top`;
const BOTTOM_PANDIT_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Pandit&section=Bottom`;

// Jyotish
const TOP_JYOTISH_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Jyotish&section=Top`;
const BOTTOM_JYOTISH_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Jyotish&section=Bottom`;

// Kathavachak
const TOP_KATHAVACHAK_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Kathavachak&section=Top`;
const BOTTOM_KATHAVACHAK_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Kathavachak&section=Bottom`;

// Committee
const TOP_COMMITTEE_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Committee&section=Top`;
const BOTTOM_COMMITTEE_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Committee&section=Bottom`;

// Event News
const TOP_EVENT_NEWS_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=EventPost&section=Top`;
const BOTTOM_EVENT_NEWS_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=EventPost&section=Bottom`;

// Activist
const TOP_ACTIVIST_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Activist&section=Top`;
const BOTTOM_ACTIVIST_ADVERDISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Activist&section=Bottom`;

// Biodata
const TOP_BIODATA_ADVERTISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Biodata&section=Top`;
const BOTTOM_BIODATA_ADVERTISE_WINDOW = `${BASE_URL}/user/get-advertisement?targetProfileType=Biodata&section=Bottom`;

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
    GET_BIODATA_BY_ID,
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
    DELETE_COMMITTEE,
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
    VIEW_DHARAMSALA,
    UPDATE_DHARAMSALA,
    GET_DHARAMSALA,
    GET_ALL_DHARAMSALA,
    DELETE_DHARAMSALA,
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
    BLUR_PHOTOS,
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
    DELETE_USER,
    DELETE_SEND_REQUEST,
    MATRIMONIALFETCH_PLAN,
    PANDIT_PLANS,
    JYOISH_PLANS,
    KATHAVACHAK_PLANS,
    FETCH_PLANS,
    FREE_TRIAL_HISTORY,
    PAID_URL,
    FREE_TRIAL,
    PAYMENT_VERIFICATION,
    RAZORPAY,
    PROFILE_TYPE,
    BASE_URL,
    SUBSCRIPTION_HISTORY,
    SUCESS_STORIES,
    POST_SUCESS_sTORY,
    MY_SUCCESS_STORY,
    DELETE_SUCCESS_STORY,
    FORGOT_PASSWORD_OTP,
    PHOTO_URL,
    TOP_HOME_ADVERDISE_WINDOW,
    BOTTOM_HOME_ADVERDISE_WINDOW,
    TOP_PANDIT_ADVERDISE_WINDOW,
    BOTTOM_PANDIT_ADVERDISE_WINDOW,
    TOP_JYOTISH_ADVERDISE_WINDOW,
    BOTTOM_JYOTISH_ADVERDISE_WINDOW,
    TOP_KATHAVACHAK_ADVERDISE_WINDOW,
    BOTTOM_KATHAVACHAK_ADVERDISE_WINDOW,
    TOP_BIODATA_ADVERTISE_WINDOW,
    BOTTOM_BIODATA_ADVERTISE_WINDOW,
    TOP_ACTIVIST_ADVERDISE_WINDOW,
    BOTTOM_ACTIVIST_ADVERDISE_WINDOW,
    TOP_COMMITTEE_ADVERDISE_WINDOW,
    BOTTOM_COMMITTEE_ADVERDISE_WINDOW,
    TOP_DHARMSHALA_ADVERDISE_WINDOW,
    BOTTOM_DHARMSHALA_ADVERDISE_WINDOW,
    TOP_EVENT_NEWS_ADVERDISE_WINDOW,
    BOTTOM_EVENT_NEWS_ADVERDISE_WINDOW,
    VIEW_LIKE_COMMENT_EVENTNEWS,
};
