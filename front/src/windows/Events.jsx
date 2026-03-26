import { WindowControls } from "../components/index.js";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { useState, useEffect } from "react";

const Events = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_EVENTS_API;
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setEvents(data.events);
            })
            .catch(err => console.error(err));
    }, []);

    return <>
        <div id="window-header">
            <WindowControls target="events" />
            <h2 className="font-Outfit font-medium">Upcoming Events</h2>
        </div>

        <div className="px-5" style={{ paddingBottom: "120px" }}>

            <p
                className="mt-5 mb-3 uppercase"
                style={{
                    fontSize: "clamp(10px, 1.2vw, 13px)",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif"
                }}
            >
                Upcoming CTFs
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                    gap: "clamp(6px, 1vw, 10px)",
                }}
            >
                {events.map((event) => (
                    <div
                        key={event.id}
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
                            {event.title}
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
                            {event.description || "No description available."}
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
                                Format&nbsp;
                                <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                                    {event.format}
                                </span>
                            </span>

                            <span>
                                Duration&nbsp;
                                <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                                    {event.duration.days}d {event.duration.hours}h
                                </span>
                            </span>

                            <span>
                                Start&nbsp;
                                <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                                    {new Date(event.start).toLocaleDateString()}
                                </span>
                            </span>

                            <span>
                                Finish&nbsp;
                                <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                                    {new Date(event.finish).toLocaleDateString()}
                                </span>
                            </span>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    </>;
}

const EventsWindow = WindowWrapper(Events, "events");

export default EventsWindow;