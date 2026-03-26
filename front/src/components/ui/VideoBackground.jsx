import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { MacDock, Navbar, Welcome } from "../index.js";
import { Contacts, Safari, Events, Achievements, Members } from "../../windows/index.js";

gsap.registerPlugin(Draggable);

const VideoBackground = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4" type="video/mp4" />
      </video>

      {/* Content above video */}
      <div className="relative z-10 h-full">
        <Navbar />
        <Welcome />
        <MacDock />

        <Safari/>
        <Contacts/>
        <Events />
        <Achievements />
        <Members />
      </div>
    </div>
  );
};

export default VideoBackground;