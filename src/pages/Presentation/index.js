import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

import SimpleFooter from "examples/Footers/SimpleFooter";

import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import BaseLayout from "layouts/sections/components/BaseLayout";
import Container from "@mui/material/Container";
import MKInput from "components/MKInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import "./main.css";
import add from "../../assets/icons/add_img.png";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.js";
import { v4 } from "uuid";
import logo from "../../assets/logo/aLogo.png";

function SignInBasic() {
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [image, setImage] = useState(null);
  const [UploadImg, setUploadImg] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  const [Month_v, setMonth] = useState();
  const [Day_v, setDay] = useState();
  const [Year_v, setYear] = useState();


  // const [checkedValues, setChecked] = useState([]);

  // const handleCheckBox = (event) => {
  //   const { value, checked } = event.target
  //   setChecked((prev) => {
  //     if(checked) {
  //       return [...prev, value];
  //     } else {
  //       return prev.filter((item) => item !== value)
  //     }
  //   })
  // }


  const [Age, setAge] = useState("");
  const [FullName, setFullName] = useState("");
  const [EducationalStatus, setEducationalStatus] = useState("");
  const [FoundationLevel, setFoundationLevel] = useState("");
  const [cloth, setCloth] = useState("");
  const [size, setSize] = useState("");
  const [payed, setPayed] = useState("");
  const [BirthDate, setBirthDate] = useState("");
  const [SchoolName, setSchoolName] = useState("");
  const [SchoolAddress, setSchoolAddress] = useState("");
  const [ResidentialAddress, setResidentialAddress] = useState("");
  const [PhoneNum, setPhoneNum] = useState("");
  const [YearJoined, setYearJoined] = useState("");
  const [Email, setEmail] = useState("");
  const [UImageURL, setUImageURL] = useState("");
  const [userId, setUid] = useState("");
  var arr = [
    FullName,
    EducationalStatus,
    FoundationLevel,
    cloth,
    size,
    payed,
    BirthDate,
    SchoolName,
    SchoolAddress,
    ResidentialAddress,
    PhoneNum,
    YearJoined,
    Email,
  ];

  const handelClick = () => {

    if (arr.indexOf("") == -1) {
      // var year = Year_v;
      // var month = Month_v;
      // var day = Day_v;
      // var today = new Date();
      // var age = today.getFullYear() - year;
      // if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
      //   age--;
      // }
      // setAge(age);
      if (UploadImg) {
        const imageRef = ref(storage, `user_imgs/${UploadImg.fileName + v4()}`);
        setUid(FullName.split(" ")[0] + PhoneNum);
        uploadBytes(imageRef, UploadImg)
          .then(() => {
            getDownloadURL(imageRef)
              .then((Url) => {
                setUImageURL(Url);
              })
              .then(() => {
                setDoc(doc(db, "users", userId), {
                  user_id: userId,
                  age: Age,
                  name: FullName,
                  educational_status: EducationalStatus,
                  foundation_level: FoundationLevel,
                  cloth: cloth,
                  size: size,
                  payed: payed,
                  birth_date: BirthDate,
                  school_name: SchoolName,
                  school_address: SchoolAddress,
                  residential_address: ResidentialAddress,
                  phone_number: PhoneNum,
                  year_joined: YearJoined,
                  email: Email,
                  image: UImageURL,
                })
                  .then(() => {
                    window.alert(FullName + " was successfully registered as an ARMY");
                  })
                  .catch((err) => {
                    window.alert("Failed to register user, check console for more information");
                    console.log(err.message);
                  });
              });
          })
          .catch((err) => {
            window.alert("Failed to post, check console for more information");
            console.log(err.message);
          });
      } else {
        window.alert("Please upload an image");
      }
    } else {
      window.alert("Please enter all data");
    }
  };

  if (auth) {
    return (
      <>
        <BaseLayout
          title="Register new members"
          breadcrumb={[
            { label: "Registered members", route: "/Registered_Members" },
            { label: "Add members" },
          ]}
        >
          <MKBox component="section" py={12}>
            <Container>
              <Grid container justifyContent="center" alignItems="center" flexDirection="column">
                <form
                  className={image ? "upload_new" : "upload"}
                  onClick={() => document.querySelector(".file_input").click()}
                >
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    required
                    className="file_input"
                    onChange={({ target: { files } }) => {
                      files[0] && setFileName(files[0].name);
                      if (files) {
                        setImage(URL.createObjectURL(files[0]));
                        setUploadImg(files[0]);
  
                        
                      }
                    }}
                  />
  
                  {image ? (
                    <img src={image} className="img_new" />
                  ) : (
                    <img alt={fileName} src={add} className="img_n" />
                  )}
                </form>
                {image ? (
                  <MKTypography variant="caption" color="text">
                    (click the picture to change)
                  </MKTypography>
                ) : null}
              </Grid>
              <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
                <MKBox width="100%" component="form" autoComplete="off">
                  <MKBox p={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <MKInput
                          variant="standard"
                          label="Full Name"
                          fullWidth
                          required
                          inputProps={{ style: { textTransform: "capitalize" } }}
                          onChange={() => {
                            setFullName(event.target.value);
                          }}
                        />
                      </Grid>
  
                      <Grid item xs={12}>
                        <FormControl>
                          <FormLabel color="info" id="edu_radio">
                            Educational Level
                          </FormLabel>
                          <RadioGroup
                            required
                            row
                            aria-labelledby="edu_radio"
                            name="edu_radio"
                            onChange={() => setEducationalStatus(event.target.value)}
                          >
                            <FormControlLabel
                              value="Highschool"
                              color="info"
                              control={<Radio size="large" />}
                              label="Highschool"
                            />
                            <FormControlLabel
                              value="College/University"
                              color="info"
                              control={<Radio size="large" />}
                              label="College/University"
                            />
                            <FormControlLabel
                              value="Employee"
                              color="info"
                              control={<Radio size="large" />}
                              label="Employee"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <FormLabel color="info" id="foundation_radio">
                            Foundation Level
                          </FormLabel>
                          <RadioGroup
                            required
                            row
                            aria-labelledby="foundation_radio"
                            name="foundation_radio"
                            onChange={() => setFoundationLevel(event.target.value)}
                          >
                            <FormControlLabel
                              value="Learning 1"
                              color="info"
                              control={<Radio size="large" />}
                              label="Learning 1"
                            />
                            <FormControlLabel
                              value="Completed 1"
                              color="info"
                              control={<Radio size="large" />}
                              label="Completed 1"
                            />
                            <FormControlLabel
                              value="Learning 2"
                              color="info"
                              control={<Radio size="large" />}
                              label="Learning 2"
                            />
                            <FormControlLabel
                              value="Completed 2"
                              color="info"
                              control={<Radio size="large" />}
                              label="Completed 2"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
  
                      <Grid item xs={12} md={6}>
                        {/* <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                          <DatePicker
                            fullWidth
                            slotProps={{ textField: { variant: "standard" } }}
                            label="Date of Birth"
                            disableFuture
                            onChange={(value) => {
                              setBirthDate(`${value.$M + 1}-${value.$D}-${value.$y}`);
                              setMonth(value.$M);
                              setDay(value.$D);
                              setYear(value.$y);
                            }}
                            views={["month", "day", "year"]}
                          />
                        </LocalizationProvider> */}
                        <MKInput
                          variant="standard"
                          label="Age"
                          type="number"
                          inputProps={{ style: { textTransform: "capitalize" } }}
                          fullWidth
                          required
                          onChange={() => setAge(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                          <DatePicker
                            fullWidth
                            slotProps={{ textField: { variant: "standard" } }}
                            label="When Did You Join GLC"
                            disableFuture
                            onChange={(value) => {
                              setYearJoined(value.$y);
                            }}
                            views={["year"]}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12}>
                        <MKInput
                          variant="standard"
                          label="School Name"
                          inputProps={{ style: { textTransform: "capitalize" } }}
                          fullWidth
                          required
                          onChange={() => setSchoolName(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MKInput
                          variant="standard"
                          label="School Address"
                          fullWidth
                          inputProps={{ style: { textTransform: "capitalize" } }}
                          required
                          onChange={() => setSchoolAddress(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MKInput
                          variant="standard"
                          label="Residence Address"
                          fullWidth
                          inputProps={{ style: { textTransform: "capitalize" } }}
                          required
                          onChange={() => setResidentialAddress(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MKInput
                          variant="standard"
                          defaultValue="09"
                          label="Phone Number"
                          inputProps={{ style: { textTransform: "capitalize" } }}
                          fullWidth
                          onChange={() => setPhoneNum(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MKInput
                          variant="standard"
                          type="email"
                          label="Email Address"
                          fullWidth
                          inputProps={{ style: { textTransform: "capitalize" } }}
                          required
                          onChange={() => setEmail(event.target.value)}
                        />
                      </Grid>
                    </Grid>
                    {/* <Grid item xs={12} alignItems="center" ml={-1}>
                      <Switch checked={checked} onChange={handleChecked} />
                      <MKTypography
                        variant="button"
                        fontWeight="regular"
                        color="text"
                        ml={-1}
                        sx={{ cursor: "pointer", userSelect: "none" }}
                        onClick={handleChecked}
                      >
                        &nbsp;&nbsp;I agree the&nbsp;
                      </MKTypography>
                      <MKTypography
                        component="a"
                        href="#"
                        variant="button"
                        fontWeight="regular"
                        color="dark"
                      >
                        Terms and Conditions
                      </MKTypography>
                    </Grid> */}
                    <Grid className="mar_both" item xs={12}>
                      <FormControl>
                        <FormLabel color="info" id="cloth_radio">
                          Ordered Clothing
                        </FormLabel>
                        <RadioGroup
                          required
                          row
                          aria-labelledby="cloth_radio"
                          name="cloth_radio"
                          onChange={() => setCloth(event.target.value)}
                        >
                          <FormControlLabel
                            value="T-shirt"
                            color="info"
                            control={<Radio size="large" />}
                            label="T-shirt"
                          />
                          <FormControlLabel
                            value="Crew-neck"
                            color="info"
                            control={<Radio size="large" />}
                            label="Crew-neck"
                          />
                          <FormControlLabel
                            value="Both"
                            color="info"
                            control={<Radio size="large" />}
                            label="Both"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid className="mar_both" item xs={12}>
                      <FormControl>
                        <FormLabel color="info" id="size_radio">
                          Ordered Clothing Size
                        </FormLabel>
                        <RadioGroup
                          required
                          row
                          aria-labelledby="size_radio"
                          name="size_radio"
                          className="flex_obligate"
                          onChange={() => setSize(event.target.value)}
                        > 
                        <div>
                          <FormControlLabel
                            value="S"
                            color="info"
                            control={<Radio size="large" />}
                            label="Small"
                          />
                          <FormControlLabel
                            value="M"
                            color="info"
                            control={<Radio size="large" />}
                            label="Medium"
                          />
                          <FormControlLabel
                            value="L"
                            color="info"
                            control={<Radio size="large" />}
                            label="Large"
                          />                    
                        </div>
                        <div>
                          <FormControlLabel
                            value="XL"
                            color="info"
                            control={<Radio size="large" />}
                            label="X-Large"
                          />
                          <FormControlLabel
                            value="2XL"
                            color="info"
                            control={<Radio size="large" />}
                            label="2X-Large"
                          />
                          <FormControlLabel
                            value="3XL"
                            color="info"
                            control={<Radio size="large" />}
                            label="3X-Large"
                          />                    
                        </div>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid className="mar_both" item xs={12}>
                      <FormControl>
                        <FormLabel color="info" id="size_radio">
                          Payment
                        </FormLabel>
                        <RadioGroup
                          required
                          row
                          aria-labelledby="size_radio"
                          name="size_radio"
                          onChange={() => setPayed(event.target.value)}
                        >
                          <FormControlLabel
                            value="Payed"
                            color="info"
                            control={<Radio size="large" />}
                            label="Payed"
                          />
                          <FormControlLabel
                            value="Not-Payed"
                            color="info"
                            control={<Radio size="large" />}
                            label="Not-Payed"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid container item justifyContent="center" xs={12} my={2}>
                      <MKButton
                        variant="gradient"
                        color="dark"
                        fullWidth
                        onClick={() => {
                          handelClick();
                        }}
                      >
                        Add Member
                      </MKButton>
                    </Grid>
                  </MKBox>
                </MKBox>
              </Grid>
            </Container>
          </MKBox>
        </BaseLayout>
      </>
    );
  } else {
    return (
      <>
        <MKBox
          position="absolute"
          top={0}
          left={0}
          zIndex={1}
          width="100%"
          minHeight="100vh"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.6),
                rgba(gradients.dark.state, 0.6)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
          <Grid  className="card_cont" container spacing={1} justifyContent="center" alignItems="center" height="100%">
            <MKTypography className="font-2" variant="h1" color="white" opacity={1} mt={1} mb={0}>
              <b className="gradtxt">A Good Soldier Of Jesus Christ</b>
            </MKTypography>
            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
              <Card className="ptop">
                <MKBox
                  variant="gradient"
                  bgColor="dark"
                  borderRadius="lg"
                  coloredShadow="info"
                  mx={2}
                  mt={-3}
                  p={2}
                  mb={1}
                  textAlign="center"
                  className="head_img_cont"
                >
                  <img src={logo} className="head_img" />
                </MKBox>
                <MKBox pt={4} pb={3} px={3}>
                  <MKBox component="form" role="form">
                    <MKBox mb={2}>
                      <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                          id="password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
                    </MKBox>
                    <MKBox mt={4} mb={1}>
                      <MKButton
                        variant="gradient"
                        color="dark"
                        onClick={() => {
                          if (password == "ARMY@1234#Admin") {
                            setAuth(true);
                          }
                        }}
                        fullWidth
                      >
                        sign in
                      </MKButton>
                    </MKBox>
                  </MKBox>
                </MKBox>
              </Card>
            </Grid>
          </Grid>
        </MKBox>
        <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
          <SimpleFooter light />
        </MKBox>
      </>
    );
  }
}

export default SignInBasic;
