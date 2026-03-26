import { WindowControls } from "../components/index.js";
import WindowWrapper from "../hoc/WindowWrapper.jsx";

const Safari = () => {
    return <>
        <div id="window-header">
            <WindowControls target="safari" />
            <h2 className="font-Outfit font-medium">About Us</h2>
        </div>

        <div
            className="blog"
            style={{ paddingBottom: "120px" }}
        >
            <h2 className="font-JfSb font-bold">About Us</h2>
            <p className="text-white font-RobSlb text-sm leading-relaxed">
                Founded in 2025, Void Walkers is a community of passionate developers and designers dedicated to creating innovative solutions and sharing knowledge. We build, break and rebuild through Hackathons, CTFs, IoT systems, robotics, drones, and RoboRace. Open to driven creators and curious guests alike, we value discipline and collaboration.
            </p>

            {/* Stats */}
            <section className="grid grid-cols-3 gap-2 px-2 py-4 w-full font-Outfit mt-2 mb-2">
                {[
                    { value: "40", label: "CTFTime Rank" },
                    { value: "49",  label: "Members" },
                    { value: "8",   label: "Live Events" },
                ].map(({ value, label }) => (
                    <div
                        key={label}
                        className="text-center rounded-xl py-3 px-1"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "0.5px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        <p className="text-white font-bold" style={{ fontSize: "clamp(16px, 4vw, 24px)" }}>{value}</p>
                        <p className="text-gray-400 tracking-wide mt-0.5" style={{ fontSize: "clamp(9px, 1.8vw, 12px)" }}>{label}</p>
                    </div>
                ))}
            </section>

            {/* Mission */}
            <div className="mt-2">
                <h2 className="font-JfSb font-bold text-pink-600" style={{ fontSize: "clamp(15px, 3vw, 20px)" }}>
                    Our Mission
                </h2>
                <p className="text-white font-RobSlb text-sm leading-relaxed mt-1">
                    We unite builders and thinkers to push the boundaries of technology, competing, experimenting, and engineering across hardware, software, and everything in between. A space where curiosity meets commitment, and ideas become reality.
                </p>
            </div>

            {/* Founders */}
            <div className="mt-4">
                <h2 className="font-JfSb font-bold text-pink-600" style={{ fontSize: "clamp(15px, 3vw, 20px)" }}>
                    Our Founders
                </h2>

                <div className="grid grid-cols-3 gap-2 mt-3 mb-2">
                    {[
                        { name: "Soumyajit", role: "Team Leader",  discord: "_iamsaber" },
                        { name: "Proyesh",   role: "Manager",      discord: "yashu_x_" },
                        { name: "Sadrita",   role: "Co-Founder",   discord: "sadritaneogi" },
                    ].map(({ name, role, discord }) => (
                        <div
                            key={name}
                            className="text-center rounded-xl py-3 px-1 font-Outfit"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "0.5px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <p
                                className="text-white font-bold leading-tight"
                                style={{ fontSize: "clamp(11px, 2.5vw, 18px)" }}
                            >
                                {name}
                            </p>
                            <p
                                className="text-gray-400 tracking-wide mt-1"
                                style={{ fontSize: "clamp(8px, 1.5vw, 11px)" }}
                            >
                                {role}
                            </p>
                            <p
                                className="text-gray-500 tracking-wide mt-1 flex items-center justify-center gap-1"
                                style={{ fontSize: "clamp(8px, 1.5vw, 11px)" }}
                            >
                                <img src="/icons/discord.svg" className="w-3 h-3 shrink-0" alt="discord" />
                                <span className="truncate">{discord}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
}

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;