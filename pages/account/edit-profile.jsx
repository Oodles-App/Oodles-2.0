import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Layout } from "../../components/account";
import { createAlert } from "../../redux/alerts";
import { fetchEditProfile } from "../../redux/profile";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);

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

  return (
    <Layout>
      Hello World. This is the edit profile page for user:
      {profile.businessName}
    </Layout>
  );
};

export default EditProfile;
