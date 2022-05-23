import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { Layout } from "../../components/account";
import { createAlert } from "../../redux/alerts";
import { fetchEditProfile } from "../../redux/profile";
import { TextField, TextareaAutosize, Button } from "@mui/material";
import ChartLoading from "../../components/analytics/ChartLoading";

// import Image from "next/image"; // => TODO: figure out optimization for using Next Image
import styles from "../../styles/EditProfile.module.css";
import { updateUser } from "../../redux/profile";
import { fetchTags } from "../../redux/tags";

//TODO: validation and error handling => don't toggle submit unless update was successful
//TODO: address auto complete?
//TODO (stretch): allow users to upload image instead of using url?

import { editProfileTheme } from "../../styles/MuiThemes";
import { ThemeProvider } from "@mui/material";

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
  const [loading, setLoading] = useState(true);
  const [newChanges, setNewChanges] = useState(false);
  const alerts = useSelector((state) => state.alerts);
  const allTags = useSelector((state) => state.tags);

  useEffect(() => {
    if (!user.token) {
      setLoading(true);

      setTimeout(() => setLoading(false), 2000);
    }
    if (!newChanges) {
      setNewChanges(true);
    }
  }, [formContent, orgTags]);

  useEffect(() => {
    if (user.id) {
      if (!allTags.length) {
        dispatch(fetchTags(user));
        if (!newChanges) {
          setNewChanges(true);
        }
      }
      dispatch(fetchEditProfile(user));
      setLoading(false);
    }
  }, [user, dispatch]);

  useEffect(() => {
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
      return tagsToDelete;
    };

    dispatch(
      updateUser(user, {
        id: user.id,
        ...formContent,
        tags: { connect: connectTags, disconnect: deleteTags() },
      })
    );
    if (!alerts.length) {
      setNewChanges(false);
    }
  };

  if (loading) {
    return <ChartLoading />;
  }

  return (
    <ThemeProvider theme={editProfileTheme}>
      <div className={`pt-5 max-w-2xl my-0 mx-auto ${styles.editWrapper}`}>
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
              <h3 className={`${styles.title} text-2xl font-bold`}>
                Edit Profile
              </h3>
              <hr className="border-1 border-black" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="businessName" className={styles.label}>
                Business Name:
              </label>
              <TextField
                name="businessName"
                type="text"
                className="bg-slate-50"
                sx={{ borderRadius: 1 }}
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
                className="bg-slate-50"
                sx={{ borderRadius: 1 }}
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
                className="bg-slate-50"
                sx={{ borderRadius: 1 }}
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
                className="bg-slate-50"
                sx={{ borderRadius: 1 }}
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
                sx={{ borderRadius: 2 }}
                value={formContent.biography || ""}
                onChange={handleFormChange}
                className={`${styles.textarea} bg-slate-50`}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="imageUrl" className={styles.label}>
                Profile Image (Link)
              </label>
              <TextField
                name="imageUrl"
                className="bg-slate-50"
                sx={{ borderRadius: 1 }}
                value={formContent.imageUrl || ""}
                onChange={handleFormChange}
              />
            </div>
            {(user.businessType === "ORGANIZATION" ||
              user.businessType === "organization") && (
              <div className={styles.formGroup}>
                <label htmlFor="tags">
                  What are your most-needed items? (6)
                </label>
                <Select
                  color="primary"
                  isMulti
                  options={allTags}
                  name="tags"
                  className={`bg-slate-50 ${styles.select}`}
                  value={orgTags}
                  sx={{ borderRadius: 1 }}
                  onChange={(tags) => setOrgTags(tags)}
                />
              </div>
            )}
            <div className="my-0 mx-auto w-auto">
              <Button type="submit" variant="contained" disabled={!newChanges}>
                <span className="text-white">
                  {newChanges ? "Save Changes" : "Changes Saved"}
                </span>
              </Button>
            </div>
          </form>
        </Layout>
      </div>
    </ThemeProvider>
  );
};

export default EditProfile;
