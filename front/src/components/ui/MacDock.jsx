import { useRef, useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import gsap from 'gsap';

import { dockApps } from "../../constants";
import { useGSAP } from "@gsap/react";
import useWindowStore from "../../store/window.js"

const MacDock = () => {
    const { openWindow, closeWindow, windows } = useWindowStore();
    const dockRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useGSAP(() => {
        if (isMobile) return;

        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll(".dock-icon");

        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect();
            icons.forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** 2.5) / 20000);
                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out",
                });
            });
        };

        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();
            animateIcons(e.clientX - left);
        };

        const resetIcons = () =>
            icons.forEach((icon) =>
                gsap.to(icon, { scale: 1, y: 0, duration: 0.3, ease: "power1.out" })
            );

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        };
    }, [isMobile]);

    const toggleApp = (app) => {
        if (!app.canOpen) return;
        const win = windows[app.id];
        if (!win) {
            console.warn(`No window config found for app id: ${app.id}`);
            return;
        }
        win.isOpen ? closeWindow(app.id) : openWindow(app.id);
    };

    // ── Mobile ──────────────────────────────────────────────────────────────
    if (isMobile) {
        return (
            <section
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    padding: "10px 16px 16px",
                    background: "rgba(30,30,30,0.85)",
                    backdropFilter: "blur(24px) saturate(1.6)",
                    WebkitBackdropFilter: "blur(24px) saturate(1.6)",
                    borderTop: "0.5px solid rgba(255,255,255,0.1)",
                }}
            >
                <div
                    ref={dockRef}
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${dockApps.length}, 1fr)`,
                        gap: "4px",
                        width: "100%",
                    }}
                >
                    {dockApps.map(({ id, name, icon, canOpen }) => (
                        <button
                            key={id}
                            type="button"
                            aria-label={name}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "4px",
                                padding: "6px 2px",
                                borderRadius: "12px",
                                background: "transparent",
                                border: "none",
                                cursor: canOpen ? "pointer" : "default",
                                minWidth: 0,
                            }}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                loading="lazy"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    objectFit: "contain",
                                    opacity: canOpen ? 1 : 0.6,
                                }}
                            />
                            <span style={{
                                fontSize: "9px",
                                color: canOpen ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
                                fontFamily: "-apple-system, 'SF Pro Text', BlinkMacSystemFont, sans-serif",
                                letterSpacing: "0.01em",
                                lineHeight: 1,
                                width: "100%",
                                textAlign: "center",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}>
                                {name}
                            </span>
                        </button>
                    ))}
                </div>
            </section>
        );
    }

    // ── Desktop ─────────────────────────────────────────────────────────────
    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                loading="lazy"
                                className={canOpen ? '' : "opacity-60"}
                            />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    );
};

export default MacDock;