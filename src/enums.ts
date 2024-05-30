import browse from "./assets/icons/Browse.svg";
import search from "./assets/icons/Search.svg";
import like from "./assets/icons/Like.svg";
import profile from "./assets/icons/Profile.svg";
import seeMore from "./assets/icons/SeeMore.svg";
import plus from "./assets/icons/Plus.svg";
import logo from "./assets/icons/logo.svg";
import close from "./assets/icons/Close.svg";
import exit from "./assets/icons/log-out.svg"
import edit from "./assets/icons/edit.svg";
import heart from "./assets/icons/heart.svg";
import openEye from "./assets/icons/ic_eye_on.svg";
import closeEye from "./assets/icons/ic_eye_off.svg";

export const icons = {
  browse,
  search,
  like,
  profile,
  seeMore,
  plus,
  logo,
  close,
  exit,
  edit,
  heart,
  openEye,
  closeEye
};

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  gray: '#D9D9D9',
};

export enum Status {
  Error,
  Success,
  Fetching,
  Initial,
}
