import { TbCloudUpload } from "react-icons/tb";
import { settingProfile } from "./styles";
import { checkIsImageValid } from "../modules/checkIsImageValid";
import { useSelector } from "react-redux";
import { RootState } from "@/src/states/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import UseAxiosPrivate from "@/src/services/hooks/UseAxiosPrivate";
import { ReactNode, useEffect } from "react";
import { setUserData } from "../modules/setAuthenticationData";

const updateUserSchema = z.object({
  first_name: z
    .string()
    .max(50, { message: "max length of first name is 50 chars" })
    .min(3, { message: "min length of first name is 3 chars" })
    .optional(),
  last_name: z
    .string()
    .max(50, { message: "max length of last name is 50 chars" })
    .min(3, { message: "min length of last name is 3 chars" })
    .optional(),
  avatar: z
    .any()
    .optional()
    // .refine((file) => console.log(file[0]))
    .refine(
      (file) => {
        return !file[0] || file[0]?.size <= 2000000;
      },
      { message: `Max image size is 2MB.` }
    )
    .refine(
      (file) => {
        return (
          !file[0] ||
          ["image/svg", "image/png", "image/jpg", "image/jpeg"].includes(
            file[0]?.type
          )
        );
      },
      { message: "Only .svg,.png,.jpg,.jpeg formats are supported." }
    ),
});
type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;

const SettingProfile = () => {
  const userData = useSelector((state: RootState) => state.user.value);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
  });
  const axiosPrivateHook = UseAxiosPrivate();
  useEffect(() => {
    if (userData) {
      reset({
        first_name: userData.first_name,
        last_name: userData.last_name,
        avatar: userData.avatar,
      });
    }
  }, [userData]);
  const onSubmit: SubmitHandler<UpdateUserSchemaType> = async (
    data: UpdateUserSchemaType
  ) => {
    try {
      // console.log(data.avatar);
      // console.log(data.avatar[0]);
      if (!data.avatar[0]) delete data.avatar;
      else {
        data = { ...data, avatar: data.avatar[0] };
      }
      console.log(data);
      const res = await axiosPrivateHook.put("user_info", data);
      console.log(res);
      setUserData({
        ...userData,
        first_name: data.first_name,
        last_name: data.last_name,
        avatar: data.avatar ? data.avatar[0].name : userData.avatar,
      });
    } catch (err) {
      console.log("error in update the user data at setting profile");
      console.log(err);
    }
  };

  return (
    <div className={settingProfile}>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="first-last-name">
          <div className="first-name">
            <label htmlFor="firstName">First name</label>
            <input
              autoComplete="on"
              type="text"
              id="firstName"
              placeholder="first name..."
              {...register("first_name")}
            />
            <span className="error-message">
              {errors?.first_name ? errors.first_name.message : ""}
            </span>
          </div>
          <div className="last-name">
            <label htmlFor="lastName">Last name</label>
            <input
              autoComplete="on"
              type="text"
              id="lastName"
              placeholder="last name ..."
              {...register("last_name")}
            />
            <span className="error-message">
              {errors?.last_name ? errors.last_name.message : ""}
            </span>
          </div>
        </div>
        <div className="email-username">
          <div className="email">
            <label htmlFor="emailsetting">Email</label>
            <input
              autoComplete="on"
              type="email"
              id="emailsetting"
              placeholder={userData.email}
              readOnly
              disabled
            />
          </div>
          <div className="username">
            <label htmlFor="username">User name</label>
            <input
              autoComplete="on"
              type="text"
              id="username"
              placeholder={userData.username}
              readOnly
              disabled
            />
          </div>
        </div>
        <div className="profile-img-update">
          <label htmlFor="formInputImage" className="">
            <div className="file-icon">
              <TbCloudUpload color="black" size={20} />
            </div>
            <div className="file-text">
              Click to upload or drag and drop
              <br />
              SVG, PNG, JPG, JPEG (max, 800x400px)
            </div>
            <input
              autoComplete="on"
              className="form-controld"
              type="file"
              id="formInputImage"
              accept=".svg,.png,.jpg,.jpeg,.gif"
              {...register("avatar", { onChange: checkIsImageValid })}
            />
            <img alt="user image" className="d-none" id="selectedImage" />
            <span className="error-message">
              {errors?.avatar ? (errors.avatar.message as ReactNode) : ""}
            </span>
            <span id="image-errors" className="text-danger d-none"></span>
          </label>
        </div>
        <div className="submit-button-container">
          <div className="submit-button">
            <input
              autoComplete="off"
              type="submit"
              value="Update"
              placeholder="username..."
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingProfile;
