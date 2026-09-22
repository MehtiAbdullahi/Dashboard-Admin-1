import { useTranslation } from "react-i18next";
import Input from "../Input/Input";
import style from "./ManageAccount.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getUser, updateUser } from "../../Redux/Store/Users";
import { AnimatePresence } from "framer-motion";
import Loader from "../Loader/Loader";
import { supabase } from "../../lib/supabase";

function ManageAccount() {
  const fileInputRef = useRef(null);

  const [loggedInUser, setLoggedInUser] = useState();
  const [imgUrl, setImgUrl] = useState(null);
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    lastname: "",
    username: "",
    email: "",
    age: "",
    phone: "",
    role: "",
    profile_img: "",
  });

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { users, loading } = useSelector((state) => state.allUsers);

  const { t } = useTranslation();

  const inputs = [
    {
      type: "text",
      name: "name",
      label: `${t("manageYourAccount.lables.Name")}`,
    },
    {
      type: "text",
      name: "lastname",
      label: `${t("manageYourAccount.lables.lastName")}`,
    },
    // {
    //   type: "password",
    //   name: "password",
    //   label: `${t("manageYourAccount.lables.Password")}`,
    // },
    {
      type: "text",
      name: "username",
      label: `${t("manageYourAccount.lables.Username")}`,
    },
    {
      type: "email",
      name: "email",
      label: `${t("manageYourAccount.lables.Email")}`,
    },
    {
      type: "text",
      name: "age",
      label: `${t("manageYourAccount.lables.Age")}`,
    },
    {
      type: "text",
      name: "phone",
      label: `${t("manageYourAccount.lables.phoneNumber")}`,
    },
  ];

  const uploadImg = async (file) => {
    const filePath = `${user.id}/profile.png`;

    const { error } = await supabase.storage
      .from("users-image")
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) {
      console.error("Error Upload Image:", error.message);
      return null;
    }

    return filePath;
  };

  const getImgUrl = async (filePath) => {
    const { data, error: signedUrlError } = await supabase.storage
      .from("users-image")
      .createSignedUrl(filePath, 60 * 60);

    if (signedUrlError) {
      console.error("Error Creating Signed URL:", signedUrlError.message);
      return null;
    }

    return data.signedUrl;
  };

  const seveUserInfo = async (e) => {
    e.preventDefault();

    let imagePath = formValues.profile_img;

    if (formValues.profile_img instanceof File) {
      imagePath = await uploadImg(formValues.profile_img);

      if (!imagePath) {
        return;
      }
    }

    const updatedUser = {
      ...formValues,
      profile_img: imagePath,
    };

    try {
      await dispatch(updateUser(updatedUser)).unwrap();

      const newImageUrl = await getImgUrl(imagePath);

      setImgUrl(newImageUrl);

      setLoggedInUser((prev) => ({
        ...prev,
        profile_img: imagePath,
      }));

      console.log("User updated successfully");
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const getInfoUser = async () => {
    await dispatch(getUser());
  };

  const handleUpdateImgClick = () => {
    fileInputRef.current.click();
  };

  const handleImageValue = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormValues((prev) => ({ ...prev, profile_img: file }));
      const previewUrl = URL.createObjectURL(file);
      setImgUrl(previewUrl);
    }
  };

  useEffect(() => {
    console.log("formValues", formValues);
  }, [formValues]);

  useEffect(() => {
    const getUserImage = async () => {
      if (!user?.id || !users?.length) {
        return;
      }

      const userFound = users.find((item) => item.id === user.id);

      if (!userFound) {
        return;
      }

      let imageUrl = null;

      if (userFound.profile_img) {
        imageUrl = await getImgUrl(userFound.profile_img);
      }

      setFormValues((prev) => ({
        ...prev,
        id: user.id,
        name: userFound.name,
        lastname: userFound.lastname,
        username: userFound.username,
        email: userFound.email,
        age: userFound.age,
        phone: userFound.phone,
        role: userFound.role,
        profile_img: userFound.profile_img,
      }));

      setLoggedInUser({
        ...userFound,
        profile_img: imageUrl,
      });

      setImgUrl(imageUrl);
    };

    getUserImage();
  }, [user, users]);

  useEffect(() => {
    getInfoUser();
  }, []);

  console.log("loggedInUser:", loggedInUser);
  console.log("image:", loggedInUser?.profile_img);

  return (
    <>
      {loading && (
        <div className="loader">
          <Loader />
        </div>
      )}
      <div className={style["manage-account__header"]}>
        <h1>{t("manageYourAccount.title")}</h1>
      </div>
      <div className={style["manage-account__wrapper"]}>
        <div className={style["manage-account__profile"]}>
          <div className={style["manage-account__profile-img"]}>
            <div>
              <img src={imgUrl || "/public/image/Users/2a2e7f0f60b750dfb36c15c268d0118d.jpg"} alt="" />
            </div>
            <span onClick={handleUpdateImgClick}>
              {t("manageYourAccount.text")}
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageValue}
              />
            </span>
          </div>
          <div className={style["manage-account__form-wrapper"]}>
            <form action="">
              <div className={style["manage-account__form"]}>
                {inputs.map(({ type, label, name }) => (
                  <div>
                    <Input
                      type={type}
                      label={label}
                      name={name}
                      placeHolder={
                        loggedInUser?.[name]
                          ? loggedInUser?.[name]
                          : t("manageYourAccount.defaultValue.text")
                      }
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
              <div className={style["manage-account__save-btn"]}>
                <button type="submit" onClick={seveUserInfo}>
                  {t("manageYourAccount.btn")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageAccount;
