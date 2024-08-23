import * as React from "react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import BaseLayout from "layouts/sections/components/BaseLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase.js";
import "./style.css";
import alt_img from "../../../assets/icons/alt_img.png";
import MKTypography from "components/MKTypography";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RefreshIcon from "@mui/icons-material/Refresh";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

function ContactUs() {
    const [chn, setchn] = useState("-");
  const columns6 = [
    {
      headerName: "Num",
      checkboxSelection: true,
      valueGetter: "node.rowIndex + 1",
      width: 130,
      minWidth: 130,
    },
    {
      field: "image",
      minWidth: 100,
      width: 100,
      headerName: "",
      filter: false,
      sortable: false,
      cellRenderer: (params) => (
        <img
          src={params.value ? params.value : alt_img}
          className={params.value ? "img" : "img_alt"}
        />
      ),
    },
    {
      field: "name",
      minWidth: 150,
      headerName: "Name",
      width: 200,
      filter: "agTextColumnFilter",
      editable: true,
    },
    {
      field: "age",
      editable: true,
      minWidth: 80,
      headerName: "Age",
      width: 80,
      filter: "agNumberColumnFilter",
    },
    {
      field: "phone_number",
      editable: true,
      minWidth: 150,
      headerName: "Phone Number",
      filter: "agNumberColumnFilter",
      width: 150,
    },
    {
      field: "cloth",
      editable: true,
      minWidth: 130,
      headerName: "Cloth Type",
      width: 150,
      filter: "agTextColumnFilter",
    },
    {
      field: "t_size",
      editable: true,
      minWidth: 80,
      headerName: "T-shirt Size",
      width: 100,
      filter: "agTextColumnFilter",
    },
    {
      field: "c_size",
      editable: true,
      minWidth: 80,
      headerName: "Crew-neck Size",
      width: 100,
      filter: "agTextColumnFilter",
    },
    {
      field: "payed",
      editable: true,
      minWidth: 80,
      headerName: "Payment",
      width: 150,
      filter: "agTextColumnFilter",
    },
    {
      field: "foundation_level",
      minWidth: 150,
      headerName: "Foundation Level",
      width: 200,
      filter: "agTextColumnFilter",
      editable: true,
    },
    {
      field: "year_joined",
      minWidth: 100,
      headerName: "Year joined (to GLC)",
      width: 150,
      filter: "agTextColumnFilter",
      editable: false,
    },
    {
      field: "educational_status",
      minWidth: 100,
      headerName: "Educational Status",
      width: 150,
      filter: "agTextColumnFilter",
      editable: true,
    },
    {
      field: "residential_address",
      minWidth: 150,
      headerName: "Residential Address",
      width: 200,
      filter: "agTextColumnFilter",
      editable: true,
    },
    {
      field: "school_name",
      minWidth: 150,
      headerName: "School Name",
      width: 200,
      filter: "agTextColumnFilter",
      editable: true,
    },
    {
      field: "school_address",
      minWidth: 150,
      headerName: "School Address",
      width: 200,
      filter: "agTextColumnFilter",
      editable: true,
    },
    {
      field: "time",
      minWidth: 150,
      headerName: "Time Stamp",
      width: 200,
      editable: false,
      filter: "agTextColumnFilter",
    },
  ];

  const onRowSelected = useCallback(
    (event) => {
      if (event.node.isSelected()) {
        if (confirm("Delete " + event.node.data.name + "?")) {
          deleteDoc(
            doc(
              db,
              "users",
              event.node.data.name.split(" ")[0] + event.node.data.phone_number
            )
          )
            .then(() => {
              window.alert("Document successfully deleted!");
            })
            .catch((error) => {
              window.alert("Error removing document: ", error);
            });
        }
      }
    },
    [window]
  );

  // const onSelectionChanged = useCallback(
  //   (event) => {
  //     var rowCount = event.api.getSelectedNodes().length;
  //     window.alert("selection changed, " + rowCount + " rows selected");
  //   },
  //   [window],
  // );

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 55,
      filter: true,
      floatingFilter: true,
      suppressHeaderMenuButton: true,
      suppressMaxRenderedRowRestriction: true,
    };
  }, []);

  const [Deleteon, setDeleteon] = useState(false);
  const toggleDel = () => setDeleteon(!Deleteon);

  const [rows, setR] = useState([]);
  var users = [];
  useEffect(() => {
    const colref = collection(db, "users");

    getDocs(colref)
      .then((snapshot) => {
        snapshot.docs
          .forEach((doc) => {
            users.push({ ...doc.data() });
            setR([...users]);
          })
          .catch((error) => {
            console.error("Error getting documents :", error);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const refresh = () => {
    const colref = collection(db, "users");
    getDocs(colref)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          users.push({ ...doc.data() });
          setR([...users]);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const gridRef = useRef();
  const onCellValueChanged = async (event) => {
    const { user_id } = event.data; // Get the document ID
    const field = event.colDef.field; // Get the field/column that was edited
    const newValue = event.newValue ; // Get the new value
    setchn(newValue)
    console.log(field, newValue, user_id);
    try {
      const docRef = doc(db, "users", user_id);

      const docSnap = await getDocs(docRef);

      if (docSnap.exists()) {
        if (field == "name") {
            await updateDoc(docRef),
              {
                name: "updated", //field which you have to update
              };
          } else if (field == "payed") {
            await updateDoc(docRef),
              {
                payed: newValue, //field which you have to update
              };
          } else if (field == "phone_number") {
            await updateDoc(docRef),
              {
                phone_number: newValue, //field which you have to update
              };
          } else if (field == "residential_address") {
            await updateDoc(docRef),
              {
                residential_address: newValue, //field which you have to update
              };
          } else if (field == "cloth") {
            await updateDoc(docRef),
              {
                cloth: newValue, //field which you have to update
              };
          } else if (field == "educational_status") {
            await updateDoc(docRef),
              {
                educational_status: newValue, //field which you have to update
              };
          } else if (field == "foundation_level") {
            await updateDoc(docRef),
              {
                foundation_level: newValue, //field which you have to update
              };
          } else if (field == "school_address") {
            await updateDoc(docRef),
              {
                school_address: newValue, //field which you have to update
              };
          } else if (field == "t_size") {
            await updateDoc(docRef),
              {
                t_size: newValue, //field which you have to update
              };
          } else if (field == "c_size") {
            await updateDoc(docRef),
              {
                c_size: newValue, //field which you have to update
              };
          } else if (field == "age") {
            await updateDoc(docRef),
              {
                age: newValue, //field which you have to update
              };
          } else if (field == "school_name") {
            await updateDoc(docRef),
              {
                school_name: newValue, //field which you have to update
              };
          }
        alert(
          `Document successfully updated! Field: ${field}, New Value: ${chn}`
        );
      } else {
        alert("No such document!");
      }
    } catch (error) {
      alert(`Field: ${field}, New Value: ${newValue} \n Error updating document: ${error}`);
      console.log("Error updating document: ", error)
    }
  };
  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
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
        Please use a larger screen to view the whole data (or enable desktop
        mode on your mobile browser)
      </MKTypography>
      <button className="down" onClick={onBtnExport}>
        Download CSV export file
      </button>
      <Grid
        className="wide"
        container
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{ mt: 10 }}
      >
        <div
          className={"ag-theme-quartz"}
          style={{ width: "90%", height: 637 }}
        >
          <AgGridReact
            rowData={rows}
            ref={gridRef}
            columnDefs={columns6}
            defaultColDef={defaultColDef}
            rowSelection={"single"}
            suppressExcelExport={true}
            onRowSelected={Deleteon ? onRowSelected : null}
            onCellValueChanged={onCellValueChanged}
            // onSelectionChanged={onSelectionChanged}
          />
        </div>
      </Grid>
      <Box
        sx={{
          height: "auto",
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <div
          onClick={() => {
            toggleDel();
          }}
          className={Deleteon ? "dele" : "dele_off"}
        >
          <DeleteRoundedIcon calssName="delesvg" />
        </div>
      </Box>
      <Box
        sx={{
          height: "auto",
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "fixed",
          bottom: 16,
          left: 16,
        }}
      >
        <div
          onClick={() => {
            refresh();
          }}
          className="dele_off"
        >
          <RefreshIcon calssName="delesvg" />
        </div>
      </Box>
    </BaseLayout>
  );
}

export default ContactUs;
