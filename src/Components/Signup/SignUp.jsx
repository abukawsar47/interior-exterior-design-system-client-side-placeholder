import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { secondary } from "daisyui/src/colors";
import { neutral } from "daisyui/src/colors/colorNames";
import React, { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../Firebase/Firebase.init";

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, firebaseLoading, error] =
    useCreateUserWithEmailAndPassword(auth, {
      sendEmailVerification: true,
    });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [postLoading, setPostLoading] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [confirmPassShow, setConfirmPassShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const toast = useToast();
  const navigate = useNavigate();

  const handleShowHide = () => {
    setPassShow(!passShow);
  };
  const handleConfirmShowHide = () => {
    setConfirmPassShow(!confirmPassShow);
  };
  const postPhoto = async (pics) => {
    setPostLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image",
        description:
          "You need to select a valid image for creating your account.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return setPostLoading(false);
    }
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg" ||
      pics.type === "image/gif" ||
      pics.type === "image/bmp"
    ) {
      try {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "nurul");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/nurulislam/image/upload",
          {
            method: "POST",
            body: data,
          }
        ).catch((error) => {
          if (error.response) {
            toast({
              title: "Failed to upload! Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.status);
            return setPostLoading(false);
          } else if (error.request) {
            toast({
              title: "Failed to upload! Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            return setPostLoading(false);
          } else {
            toast({
              title: "Failed to upload! Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            setPostLoading(false);
          }
          console.log(error.config);
        });
        const getData = await response?.json();
        setPic(await getData?.url?.toString());
        return setPostLoading(false);
      } catch (error) {
        console.log(error);
        toast({
          title: "Failed to upload! Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return setPostLoading(false);
      }
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPostLoading(false);
      return;
    }
  };
  const submitSignUpHandler = async () => {
    setPostLoading(true);
    if (!name || !email || !password || !confirmPassword || !pic) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPostLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Did Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPostLoading(false);
      return;
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "https://tekno-interior-server.onrender.com/api/user",
          { name, email, password, pic },
          config
        );

        const accessToken = await data.token;
        localStorage.setItem("accessToken", accessToken);
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name, photoURL: pic });
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setPostLoading(false);
        return navigate("/");
      } catch (error) {
        if (error) {
          console.log(error);
          toast({
            title: "Error! Failed to Registration.",
            description: error?.response?.data?.message
              ? error.response.data?.message
              : "something went wrong",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
        setPostLoading(false);
        return;
      }
    }
  };
  return (
    <>
      <VStack spacing="5px" color="black">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={passShow ? "text" : "password"}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleShowHide}>
                {passShow ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={confirmPassShow ? "text" : "password"}
              placeholder="Enter Your Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleConfirmShowHide}>
                {confirmPassShow ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="pic">
          <FormLabel>Upload Your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postPhoto(e.target.files[0])}
          />
        </FormControl>
        <Button
          backgroundColor={secondary}
          color="white"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitSignUpHandler}
          isLoading={postLoading}
          _hover={{
            backgroundColor: "#021431",
          }}
        >
          Sign Up
        </Button>
      </VStack>
    </>
  );
};

export default SignUp;
