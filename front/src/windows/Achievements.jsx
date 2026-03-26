import { WindowControls } from "../components/index.js";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { useState, useEffect } from "react";

const Achievements = () => {

    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_ACHIEVEMENTS_API;
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setAchievements(data.data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            {/* Outer wrapper: fixed window height, no overflow */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "clamp(30rem, 80vh, 40rem)",
                    overflow: "hidden",
                }}
            >
                {/* Header — fixed, never scrolls */}
                <div id="window-header" style={{ flexShrink: 0 }}>
                    <WindowControls target="achievements" />
                    <h2 className="font-Outfit font-medium">Achievements</h2>
                </div>

                {/* Scrollable area fills remaining height */}
                <div
                    className="achievements-scroll px-5"
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        overflowX: "hidden",
                    }}
                >
                    <p
                        className="mt-5 mb-3 uppercase"
                        style={{
                            fontSize: "clamp(10px, 1.2vw, 13px)",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            color: "rgba(255,255,255,0.45)",
                            fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif",
                        }}
                    >
                        CTF Achievements
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                            gap: "clamp(6px, 1vw, 10px)",
                            paddingBottom: "80px",
                        }}
                    >
                        {achievements.map((item, index) => (
                            <div
                                key={index}
                                className="transition-all duration-150 cursor-default"
                                style={{
                                    borderRadius: "12px",
                                    padding: "clamp(12px, 2vw, 18px)",
                                    background: "rgba(255,255,255,0.065)",
                                    border: "0.5px solid rgba(255,255,255,0.12)",
                                    backdropFilter: "blur(20px) saturate(1.4)",
                                    WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                                    boxShadow: "0 1px 1px rgba(0,0,0,0.18), inset 0 0.5px 0 rgba(255,255,255,0.1)",
                                    fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
                                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.065)"}
                            >
                                {/* Title */}
                                <h3
                                    style={{
                                        fontSize: "clamp(14px, 1.6vw, 17px)",
                                        fontWeight: 600,
                                        letterSpacing: "-0.01em",
                                        lineHeight: 1.3,
                                        color: "rgba(255,255,255,0.92)",
                                        marginBottom: "6px",
                                    }}
                                >
                                    {item.name}
                                </h3>

                                {/* Description */}
                                <p
                                    style={{
                                        fontSize: "clamp(12px, 1.2vw, 14px)",
                                        lineHeight: 1.55,
                                        color: "rgba(255,255,255,0.48)",
                                        marginBottom: "12px",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {item.category || "No description available."}
                                </p>

                                {/* Divider */}
                                <div style={{ height: "0.5px", background: "rgba(255,255,255,0.08)", marginBottom: "10px" }} />

                                {/* Info Grid */}
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "clamp(4px, 0.8vw, 8px) clamp(8px, 1.5vw, 16px)",
                                        fontSize: "clamp(11px, 1.1vw, 13px)",
                                        color: "rgba(255,255,255,0.38)",
                                    }}
                                >
                                    <span>
                                        Rank&nbsp;
                                        <span style={{
                                            color: item.rank <= 10
                                                ? "#FFD60A"
                                                : item.rank <= 50
                                                    ? "#30D158"
                                                    : "rgba(255,255,255,0.75)",
                                            fontWeight: 500,
                                        }}>
                                            #{item.rank}
                                        </span>
                                    </span>

                                    <span>
                                        Points&nbsp;
                                        <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                                            {parseFloat(item.points).toLocaleString()}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .achievements-scroll::-webkit-scrollbar {
                    width: 7px;
                }

                .achievements-scroll::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.28);
                    border-radius: 10px;
                }

                .achievements-scroll::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.45);
                }

                .achievements-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }

                /* Extra bottom space on small screens */
                @media (max-width: 640px) {
                    .achievements-scroll > div > div:last-child {
                        padding-bottom: 120px !important;
                    }
                }
            `}</style>
        </>
    );
}

const AchievementsWrapper = WindowWrapper(Achievements, "achievements");

export default AchievementsWrapper;