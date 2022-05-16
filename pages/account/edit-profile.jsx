import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { Layout } from "../../components/account";
import { createAlert } from "../../redux/alerts";
import { fetchEditProfile } from "../../redux/profile";
import { TextField, TextareaAutosize } from "@mui/material";

// import Image from "next/image"; // => TODO: figure out optimization for using Next Image
import styles from "../../styles/EditProfile.module.css";
import { updateUser } from "../../redux/profile";
import { fetchTags } from "../../redux/tags";

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

  const placeholderSrc =
    "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png";

  const [formContent, setFormContent] = useState(initialForm);
  const [orgTags, setOrgTags] = useState([]);
  const [newChanges, setNewChanges] = useState(false);
  const allTags = useSelector((state) => state.tags);

  useEffect(() => {
    if (!allTags.length) {
      dispatch(fetchTags(user));
    }
    if (!newChanges) {
      setNewChanges(true);
    }
  }, [formContent, orgTags]);

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
    if (profile.businessName && newChanges) {
      setFormContent({
        businessName: profile.businessName,
        email: profile.email,
        address: profile.address,
        contactNum: profile.contactNum,
        biography: profile.biography || "",
        imageUrl: profile.imageUrl || "",
      });
      setOrgTags(profile.tags);
    }
  }, [profile, dispatch]);

  const handleFormChange = (e) => {
    setFormContent({ ...formContent, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (orgTags.length > 6) {
      dispatch(
        createAlert("error", "You may choose up to 6 product tags.", {
          autoClose: 5000,
        })
      );
      return;
    }

    const connectTags = orgTags.map((tag) => {
      return { value: tag.value };
    });

    const deleteTags = () => {
      const oldTagValues = profile.tags.map((tag) => tag.value);
      const newTagValues = orgTags.map((tag) => tag.value);
      const tagsToDelete = oldTagValues
        .filter((tag) => !newTagValues.includes(tag))
        .map((tag) => {
          return { value: tag };
        });
      console.log(tagsToDelete, "tags to delte");
      return tagsToDelete;
    };

    dispatch(
      updateUser(user, {
        id: user.id,
        ...formContent,
        tags: { connect: connectTags, disconnect: deleteTags() },
      })
    );
    setNewChanges(false);
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
        {user.businessType === "ORGANIZATION" && (
          <div className={styles.formGroup}>
            <label htmlFor="tags">What are your most-needed items? (6)</label>
            <Select
              isMulti
              options={allTags}
              name="tags"
              value={orgTags}
              onChange={(tags) => setOrgTags(tags)}
            />
          </div>
        )}
        <button type="submit" disabled={!newChanges}>
          {newChanges ? "Save Changes" : "Changes Saved"}
        </button>
      </form>
    </Layout>
  );
};

export default EditProfile;
