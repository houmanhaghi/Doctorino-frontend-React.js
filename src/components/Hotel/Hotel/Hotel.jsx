import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  Container,
  Grid,
  Typography,
  TextField,
  Rating,
} from "@mui/material";
import './Hotel.css';
import AvailableRooms from "./AvailableRooms";
import AdapterJalali from "@date-io/date-fns-jalali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Hotel.css";
import { Box } from "@mui/system";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
// import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
// import VerifiedIcon from "@mui/icons-material/Verified";
import { Star } from "@mui/icons-material";
import { MdPool } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { MdDinnerDining } from "react-icons/md";
import { BiCoffeeTogo, BiWifi } from "react-icons/bi";
import { FaChild } from "react-icons/fa";
import { RiBilliardsFill } from "react-icons/ri";
import { AiFillSafetyCertificate } from "react-icons/ai";
import NavBar from "../../NavBar/newNavBar";
import theme from "../../../assets/theme/defaultTheme"
import NotFound from "../../../pages/NotFoundPage";

const useStyles = makeStyles({
  container: {
    marginTop: "69px",
    paddingTop: "30px",
  },
  card: {
    marginBottom: "40px",
  },
  featureCard: {
    width: "100%",
    height: "100%",
    display: "flex",
    paddingInline: "13px",
    marginBottom: "20px",
  },
  availableRoomsCard: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingInline: "13px",
    marginBottom: "20px",
  },
  hotel_image: {
    right: "5px",
    marginBottom: "30px",
    border: "2px solid #ccc",
    borderRadius: "10%",
    maxHeight: "250px",
    maxWidth: "250px",
  },
  toTimeDatePicker: {
    marginTop: "20px",
  },
  button: {
    width: "80%",
    backgroundColor: "#3b82f6",
    contrastText: "#fff",
    "&:hover": {
      backgroundColor: "#2563eb",
    },
  },
  rulesCard: {
    marginBottom: "20px",
    width: "100%",
  },
});
const Hotel = () => {
  // let date = new Date();
  // date = moment(date).locale("fa").format("YYYY/MM/DD").split("/");
  // console.log("the date", date.split("/"));
  // console.log("this is the day", date.jDay());
  // const [fromTime, setFromTime] = useState({day: 9, month: 10, year: 1401});
  // const [fromTime, setFromTime] = useState({day: date[2], month: date[1], year: date[0]});
  // const [toTime, setToTime] = useState({day: date[2], month: date[1], year: date[0]});
  // const [toTime, setToTime] = useState({day: 10, month: 10, year: 1401});
  // const [selectedDayRange, setSelectedDayRange] = useState({
  //   fromTime: null,
  //   toTime: null,
  // });
  const classes = useStyles();
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const { id } = useParams();
  const [hotel, setHotel] = useState();
  console.log(hotel);

  useEffect(() => {
    getHotel();
  }, []);

  const getHotel = () => {
    axios
      .get(`http://188.121.113.74/api/hotel/${id}/`)
      .then((res) => {
        setHotel({ ...res.data });
        setHotel({ ...res.data });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setLoaded(false);
        }
        console.log(err)
      });
  };



  const iconsFeatures = [
    { icon: <MdPool />, title: "استخر" },
    { icon: <CgGym />, title: "سالن بدن سازی" },
    { icon: <MdDinnerDining />, title: "سلف سرویس" },
    { icon: <BiCoffeeTogo />, title: "کافی شاپ" },
    { icon: <FaChild />, title: "اتاق کودک" },
    { icon: <BiWifi />, title: "وای فای رایگان" },
    { icon: <RiBilliardsFill />, title: "سالن بیلیارد" },
    { icon: <AiFillSafetyCertificate />, title: "صندوق امانت" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("fromTime: ", fromTime.toISOString().split("T")[0]);
    // console.log("toTime: ", toTime.toISOString().split("T")[0]);
    await axios
      .get(
        `http://188.121.113.74/api/hotel/${id}/${fromTime.toISOString().split("T")[0]
        }/${toTime.toISOString().split("T")[0]}/available_rooms/`
      )
      .then((response) => {
        console.log(
          "the response from fetching the available rooms: ",
          response.data
        );
        setAvailableRooms(response.data);
      })
      .catch((err) => console.log(err));
  };


  return (
    <>
      {loaded ?
        <Container className={classes.container}>
          <NavBar bgColor={theme.palette.hotel} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <Grid container sx={{ marginTop: "10px" }}>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <CardMedia
                      // sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px",marginRight: "20px"}}
                      component="img"
                      className={classes.hotel_image}
                      image={hotel?.cover_image}
                      alt="hotel image"
                    />
                  </Grid>
                  <Grid item xs={12} md={8}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardContent>
                      <Grid container rowSpacing={3.5}>
                        <Grid item xs={12} md={12}>
                          {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly sx={{justifyContent:"center", display:"flex", marginTop: "-10px", marginBlockEnd:"10px"}}/> */}
                          <Typography
                            variant="subtitle2"
                            sx={{ fontSize: "20px" }}
                          >
                            {`آدرس `}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "18px",
                              marginTop: "5px",
                            }}
                          >
                            <PlaceOutlinedIcon
                              color="warning"
                              sx={{ marginBottom: "-7px" }}
                            /> <span>    </span>
                            {hotel?.address}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontSize: "18px" }}
                          >
                            {`نام هتل `}
                          </Typography>
                          
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "18px",
                              marginTop: "5px",
                            }}
                          >
                            <VerifiedIcon
                              color="warning"
                              sx={{ marginBottom: "-7px" }}
                            /> <span>    </span>
                            {hotel?.hotel_name}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontSize: "18px", display: "inline" }}
                          >
                            <Star color="warning" sx={{ marginBottom: "-7px" }} /> <span>    </span>
                          </Typography>

                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontSize: "17px",
                              display: "inline",
                            }}
                          >
                            <b>{hotel?.hotel_stars}</b> <span>  </span>
                            ستاره
                          </Typography>

                        </Grid>
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card className={classes.featureCard}>
                <div>
                  <CardHeader
                    title="امکانات و ویژگی ها"
                    className="h2_emkanat"
                    sx={{ fontSize: "20px" }}
                  />
                  <CardContent>
                    <Typography
                      noWrap
                      variant="subtitle2"
                      sx={{
                        fontSize: "18px",
                      }}
                    >
                      {hotel?.features &&
                        hotel?.features.map((item, index) => {
                          return iconsFeatures.map((icon, index) => {
                            if (item.title === icon.title) {
                              return (
                                <div className="features_hotel" key={index}>
                                  <div className="features_icon">{icon.icon}</div>{" "}
                                  {item.title}
                                </div>
                              );
                            }
                          });
                        })}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card className={classes.availableRoomsCard}>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                      <DatePicker
                        label="تاریخ ورود"
                        mask="____/__/__"
                        value={fromTime}
                        onChange={(newValue) => setFromTime(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider
                      dateAdapter={AdapterJalali}
                      sx={{ marginTop: "20px" }}
                    >
                      <DatePicker
                        label="تاریخ خروج"
                        mask="____/__/__"
                        value={toTime}
                        onChange={(newValue) => setToTime(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    {/* <Grid item xs={6} md={6}> */}
                    {/* <DatePicker
                  inputPlaceholder="تاریخ ورود"
                  value={fromTime}
                  colorPrimary="#3f51b5"
                  colorPrimaryLight="#757ce8"
                  // onChange={(newValue) => setFromTime(newValue)}
                  onChange={setFromTime}
                  shouldHighlightWeekends
                  locale="fa"
                  calendarPopperPosition="bottom"
                  calendarSelectedDayClassName="selected-day"
                  calendarClassName="custom-calendar"
                />
                <DatePicker
                  inputPlaceholder="تاریخ خروج"
                  value={toTime}
                  colorPrimary="#3f51b5"
                  colorPrimaryLight="#757ce8"
                  // onChange={(newValue) => setToTime(newValue)}
                  onChange={setToTime}
                  shouldHighlightWeekends
                  locale="fa"
                  calendarPopperPosition="bottom"
                  calendarSelectedDayClassName="selected-day"
                  calendarClassName="custom-calendar"
                /> */}
                    {/* </Grid> */}
                  </CardContent>
                  <CardActions>
                    <Grid item md={12} xs={12}>
                      <button className={classes.button} type="submit">
                        مشاهده اتاق های موجود
                      </button>
                    </Grid>
                  </CardActions>
                </form>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}>
              {availableRooms && (
                <AvailableRooms
                  availableRooms={availableRooms}
                  fromTime={fromTime}
                  toTime={toTime}
                />
              )}
            </Grid>

            <Grid item xs={12} md={12}>
              <Card className={classes.rulesCard}>
                <div>
                  <CardHeader
                    title="قوانین هتل"
                    className="h2_emkanat"
                    sx={{ fontSize: "20px" }}
                  />
                  <CardContent>
                    <Grid container spacing={3.5}>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "18px", whiteSpace: "pre-line" }}
                        >
                          {hotel?.rules}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Container>
        :
        <NotFound />
      }
    </>
  );
};

export default Hotel;
