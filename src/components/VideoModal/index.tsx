import React, { ReactElement, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Modal from "react-modal";
Modal.setAppElement("#___gatsby");
const GlobalStyle = createGlobalStyle`
  @keyframes SlideUp {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  }
.ReactModal__Overlay--after-open{
  opacity: 1 !important;
  .AnimationContainer{
    animation: SlideUp .5s;
  }

}

.ReactModal__Overlay--before-close{
  opacity:0 !important;
  .AnimationContainer{
    animation: SlideUp .5s reverse;
  }
}
`;
const VideoModal = styled(Modal)`
  background: none;
  border: none;
  inset: 0px;
  height: 100%;
  margin: 0 auto;

  padding: 1rem;
  transition: all 0.5s;
  outline: none;
`;

const Video = styled.div`
  width: 100%;
  position: relative;
  padding-top: 56.25%;

  iframe {
    position: absolute;
    left: 5%;
    top: 5%;
    background: #000;
    width: 90%;
    height: 90%;
    margin: auto;
  }
  @media (orientation: landscape) and (max-height: 460px) {
    iframe {
      width: 73%;
      height: 73%;
      left: 13%;
      top: 9%;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ExitButton = styled.button`
  position: absolute;
  z-index: 2;
  top: 0px;
  right: 20px;
  display: inline-block;
  width: 35px;
  height: 35px;
  border: none;
  cursor: pointer;
  background: transparent;
  &::before,
  &::after {
    content: "";
    position: absolute;
    height: 3px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background: #fff;
    border-radius: 5px;
    margin-top: -6px;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
  @media (max-width: 1100px) {
    top: -20px;
    right: 20px;
  }
  @media (max-width: 500px) {
    top: -20px;
    right: 10px;
  }
  @media (orientation: landscape) and (max-height: 460px) {
    top: 9%;
    right: 7%;
  }
`;
const modalStyles = {
  overlay: {
    background: "rgba(0,0,0,.5)",
    zIndex: 9999999999999,
    transition: "all .5s",
    outline: "none",
    opacity: 0,
  },
};

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  src: string;
}

const VideoModalComponent = ({
  isModalOpen,
  setIsModalOpen,
  src,
}: Props): ReactElement => {
  const videoRef = useRef<HTMLIFrameElement | null>();
  const clickHandler = e => {
    if (!videoRef.current.contains(e.target)) {
      setIsModalOpen(false);
      document.removeEventListener("mousedown", clickHandler);
    }
  };
  return (
    <>
      <GlobalStyle />
      <VideoModal
        closeTimeoutMS={500}
        contentLabel="Youtube Video"
        style={modalStyles}
        isOpen={isModalOpen}
      >
        <Wrapper onClick={clickHandler}>
          <Container className="AnimationContainer">
            <Video>
              <ExitButton
                aria-label="Luk Video Modal"
                onClick={() => setIsModalOpen(false)}
              ></ExitButton>
              <iframe
                ref={videoRef}
                src={src}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              ></iframe>
            </Video>
          </Container>
        </Wrapper>
      </VideoModal>
    </>
  );
};

export default React.memo(VideoModalComponent);
