import * as React from "react";
import { useState, useEffect } from "react";
import BaseLayout from "layouts/sections/components/BaseLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase.js";
import "./style.css";
import alt_img from "../../../assets/icons/alt_img.png";
import MKTypography from "components/MKTypography";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import MKInput from "components/MKInput";
import MKAlert from "components/MKAlert";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
function ContactUs() {
  // const handeltouchdel = () => {
  //   toggleModaldel
  // };
  const handeltouchedit = () => {
    window.alert("edit is out of function for the time being");
  };

  const [delName, setDelname] = useState("");
  const columns1 = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
  ];
  const columns2 = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 150,
      editable: false,
    },
  ];
  const columns3 = [
    {
      field: "image",
      headerName: "",
      width: 55,
      editable: true,
      renderCell: (params) => (
        <img
          src={params.value ? params.value : alt_img}
          className={params.value ? "img" : "img_alt"}
        />
      ), // renderCell will render the component
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 150,
      editable: false,
    },
  ];
  const columns4 = [
    {
      field: "image",
      headerName: "",
      width: 55,
      editable: true,
      renderCell: (params) => (
        <img
          src={params.value ? params.value : alt_img}
          className={params.value ? "img" : "img_alt"}
        />
      ), // renderCell will render the component
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "age",
      headerName: "Age",
      width: 80,
      editable: false,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 150,
      editable: false,
    },
  ];
  const columns5 = [
    {
      field: "image",
      headerName: "",
      width: 55,
      editable: true,
      renderCell: (params) => (
        <img
          src={params.value ? params.value : alt_img}
          className={params.value ? "img" : "img_alt"}
        />
      ), // renderCell will render the component
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "age",
      headerName: "Age",
      width: 80,
      editable: false,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 150,
      editable: false,
    },
    {
      field: "residential_address",
      headerName: "Residence",
      width: 150,
      editable: false,
    },
  ];
  const columns6 = [
    {
      field: "image",
      headerName: "",
      width: 55,
      editable: true,
      renderCell: (params) => (
        <img
          src={params.value ? params.value : alt_img}
          className={params.value ? "img" : "img_alt"}
        />
      ), // renderCell will render the component
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "age",
      headerName: "Age",
      width: 80,
      editable: false,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 150,
      editable: false,
    },
    {
      field: "cloth",
      headerName: "Cloth Type",
      width: 150,
      editable: false,
    },
    {
      field: "size",
      headerName: "Size",
      width: 100,
      editable: false,
    },
    {
      field: "payed",
      headerName: "Payment",
      width: 150,
      editable: false,
    },
  ];

  const [show, setShow] = useState(false);
  const toggleModaldel = () => setShow(!show);

  const [rows, setR] = useState([]);
  var users = [];
  useEffect(() => {
    const colref = collection(db, "users");

    getDocs(colref)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          users.push({ ...doc.data() });
        });
        setR([...users]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
      <BaseLayout
        title="Registered members"
        breadcrumb={[
          { label: "Add members", route: "/home" },
          { label: "Registered members" },
        ]}
      >
        <MKTypography variant="caption" color="text" className="dis">
          Please use a larger screen to view the whole data (or enable desktop mode on your mobile
          browser)
        </MKTypography>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{ mt: 10 }}
        >
          <div>
            <Box sx={{ height: 637, width: "100%" }} className="show_n1">
              <DataGrid getRowId={(row) => row.user_id} rows={rows} columns={columns1} />
            </Box>
            <Box sx={{ height: 637, width: "100%" }} className="show_n2">
              <DataGrid getRowId={(row) => row.user_id} rows={rows} columns={columns2} />
            </Box>
            <Box sx={{ height: 637, width: "100%" }} className="show_n3">
              <DataGrid getRowId={(row) => row.user_id} rows={rows} columns={columns3} />
            </Box>
            <Box sx={{ height: 637, width: "100%" }} className="show_n4">
              <DataGrid getRowId={(row) => row.user_id} rows={rows} columns={columns4} />
            </Box>
            <Box sx={{ height: 637, width: "100%" }} className="show_n5">
              <DataGrid getRowId={(row) => row.user_id} rows={rows} columns={columns5} />
            </Box>
            <Box sx={{ height: 637, width: "100%" }} className="show_n6">
              <DataGrid getRowId={(row) => row.user_id} rows={rows} columns={columns6} />
            </Box>
          </div>
        </Grid>
        <Box
          sx={{
            height: 320,
            transform: "translateZ(0px)",
            flexGrow: 1,
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
        >
          <SpeedDial
            className="dail"
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            <SpeedDialAction
              key={"Edit"}
              icon={<EditIcon />}
              tooltipTitle={"Edit"}
              onClick={handeltouchedit}
            />
            <SpeedDialAction
              key={"Delete"}
              icon={<DeleteRoundedIcon />}
              tooltipTitle={"Delete"}
              onClick={toggleModaldel}
            />
          </SpeedDial>
        </Box>
        <Modal open={show} onClose={toggleModaldel} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={show} timeout={500}>
            <MKBox
              position="relative"
              width="500px"
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              bgColor="white"
              shadow="xl"
              className="wid"
            >
              <MKBox display="flex" alignItems="center" justifyContent="space-between" p={2}>
                <MKTypography variant="h5">Delete user</MKTypography>
                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModaldel} />
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox p={5}>
                <MKInput
                  variant="standard"
                  type="text"
                  label="User UID"
                  fullWidth
                  className="margin_bottom"
                  onChange={(e) => {
                    setDelname(e.target.value);
                  }}
                />

                <MKAlert
                  variant="body2"
                  color="secondary"
                  fontWeight="regular"
                  className="margin_top_l"
                >
                  Use the formate &quot;Firstname_Phonenumber&quot;
                </MKAlert>
              </MKBox>
              <MKBox display="flex" justifyContent="space-between" p={1.5}>
                <MKButton
                  variant="gradient"
                  color="dark"
                  onClick={() => {
                    if ((delName == "")) {
                      window.alert("Please enter the user to be removed")
                    } else {
                      toggleModaldel();
                      deleteDoc(doc(db, "users", delName))
                        .then(() => {
                          window.alert("Document successfully deleted!");
                        })
                        .catch((error) => {
                          window.alert("Error removing document: ", error);
                        });
                    }
                  }}
                >
                  Delete User
                </MKButton>
              </MKBox>
            </MKBox>
          </Slide>
        </Modal>
      </BaseLayout>
  );
}

export default ContactUs;
