import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Layout } from "../../components/account";
import { createAlert } from "../../redux/alerts";
import { fetchEditProfile } from "../../redux/profile";

import Image from "next/image";
import styles from "../../styles/EditProfile.module.css";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);

  const initialState = {
    businessName: profile.businessName,
    email: profile.email,
    address: profile.address,
    contactNum: profile.contactNum,
    biography: profile.biography || "",
    imageUrl: profile.imageUrl || "",
  };

  useEffect(() => {
    if (user.id) {
      dispatch(fetchEditProfile(user));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (profile.error) {
      dispatch(
        createAlert("error", profile.error.message, {
          id: profile.error.id,
          keepAfterRouteChange: true,
          autoClose: 3000,
        })
      );
    }
  }, [profile, dispatch]);

  const [image, setImage] = useState(null);
  const placeholderSrc =
    "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png";

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("submit form");
  };
  return (
    <Layout>
      <div className={styles.imageContainer}>
        <Image
          src={image || placeholderSrc}
          alt="User profile image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <form onSubmit={handleFormSubmit}></form>
      {profile.businessName}
    </Layout>
  );
};

export default EditProfile;
