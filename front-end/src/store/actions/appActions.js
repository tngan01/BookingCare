import { LANGUAGES } from "../../utils/constant";
import actionTypes from "./actionTypes";

export const appStartUpComplete = () => ({
  type: actionTypes.APP_START_UP_COMPLETE, //dung khi khong truyen data
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
  type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
  contentOfConfirmModal: contentOfConfirmModal, //dung khi truyen data
});

export const changeLanguageApp = (languageInput) => ({
  type: actionTypes.CHANGE_LANGUAGE,
  language: languageInput,
});
