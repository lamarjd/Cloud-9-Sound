import { Route } from "react-router-dom";
import {useState, useEffect} from 'react';
import Song from "../Songs/Song";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import logo from "../assets/images/CLOUD9Logo.png";
import splash1 from "../assets/images/splash1.jpg";
import splash2 from "../assets/images/splash2.jpg";
import splash3 from "../assets/images/splash3.jpg";
import "./SplashPage.css";

const images = [
  splash1,
  splash2,
  splash3
]

function SplashPage({ user }) {
  // carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCircleIndex, setSelectedCircleIndex] = useState(0);


/*
Not implemented, but the below allows usage of arrow buttons to navigate through the images
*/
  // // Carousel Previous image
  // const prevImage = () => {
  //   setCurrentIndex(currentIndex === 0 ? images.length -1 : currentIndex -1)
  // }

  // // Carousel Next image
  // const nextImage = () => {
  //   setCurrentIndex(currentIndex === images.length -1 ? 0 : currentIndex + 1)
  // }

  // Circle Clcik
  const handleCircleClick = (index) => {
    setCurrentIndex(index);
    setSelectedCircleIndex(index);
  };

// sets up the carousel timer when the component mounts, and the second useEffect ensures that the selectedCircleIndex is updated when the currentIndex changes.
  useEffect(() => {
    let intervalId;

    const startCarousel = () => {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, 10000);
    };

    startCarousel();

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  useEffect(() => {
    setSelectedCircleIndex(currentIndex);
  }, [currentIndex]);

  return (
    <>
      {!user && (
        <div className="splash-container">
          <div className="splash-content">
            <div className="splash-picture-container">
              
              <img alt="splash-pic" id="splashImg" src={images[currentIndex]} />

              {/* <div className="splash-radial">
                {images.map(() => {

                return "O"
                })}
              </div> */}

<div className="splash-radial">
        {images.map((_, index) => (
          <div
            key={index}
            className={`radial-circle${selectedCircleIndex === index ? ' selected' : ''}`}
            onClick={() => handleCircleClick(index)}
          />
        ))}
      </div>

              <div className="top-left">
                <img id="logo" alt="logo" src={logo} />
              </div>

              <div className="top-right">
                <Route exact path="/">
                  <LoginFormModal />
                  <SignupFormModal />
                </Route>
              </div>

              <div className="center">
                <h1>Welcome to Cloud 9</h1>
                <h3>Join the community and start sharing your music today.</h3>
                <h5>For Artists, by Artists</h5>
              </div>
            </div>{" "}
            <br />
            <div className="song-display">
              <Song user={user} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SplashPage;
