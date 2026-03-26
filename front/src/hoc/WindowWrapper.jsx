import gsap from "gsap";
import { useLayoutEffect, useRef, useEffect, useState } from "react";
import useWindowStore from "../store/window.js";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {

    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey] || {};
        const ref = useRef(null);
        const draggableRef = useRef(null);
        const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

        // Track screen size
        useEffect(() => {
            const handleResize = () => setIsMobile(window.innerWidth < 768);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        // Open animation
        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;
            el.style.display = "block";
            gsap.fromTo(el,
                { scale: isMobile ? 1 : 0.8, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
            );
        }, [isOpen, isMobile]);

        // Draggable — desktop only
        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            if (!isMobile) {
                const [instance] = Draggable.create(el, {
                    onPress: () => focusWindow(windowKey)
                });
                draggableRef.current = instance;
                return () => instance.kill();
            } else {
                // Kill any existing draggable on mobile
                if (draggableRef.current) {
                    draggableRef.current.kill();
                    draggableRef.current = null;
                }
                // Reset any leftover GSAP transforms from dragging
                gsap.set(el, { x: 0, y: 0, clearProps: "transform" });
            }
        }, [isMobile]);

        // Show/hide
        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? "block" : "none";
        }, [isOpen]);

        return (
            <section
                id={windowKey}
                ref={ref}
                onClick={() => !isMobile && focusWindow(windowKey)}
                style={{
                    zIndex: isMobile ? 50 : zIndex,
                    backgroundColor: "#191919",

                    // Mobile: full screen fixed overlay
                    ...(isMobile ? {
                        position: "fixed",
                        inset: 0,
                        width: "100vw",
                        height: "100vh",
                        overflowY: "auto",
                        borderRadius: 0,
                    } : {
                        position: "absolute",
                    })
                }}
            >
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;

    return Wrapped;
};

export default WindowWrapper;