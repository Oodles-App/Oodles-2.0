import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const EditProfile = () => {
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const placeholderSrc =
    "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png";

  useEffect(() => {
    fetchUserProfile();
  });
  return <div>Hello World.</div>;
};

export default EditProfile;
