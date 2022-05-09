import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Rating, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import ReviewDataService from "../services/review.js";
import PropTypes from "prop-types";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";

const customIcons = {
  1: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  2: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  3: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
};

const labels = {
  3: "15 - 30 min",
  2: "30 - 45 min",
  1: "45+ min",
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function ReviewPost(props) {
  let review_data = {
    treatment_quality: 1,
    communication: 1,
    price: 1,
    facilities: 1,
    satisfaction: 1,
    personnel_treatment: 1,
    waiting_time: 2,
    explanation: 1,
    appointment: 1,
    username: "",
    review_comment: "",
    review_recommendation: "",
  };

  const isMobile = useMediaQuery("(max-width: 600px)");
  const date = new Date();
  const [review, setReview] = React.useState(review_data);
  const [submitted, setSubmitted] = React.useState(false);

  //console.log(isMobile);

  //endpoint post method
  const saveReview = () => {
    let data = {
      username: review.username,
      location: {
        city: "Mexicali",
        state: "Baja California",
        country: "Mexico",
      },
      review_values: {
        treatment_quality: parseInt(review.treatment_quality),
        communication: parseInt(review.communication),
        price: parseInt(review.price),
        facilities: parseInt(review.facilities),
        satisfaction: parseInt(review.satisfaction),
        personnel_treatment: parseInt(review.personnel_treatment),
        waiting_time: parseInt(review.waiting_time),
        explanation: parseInt(review.explanation),
        appointment: parseInt(review.appointment),
      },
      review_comment: review.review_comment,
      review_recommendation: review.review_recommendation,
    };

    ReviewDataService.createReview(data)
      .then((response) => {
        setSubmitted(true);
        console.log(response.data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //event handlers
  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value);
    setReview({
      ...review,
      [event.target.name]: value,
    });
  };

  //Component structure
  return (
    <>
      {
        //* titulo, ubicacion y fecha
      }
      <Grid item xs={12} paddingTop={2}>
        <Typography
          variant="h4"
          component="h4"
          align={isMobile ? "center" : "left"}
          className="titulo"
          paddingBottom={1}
        >
          Publicar Reseña
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography
          variant="subtitle1"
          align={isMobile ? "center" : "left"}
          className="subtitle"
        >
          Mexicali BC, M&eacute;xico
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          variant="subtitle2"
          align={isMobile ? "center" : "right"}
          className="subtitle"
          paddingBottom={3}
        >
          {date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </Grid>

      {
        //? inputs
      }
      <Box
        xs={12}
        className="container"
        sx={{
          padding: 3,
          width: "100%",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h6" className="titulo3">
            Calificacion
          </Typography>
          <Paper variant="outlined" className="separador" />
        </Grid>
        {
          //* ratings
        }
        <Grid item container xs={12} md={12} paddingBottom={3}>
          <StyledEngineProvider injectFirst>
            <Typography className={`${isMobile ? "rating-m" : "rating-d"}`}>
              Calidad del tratamiento
            </Typography>
            <Rating
              min={1}
              value={parseInt(review.treatment_quality)}
              className={`${isMobile ? "rating-v" : "rating-vd"}`}
              name="treatment_quality"
              onChange={handleChange}
            ></Rating>
            <Typography className={`${isMobile ? "rating-m" : "rating-d"}`}>
              Trato del personal
            </Typography>
            <Rating
              min={1}
              value={parseInt(review.personnel_treatment)}
              className={`${isMobile ? "rating-v" : "rating-vd"}`}
              name="personnel_treatment"
              onChange={handleChange}
            ></Rating>
            <Typography className={`${isMobile ? "rating-m" : "rating-d"}`}>
              Comunicaci&oacute;n del procedimiento
            </Typography>
            <Rating
              min={1}
              value={parseInt(review.communication)}
              className={`${isMobile ? "rating-v" : "rating-vd"}`}
              name="communication"
              onChange={handleChange}
            ></Rating>
            <Typography className={`${isMobile ? "rating-m" : "rating-d"}`}>
              Precio
            </Typography>
            <Rating
              min={1}
              value={parseInt(review.price)}
              className={`${isMobile ? "rating-v" : "rating-vd"}`}
              name="price"
              onChange={handleChange}
            ></Rating>
            <Typography className={`${isMobile ? "rating-m" : "rating-d"}`}>
              Explicaci&oacute;n del procedimiento
            </Typography>
            <Rating
              min={1}
              value={parseInt(review.explanation)}
              className={`${isMobile ? "rating-v" : "rating-vd"}`}
              name="explanation"
              onChange={handleChange}
            ></Rating>
            <Typography className={`${isMobile ? "rating-m" : "rating-d"}`}>
              Instalaciones
            </Typography>
            <Rating
              min={1}
              value={parseInt(review.facilities)}
              className={`${isMobile ? "rating-v" : "rating-vd"}`}
              name="facilities"
              onChange={handleChange}
            ></Rating>
            <Typography className={`${isMobile ? "rating-m" : "rating-d"}`}>
              Proceso de agendar cita
            </Typography>
            <Rating
              min={1}
              value={parseInt(review.appointment)}
              className={`${isMobile ? "rating-v" : "rating-vd"}`}
              name="appointment"
              onChange={handleChange}
            ></Rating>
            <Typography className={`${isMobile ? "rating-m" : "rating-d"}`}>
              Satisfacci&oacute;n
            </Typography>
            <Rating
              min={1}
              value={parseInt(review.satisfaction)}
              className={`${isMobile ? "rating-v" : "rating-vd"}`}
              name="satisfaction"
              onChange={handleChange}
            ></Rating>
            <Typography className={`${isMobile ? "rating-m" : "rating-d"}`}>
              Tiempo de espera
            </Typography>
            <Rating
              value={parseInt(review.waiting_time)}
              max={3}
              className={`${isMobile ? "rating-v" : "rating-wd"}`}
              name="waiting_time"
              IconContainerComponent={IconContainer}
              highlightSelectedOnly
              onChange={handleChange}
            ></Rating>
            <Box
              className={`${isMobile ? "rating-m" : "rating-de"}`}
              sx={{ ml: 2 }}
            >
              {" "}
              {labels[parseInt(review.waiting_time)]}
            </Box>
          </StyledEngineProvider>
          <Paper variant="outlined" className="separador" />
        </Grid>
        {
          //* nombre de usuario
        }
        <Grid item xs={12} paddingBottom={3}>
          <Typography variant="h6" className="titulo3">
            Nombre
          </Typography>
          <Paper variant="outlined" className="separador" />
          <TextField
            className="text-field"
            multiline
            value={review.username}
            placeholder={"Escriba aquí su nombre"}
            name="username"
            onChange={handleChange}
          />
        </Grid>
        {
          //* comentario
        }
        <Grid item xs={12} paddingBottom={3}>
          <Typography variant="h6" className="titulo3">
            Comentarios
          </Typography>
          <Paper variant="outlined" className="separador" />
          <TextField
            className="text-field"
            multiline
            value={review.review_comment}
            placeholder={"Escriba aquí sus comentarios"}
            name="review_comment"
            onChange={handleChange}
          />
        </Grid>
        {
          //* recomendacion
        }
        <Grid item xs={12} paddingBottom={3}>
          <Typography variant="h6" className="titulo3">
            ¿C&oacute;mo podemos mejorar?
          </Typography>
          <Paper variant="outlined" className="separador" />
          <TextField
            className="text-field"
            multiline
            value={review.review_recommendation}
            placeholder={"Escriba aquí su recomendación"}
            name="review_recommendation"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} paddingBottom={1}>
          <Button
            onClick={saveReview}
            variant="contained"
            className="boton"
            style={
              isMobile
                ? {
                    backgroundColor: "#0C0C34",
                    display: "flex",
                    margin: "auto",
                    width: "100%",
                  }
                : {
                    backgroundColor: "#0C0C34",
                    display: "flex",
                    margin: "auto",
                    padding: "15px 20px",
                  }
            }
          >
            Publicar
          </Button>
        </Grid>
      </Box>
    </>
  );
}
