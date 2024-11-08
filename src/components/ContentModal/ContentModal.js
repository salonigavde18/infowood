import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";


import Carousel from "../Carousel/Carousel";
import "./ContentModal.css";

export default function TransitionsModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API}&language=en-US`
      );
      setContent(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API}&language=en-US`
      );
      setVideo(data.results.length > 0 ? data.results[0].key : null);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, [media_type, id]);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>
          {content && (
            <Box
              sx={{
                width: "90%",
                height: "80%",
                backgroundColor: "#39445a",
                borderRadius: 10,
                color: "white",
                boxShadow: 5,
                padding: 2,
              }}
            >
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  {video && (
                    <Button
                      variant="contained"
                      startIcon={<YouTubeIcon />}
                      color="secondary"
                      target="__blank"
                      href={`https://www.youtube.com/watch?v=${video}`}
                    >
                      Watch the Trailer
                    </Button>
                  )}
                </div>
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}
