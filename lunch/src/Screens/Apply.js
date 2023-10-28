import React, { useEffect } from "react";
import { Input } from "../Components/UsedInputs";
import Layout from "../Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { InlineError } from "../Components/Notifications/Error";
import { toast } from "react-hot-toast";
import { registerAction } from "../Redux/Actions/userActions";
import { applyUser } from "../Redux/Actions/userActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApplyValidation } from "../Components/Validation/UserValidation";
import { useForm } from "react-hook-form";
import { useState } from "react";

// on submit
// const onSubmit = (data) => {
//   dispatch(applyUser(data));
// };
// function Apply() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isLoading, isError, userInfo, isSuccess } = useSelector(
//     (state) => state.userRegister
//   );

//   // validate user

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(ApplyValidation),
//   });

//   // on submit
//   const onSubmit = (data) => {
//     dispatch(applyUser(data));
//   };

//   // useEffect
//   useEffect(() => {
//     if (userInfo?.isAdmin) {
//       navigate("/dashboard");
//     } else if (userInfo) {
//       navigate("/profile");
//     }
//     if (isSuccess) {
//       toast.success(`Welcome to the company`);
//       dispatch({ type: "APPLY_RESET" });
//     }
//     if (isError) {
//       toast.error(isError);
//       dispatch({ type: "APPLY_RESET" });
//     }
//   }, [userInfo, isSuccess, isError, navigate, dispatch]);

//   return (
//     <Layout>
//       <div className="container mx-auto px-2 my-24 flex-colo">
//         <form
//           // onSubmit={handleSubmit(onSubmit)}
//           onClick={onSubmit}
//           onSubmit={onSubmit}
//           className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border"
//         >
//           <img
//             src="/images/logo.png"
//             alt="logo"
//             className="w-full h-12 object-contain"
//           />

//           <div className="w-full">
//             <Input
//               label="First Name"
//               placeholder="fullName"
//               type="text"
//               name="firstame"
//               //   register={register("fullName")}
//               bg={true}
//             />
//             {/* {errors.fullName && <InlineError text={errors.fullName.message} />} */}
//           </div>

//           <div className="w-full">
//             <Input
//               label="Fame"
//               placeholder="fullName"
//               type="text"
//               name="middlename"
//               //   register={register("fullName")}
//               bg={true}
//             />
//             {/* {errors.fullName && <InlineError text={errors.fullName.message} />} */}
//           </div>

//           <div className="w-full">
//             <Input
//               label="Fullname"
//               placeholder="fullName"
//               type="text"
//               name="lastname"
//               //  register={register("fullName")}
//               bg={true}
//             />
//             {/* {errors.fullName && <InlineError text={errors.fullName.message} />} */}
//           </div>

//           {/* <div className="w-full">
//             <Input
//               label="Fullname"
//               placeholder="fullName"
//               type="text"
//               name="fullName"
//               register={register("fullName")}
//               bg={true}
//             />
//             {errors.fullName && <InlineError text={errors.fullName.message} />}
//           </div> */}

//           <div className="w-full">
//             <Input
//               label="Email"
//               placeholder="netflix@gmail.com"
//               type="email"
//               name="email"
//               register={register("email")}
//               bg={true}
//             />
//             {/* {errors.email && <InlineError text={errors.email.message} />} */}
//           </div>

//           <button
//             onSubmit={handleSubmit}
//             type="submit"
//             disabled={isLoading}
//             className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
//           >
//             <FiLogIn /> Submit Application
//             {/* {
//               // if loading show loading
//               isLoading ? (
//                 "Loading..."
//               ) : (
//                 <>
//                   <FiLogIn /> Submit Application
//                 </>
//               )
//             } */}
//           </button>
//           <p className="text-center text-border">
//             Already have an account?
//             <Link to="/login" className="text-dryGray font-semibold ml-2">
//               Sign In
//             </Link>
//           </p>
//         </form>
//       </div>
//     </Layout>
//   );
// }

const Apply = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const userApply = useSelector((state) => state.userApply);
  // const { loading, error, userInfo, success } = userApply;

  const { loading, error, userInfo, success } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (userInfo && success) {
      navigate("/profile");
    }
  });

  const handleSubmit = (e) => {
    // e.preventDefault();
    setMessage("");

    dispatch(applyUser(form));
  };

  return (
    <>
      {message && { message }}
      {error && { error }}
      {loading}
      <Layout>
        <div className="container mx-auto px-2 my-24 flex-colo">
          <form
            //  onSubmit={handleSubmit}
            className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-white rounded-lg border border-border"
          >
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-full h-12 object-contain"
            />

            <div className="w-full">
              <Input
                label="First Name"
                placeholder="Enter your First Name"
                type="text"
                onChange={(e) => {
                  setField("firstname", e.target.value);
                }}
                // name="fullName"
                //   register={register("fullName")}
                bg={true}
              />
              {errors.fullName && (
                <InlineError text={errors.fullName.message} />
              )}
            </div>

            <div className="w-full">
              <Input
                label="Middle Name"
                placeholder="Enter Your Middle Name"
                type="text"
                onChange={(e) => {
                  setField("middlename", e.target.value);
                }}
                //   name="fullName"
                //   register={register("fullName")}
                bg={true}
              />
              {errors.fullName && (
                <InlineError text={errors.fullName.message} />
              )}
            </div>

            <div className="w-full">
              <Input
                label="Last name"
                placeholder="Enter your last Name"
                type="text"
                onChange={(e) => {
                  setField("lastname", e.target.value);
                }}
                bg={true}
              />
              {errors.fullName && (
                <InlineError text={errors.fullName.message} />
              )}
            </div>
            <div className="w-full">
              <Input
                label="Email name"
                placeholder="Email Name"
                type="email"
                onChange={(e) => {
                  setField("email", e.target.value);
                }}
                bg={true}
              />
              {errors.fullName && (
                <InlineError text={errors.fullName.message} />
              )}
            </div>

            <div className="w-full">
              <p>
                <a href="mailto:someone@example.com">Send Cv</a>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="bg-black transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
            >
              <FiLogIn /> Submit Application
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Apply;