import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';



const registerUser = asyncHandler(async (req, res) => {
  // get user details from user
  //validation - not empty
  //check if user already exists
  //check for images, check for avatar
  // upload them to cloudinary
  // create user object - create entry in db
  // remove password and refresh token from response
  // check for user creation
  // return res

  const { fullName,username, email, password } = req.body;
  console.log("email : ", email);

  if(
    [fullName, username, email, password].some((field)=>field?.trim()==="") 
  ){
    throw new ApiError(400, "All fields are required");
  }

  const existedUser=User.findOne({
    $or:[{email},{username}]
  }) 

  if(existedUser){
    throw new ApiError(400, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar is required");
  }

  const avatar=await uploadOnCloudinary(avatarLocalPath);
  const coverImage=await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(500, "Failed to upload avatar");
  }

  const user= await User.create({
    fullName,
    username:username.toLowerCase(),
    email,
    password,
    avatar : avatar.url,
    coverImage : coverImage?.url || "",
  });

  const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if(!createdUser){
    throw new ApiError(500, "Failed to create user"); 
  }

  return res.status(201).json(
    new ApiResponse(201, "User created", createdUser));





  
  

  
});

export { registerUser };




