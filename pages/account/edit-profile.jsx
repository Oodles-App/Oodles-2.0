import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Layout } from "../../components/account";
import { createAlert } from "../../redux/alerts";
import { fetchEditProfile } from "../../redux/profile";
import { TextField, TextareaAutosize } from "@mui/material";

import Image from "next/image";
import styles from "../../styles/EditProfile.module.css";
import { updateUser } from "../../redux/profile";

//TODO: validation and error handling
//TODO: address auto complete?
//TODO (stretch): allow users to upload image instead of using url?

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);

  const initialForm = {
    businessName: "",
    email: "",
    address: "",
    contactNum: "",
    biography: "",
    imageUrl: "",
  };

  const [formContent, setFormContent] = useState(initialForm);

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
    if (profile.businessName) {
      setFormContent({
        businessName: profile.businessName,
        email: profile.email,
        address: profile.address,
        contactNum: profile.contactNum,
        biography: profile.biography || "",
        imageUrl: profile.imageUrl || "",
      });
    }
  }, [profile, dispatch]);

  const [image, setImage] = useState(null);
  const placeholderSrc =
    "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png";

  const handleFormChange = (e) => {
    setFormContent({ ...formContent, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(user, { id: user.id, ...formContent }));
  };

  return (
    <Layout>
      <div className={styles.imageContainer}>
        <img
          src={profile.imageUrl || placeholderSrc}
          className={styles.image}
        />
        {/* Next.js image element doesn't allow external URls except those that are denoted in next.config
        <Image
          src={profile.imageUrl || placeholderSrc}
          alt="User profile image"
          layout="fill"
          objectFit="cover"
        /> */}
      </div>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div>
          <h3 className={styles.title}>Edit Profile</h3>
          <hr />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="businessName" className={styles.label}>
            Business Name:
          </label>
          <TextField
            name="businessName"
            type="text"
            value={formContent.businessName}
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <TextField
            name="email"
            type="email"
            value={formContent.email}
            autoComplete="new-password"
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contactNum" className={styles.label}>
            Phone Number:
          </label>
          <TextField
            name="contactNum"
            type="text"
            value={formContent.contactNum}
            required
            maxLength={10}
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>
            Address:
          </label>
          <TextField
            name="address"
            type="text"
            value={formContent.address}
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="biography" className={styles.label}>
            Biography:
          </label>
          <TextareaAutosize
            name="biography"
            minRows={3}
            value={formContent.biography || ""}
            onChange={handleFormChange}
            className={styles.textarea}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="imageUrl" className={styles.label}>
            Profile Image (Link)
          </label>
          <TextField
            name="imageUrl"
            value={formContent.imageUrl || ""}
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </Layout>
  );
};

export default EditProfile;
