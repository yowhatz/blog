import React from "react";

import cls from "./ProfilePage.module.scss";
import ProfileForm from "src/pages/ProfilePage/ProfileForm/ProfileForm";
import ProfileData from "src/pages/ProfilePage/ProfileData/ProfileData";
import { useSelector } from "react-redux";
import { getAuthData } from "src/redux/selectors/getAuthData";

const ProfilePage = () => {
  const user = useSelector(getAuthData);

  return (
    <div className={cls.profile}>
      <ProfileData user={user} />
      <ProfileForm user={user} />
    </div>
  );
};

export default ProfilePage;
