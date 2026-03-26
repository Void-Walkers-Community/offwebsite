import { WindowControls } from "../components/index.js";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { useState, useEffect } from "react";

const categoryColors = {
  crypto: { bg: "#fff3cd", text: "#856404" },
  forensics: { bg: "#cfe2ff", text: "#084298" },
  misc: { bg: "#e2e3e5", text: "#41464b" },
  osint: { bg: "#d1e7dd", text: "#0a3622" },
  stego: { bg: "#f8d7da", text: "#842029" },
  "general skills": { bg: "#e0cffc", text: "#432874" },
  web: { bg: "#fde8d8", text: "#8b3a0f" },
  rev_engg: { bg: "#d4edff", text: "#05386b" },
  binary_exp: { bg: "#fddde6", text: "#7d1128" },
  blockchain: { bg: "#d4f1c0", text: "#1a4301" },
  hardware: { bg: "#ffe5b4", text: "#7a4f00" },
  mobile: { bg: "#e8d5f5", text: "#4a1a7a" },
  ai: { bg: "#d0f0fd", text: "#0c4a6e" },
  pwn: { bg: "#ffe4e1", text: "#8b0000" },
  networking: { bg: "#e0f2f1", text: "#004d40" },
  ransomware: { bg: "#fce4ec", text: "#880e4f" },
  cloudsecurity: { bg: "#e3f2fd", text: "#0d47a1" },
};

const CategoryTag = ({ name }) => {
  const style = categoryColors[name] || { bg: "#f0f0f0", text: "#333" };

  return (
    <span style={{
      backgroundColor: style.bg,
      color: style.text,
      fontSize: "10px",
      fontWeight: 600,
      padding: "2px 7px",
      borderRadius: "20px",
      letterSpacing: "0.3px",
      whiteSpace: "nowrap",
    }}>
      {name}
    </span>
  );
};

const MemberCard = ({ member }) => {

  const avatarUrl = `https://raw.githubusercontent.com/Void-Walkers-Community/avatars/main/${member.id}.jpeg`;
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.18s ease",
        background: "rgba(255,255,255,0.065)",
        border: "0.5px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 1px 1px rgba(0,0,0,0.18)",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.065)"}
    >

      {/* Thumbnail */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", background: "#2c2c2e" }}>
        {!imgError ? (
          <img
            src={avatarUrl}
            alt={member.uName}
            onError={() => setImgError(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            fontWeight: 700,
            color: "#8e8e93",
          }}>
            {member.uName.charAt(0).toUpperCase()}
          </div>
        )}

        <div style={{
          position: "absolute",
          bottom: "8px",
          right: "8px",
          background: "rgba(0,0,0,0.75)",
          color: "#fff",
          fontSize: "10px",
          fontWeight: 600,
          padding: "2px 6px",
          borderRadius: "4px",
        }}>
          #{member.id}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: "6px" }}>

        <div style={{ display: "flex", gap: "8px" }}>

          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            overflow: "hidden",
            background: "#3a3a3c",
            flexShrink: 0,
          }}>
            {!imgError ? (
              <img src={avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#8e8e93",
                fontWeight: 700,
                fontSize: "13px",
              }}>
                {member.uName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#f2f2f7",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {member.uName}
            </div>

            <div style={{
              fontSize: "11px",
              color: "#8e8e93",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {member.description}
            </div>
          </div>

        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {member.category.slice(0, 4).map(cat => (
            <CategoryTag key={cat} name={cat} />
          ))}
        </div>

      </div>

    </div>
  );
};

const Members = () => {

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_MEMBERS_API;

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const fetched = Array.isArray(data)
          ? data
          : Array.isArray(data.members)
          ? data.members
          : [];

        const sorted = [...fetched].sort((a, b) => a.id - b.id);
        setMembers(sorted);
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
          <WindowControls target="finder" />
          <h2 className="font-Outfit font-medium">Members</h2>
        </div>

        {/* Scrollable area fills remaining height */}
        <div
          className="members-scroll px-5"
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div style={{
            marginTop: "16px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: "12px",
            /* Bottom padding so the last card clears nav bars on mobile */
            paddingBottom: "80px",
          }}>
            {members.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .members-scroll::-webkit-scrollbar {
          width: 7px;
        }

        .members-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.28);
          border-radius: 10px;
        }

        .members-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.45);
        }

        .members-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Extra bottom space on small screens */
        @media (max-width: 640px) {
          .members-scroll > div {
            padding-bottom: 120px !important;
          }
        }
      `}</style>
    </>
  );
};

const MembersWindow = WindowWrapper(Members, "finder");

export default MembersWindow;