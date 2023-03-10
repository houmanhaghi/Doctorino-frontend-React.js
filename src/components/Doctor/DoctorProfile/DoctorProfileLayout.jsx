//dr prof layout
import React from "react";
import { Container, CssBaseline, Grid, Paper } from "@mui/material";
import DoctorProfile from "./Profile";
import ScheduleTime from "./scheduleTable";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import NavBar from "../../NavBar/newNavBar";
import theme from "../../../assets/theme/defaultTheme"
import { Schedule } from "@mui/icons-material";
import NotFound from "../../../pages/NotFoundPage";

export default function DoctorProfileLayout() {

    const { id } = useParams();
    const [doctor, setDoctor] = useState();
    // const [scheduleTime, setScheduleTime] = useState();
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(true);

    function fetchData1() {
        axios.get(`http://188.121.113.74/api/doctor/${id}/?`)
            .then(res => {
                setDoctor(res.data);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setLoaded(false);
                }
            })

        setLoading(false);
    }


    useEffect(() => {

        if (loading) {
            fetchData1();
            // fetchData2();
        }

    }, [loading, doctor, setLoading, setDoctor, loaded])

    return (
        <>
            {loaded ?
                <Container>
                    <NavBar bgColor={theme.palette.doctor} />
                    <CssBaseline />
                    <Grid container spacing={4}>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                mr: "10px",
                                Width: "100%",
                                display: {xs: "static", md: "none", lg: "none"},
                                position: "static",
                                flexDirection: "row",
                                height: "auto",
                                alignItems: "center",
                                boxSizing: "border-box"
                            }}
                        >
                            <ScheduleTime doctor={doctor} />
                        </Grid>
                        <Grid
                            xs={12}
                            md={7}
                            lg={7}
                            item
                            sx={{
                                Width: "100%",
                                display: "static",
                                height: "auto",
                                alignItems: "center",
                                boxSizing: " border-box"
                            }}
                        >
                            <DoctorProfile doctor={doctor} doctorId={id} />
                        </Grid>

                        <Grid
                            item
                            xs={4.5}
                            md={4.5}
                            sx={{
                                mr: "10px",
                                Width: "100%",
                                display: {xs: "none", md: "flex", lg: "flex"},
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                height: "auto",
                                alignItems: "center",
                                boxSizing: " border-box"
                            }}
                        >
                            <ScheduleTime doctor={doctor} />
                        </Grid>
                    </Grid>
                </Container >
                :
                <NotFound />
            }
        </>
    );
}