import { makeStyles } from '@mui/styles';
import { Card, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import './HotelReservation.css'
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../utils/useAxios";
import moment from "jalali-moment";


const useStyles = makeStyles({
    container: {
        marginTop: "20px",
        paddingTop: "30px",
    },
    card: {
        // display: "fix",
        width: "100%",
        height: "150px",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        paddingInline: "13px",
        marginBottom: "40px",
    },
    card2: {
        width: "100%",
        height: "500px",
        display: "fix",
        paddingInline: "13px",
        marginBottom: "20px",
    },
    card3: {
        width: "100%",
        height: "100px",
        display: "fix",
        paddingInline: "13px",
        marginBottom: "50px",
    },
});

const HotelReservation = () => {

    const location = useLocation();
    const { room, fromTime, toTime, finalPrice } = location.state;
    const [hotel, setHotel] = useState({});
    const [loading, setLoading] = useState(true);
    const [from_time, setFromTime] = useState(fromTime.toISOString().split("T")[0]);
    const [to_time, setToTime] = useState(toTime.toISOString().split("T")[0]);

    // console.log("here")
    // console.log("room", room)
    // console.log("fromTime", fromTime.toISOString().split("T")[0])
    // console.log("toTime", toTime.toISOString().split("T")[0])
    // console.log("finalPrice", finalPrice);
    // console.log(location.state);

    const api = useAxios();
    const { user, authData } = useContext(AuthContext);

    useEffect(() => {
        if (loading) {

            api.get(`api/hotel/${room.hotel}/`)
                .then(res => {
                    setHotel(res.data);
                }).catch(err => {
                    console.log(err);
                });

            setLoading(false);
        }
    }, [loading, finalPrice])

    const reserveRoom = () => {
        
        console.log(user);

        console.log({
            from_date: from_time,
            to_date: to_time,
            customer: user.id,
            hotel_room: room.id,
        })
        // api.post(`api/hotel/hotel_reserve/`, {
        //     from_date: fromTime,
        //     to_date: toTime,
        //     customer: user.id,
        //     hotel_room: room.id,
        // }).then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // })
    }

    const classes = useStyles();

    return (
        <Container className={classes.container} >
            <Card className={classes.card} >
                <Grid container sx={{ marginTop: "10px" }} >
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                        <div>
                            <h1 className='HotelName' >{hotel.hotel_name}</h1>
                        </div>
                        <div className='HotelReservationInfo'>
                            <div className='HotelStars'>
                                <div>{hotel.hotel_stars} ستاره</div>
                            </div>
                            <div className='HotelLocation'>
                                <div><span>آدرس : </span><span className='Adr'>{hotel.province} {hotel.city} {hotel.address}</span></div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Card>
            <Card className={classes.card3}>
                <Grid container sx={{ marginTop: "10px" }} >
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                        <div className='PricenAndButton'>
                            <div className='Price'>
                                <div className='PriceTitle'> قیمت نهایی : <span>{finalPrice}</span></div>
                            </div>
                            <div className='Button'>
                                <button className='ButtonReserve' onClick={reserveRoom}> رزرو و تایید نهایی</button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
}

export default HotelReservation;