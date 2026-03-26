import { WindowControls } from "../components/index.js";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { links } from "../constants/index.js";

const Contacts = () => {

    return <>
        <div id="window-header">
            <WindowControls target="contact" />
            <h2 className="font-Outfit font-medium" >Contact Us</h2>
        </div>

        <div className="p-5 space-y-5 text-white" style={{ background: "#1c1c1e" }}>

            {/* Avatar + Name */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img
                        src="/images/void-walkers.webp"
                        alt="Void Walkers"
                        className="w-16 h-16 rounded-full"
                        style={{ border: "2px solid rgba(255,255,255,0.12)" }}
                    />
                    <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full" style={{ background: "#30d158", border: "2px solid #1c1c1e" }} />
                </div>
                <div>
                    <p className="font-Outfit font-medium text-[17px] tracking-tight">Void Walkers</p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full" style={{ background: "rgba(48,209,88,0.15)", border: "0.5px solid rgba(48,209,88,0.3)" }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#30d158" }} />
                        <span className="text-[11px] font-medium" style={{ color: "#30d158" }}>Online</span>
                    </div>
                </div>
            </div>

            <div style={{ height: "0.5px", background: "rgba(255,255,255,0.08)" }} />

            <p className="font-JfSb font-bold tracking-widest uppercase text-white">Let's Connect</p>
            <p className="text-gray-400 font-RobSlb" >Void Walkers is a developer & designer community focused on Hackathons, CTFs, IoT, and robotics. Get in touch to collaborate or learn more.</p>

            <div className="w-full flex flex-col gap-3">

                {/* Social Links */}
                <div className="flex gap-3 w-full flex-wrap">
                    {links.map((item, i) => (
                        <a
                            key={i}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2 rounded-[10px] p-3 flex-1"
                            style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "0.5px solid rgba(255,255,255,0.08)"
                            }}
                        >
                            <div
                                className="w-[34px] h-[34px] rounded-lg flex items-center justify-center"
                                style={{
                                    background: item.bg,
                                    border: `0.5px solid ${item.border}`
                                }}
                            >
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    className="w-4 h-4 object-contain"
                                />
                            </div>

                            <div className="text-center">
                                <p className="text-[11px] font-RobSlb mb-0.5 text-white/40">
                                    {item.label}
                                </p>

                                <p className="text-[12px] font-RobSlb leading-tight">
                                    {item.value}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </div>
    </>
};

const ContactsWrapper = WindowWrapper(Contacts, "contact");

export default ContactsWrapper
