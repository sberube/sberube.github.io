import satori from "satori";
// import { html } from "satori-html";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";

// const markup = html`<div
//       style={{
//         background: "#fefbfb",
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: "-1px",
//           right: "-1px",
//           border: "4px solid #000",
//           background: "#ecebeb",
//           opacity: "0.9",
//           borderRadius: "4px",
//           display: "flex",
//           justifyContent: "center",
//           margin: "2.5rem",
//           width: "88%",
//           height: "80%",
//         }}
//       />

//       <div
//         style={{
//           border: "4px solid #000",
//           background: "#fefbfb",
//           borderRadius: "4px",
//           display: "flex",
//           justifyContent: "center",
//           margin: "2rem",
//           width: "88%",
//           height: "80%",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             margin: "20px",
//             width: "90%",
//             height: "90%",
//           }}
//         >
//           <p
//             style={{
//               fontSize: 72,
//               fontWeight: "bold",
//               maxHeight: "84%",
//               overflow: "hidden",
//             }}
//           >
//             {post.data.title}
//           </p>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               width: "100%",
//               marginBottom: "8px",
//               fontSize: 28,
//             }}
//           >
//             <span>
//               by{" "}
//               <span
//                 style={{
//                   color: "transparent",
//                 }}
//               >
//                 "
//               </span>
//               <span style={{ overflow: "hidden", fontWeight: "bold" }}>
//                 {post.data.author}
//               </span>
//             </span>

//             <span style={{ overflow: "hidden", fontWeight: "bold" }}>
//               {SITE.title}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>`;

// Dark theme accent (from dark theme root vars) used for glow and details
const ACCENT = "#eb3fd3"; // mirrors --accent in dark mode
const BG_DARK_TOP = "#0b1019";
const BG_DARK_BOTTOM = "#1e2b3c";

// Create a small star field: generate deterministic pseudo-random stars based on title length
function buildStars(seedStr) {
  const count = 200; // increased density similar to site OG
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  const stars = [];
  for (let i = 0; i < count; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0; // LCG
    const x = seed % 1200;
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const y = seed % 630;
  const size = 1 + (seed % 4); // 1 - 4 px varied
  const opacity = 0.35 + ((seed >> 3) % 55) / 100; // 0.35 - 0.89
    stars.push({
      type: "div",
      props: {
        style: {
          position: "absolute",
          left: x + "px",
          top: y + "px",
          width: size + "px",
          height: size + "px",
          background: "#ffffff",
          opacity,
          borderRadius: "50%",
        },
      },
    });
  }
  return stars;
}

// Inline favicon path nodes (stroke uses currentColor so set color externally)
const faviconSvg = {
  type: "svg",
  props: {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ACCENT,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    width: 48,
    height: 48,
    children: [
      { type: "path", props: { d: "M0 0h24v24H0z", fill: "none", stroke: "none" } },
      { type: "path", props: { d: "M12.5 16h-8.5a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v8" } },
      { type: "path", props: { d: "M7 20h4" } },
      { type: "path", props: { d: "M9 16v4" } },
      { type: "path", props: { d: "M20 21l2 -2l-2 -2" } },
      { type: "path", props: { d: "M17 17l-2 2l2 2" } },
    ],
  },
};

export default async post => {
  const stars = buildStars(post.data.title + post.data.author);
  // Removed panel design; using global accent border like site OG image

  return satori(
    {
      type: "div",
      props: {
        style: {
          position: "relative",
          background: `linear-gradient(160deg, ${BG_DARK_TOP}, ${BG_DARK_BOTTOM} 65%, #152132)`,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: 'Roboto Mono, ui-monospace, Menlo, "Cascadia Mono", "Segoe UI Mono", monospace',
          color: "#fff",
        },
        children: [
          // star field
          ...stars,
          // content container (title + footer) inside bordered dark box
          {
            type: "div",
            props: {
              style: {
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 40,
                padding: "56px 90px 48px 90px",
                width: "880px",
                border: `10px solid ${ACCENT}`,
                background: "#0d1622ee",
                boxShadow: `0 12px 40px -10px ${ACCENT}66, 0 0 0 1px #ffffff10`,
                borderRadius: 34,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 84,
                      fontWeight: 800,
                      lineHeight: 1.06,
                      letterSpacing: "-1.25px",
                      display: "block",
                      maxHeight: 400,
                      overflow: "hidden",
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                    },
                    children: post.data.title,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: 32,
                      fontWeight: 600,
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: { display: "flex", flexDirection: "row", gap: 12 },
                          children: [
                            { type: "span", props: { style: { opacity: 0.75 }, children: "by" } },
                            { type: "span", props: { style: { fontWeight: 700 }, children: post.data.author } },
                          ],
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: { display: "flex", flexDirection: "row", alignItems: "center", gap: 20 },
                          children: [
                            {
                              type: "span",
                              props: {
                                style: {
                                  fontWeight: 700,
                                  fontSize: 38,
                                  letterSpacing: "0.4px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 14,
                                },
                                children: SITE.title,
                              },
                            },
                            faviconSvg,
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(
        post.data.title + post.data.author + SITE.title + "by"
      ),
    }
  );
};
