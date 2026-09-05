import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DeERsmyi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Grain({ id }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "grain",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
			id,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feTurbulence", {
				type: "fractalNoise",
				baseFrequency: "0.9",
				numOctaves: "2",
				stitchTiles: "stitch"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feColorMatrix", {
				type: "saturate",
				values: "0"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "100%",
			height: "100%",
			filter: `url(#${id})`
		})]
	});
}
function Facade() {
	const cells = Array.from({ length: 64 }, (_, i) => {
		const col = i % 8;
		const row = Math.floor(i / 8);
		return {
			i,
			accent: col === 5 && row === 2,
			voidCell: (col + row) % 3 === 0,
			deep: (col * 3 + row * 5) % 7 === 0
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "plate h-full w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-full w-full grid-cols-8 grid-rows-8 gap-px bg-border p-px",
				children: cells.map((cell) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cell.accent ? "bg-accent" : cell.voidCell ? "bg-bg" : cell.deep ? "bg-surface" : "bg-muted/25" }, cell.i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grain, { id: "grain-facade" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "plate-caption",
				children: "01 Facade"
			})
		]
	});
}
function VoidPlate() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "plate h-full w-full bg-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "plate-window",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full bg-bg" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grain, { id: "grain-void" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "plate-caption",
				children: "02 Void"
			})
		]
	});
}
function Signal() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "plate h-full w-full bg-accent",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 grid place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1/3 w-1/3 bg-ink" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grain, { id: "grain-signal" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "plate-caption",
				children: "03 Signal"
			})
		]
	});
}
function Stack() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "plate h-full w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full w-full flex-col gap-px bg-border",
				children: [
					.08,
					.16,
					.11,
					.22,
					.09,
					.18,
					.13,
					.2
				].map((mix, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1",
					style: { background: `color-mix(in oklab, var(--color-fg) ${Math.round(mix * 100)}%, var(--color-bg))` }
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grain, { id: "grain-stack" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "plate-caption",
				children: "04 Stack"
			})
		]
	});
}
function Plates() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facade, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoidPlate, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {})
	] });
}
var STRIKE_MAX = 8;
var STRIKE_WORDS = [
	"Tap",
	"Corner",
	"Edge",
	"Cut",
	"Hold",
	"Lock",
	"Frame",
	"Set",
	"Locked"
];
var INDEX = [
	"01",
	"02",
	"03",
	"04",
	"05"
];
var LABELS = [
	"Manifesto",
	"System",
	"Blocks",
	"Strike",
	"Close"
];
function pad(n) {
	return String(n).padStart(2, "0");
}
function FrameDeck() {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [strikes, setStrikes] = (0, import_react.useState)(0);
	const pointer = (0, import_react.useRef)(null);
	const swiped = (0, import_react.useRef)(false);
	const go = (0, import_react.useCallback)((next) => {
		setIndex((current) => {
			const clamped = Math.max(0, Math.min(4, next));
			return clamped === current ? current : clamped;
		});
	}, []);
	const prev = (0, import_react.useCallback)(() => go(index - 1), [go, index]);
	const next = (0, import_react.useCallback)(() => go(index + 1), [go, index]);
	const strike = (0, import_react.useCallback)(() => {
		setStrikes((n) => n >= STRIKE_MAX ? 0 : n + 1);
		if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") navigator.vibrate(12);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === "ArrowRight") {
				event.preventDefault();
				go(index + 1);
			} else if (event.key === "ArrowLeft") {
				event.preventDefault();
				go(index - 1);
			} else if (event.key === "Home") {
				event.preventDefault();
				go(0);
			} else if (event.key === "End") {
				event.preventDefault();
				go(4);
			} else if (event.key === " " && index === 3) {
				event.preventDefault();
				strike();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		go,
		index,
		strike
	]);
	const onPointerDown = (event) => {
		if (event.pointerType === "mouse" && event.button !== 0) return;
		pointer.current = {
			x: event.clientX,
			y: event.clientY,
			id: event.pointerId
		};
		swiped.current = false;
	};
	const onPointerMove = (event) => {
		const start = pointer.current;
		if (!start || event.pointerId !== start.id) return;
		const dx = event.clientX - start.x;
		const dy = event.clientY - start.y;
		if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) event.preventDefault();
	};
	const onPointerUp = (event) => {
		const start = pointer.current;
		pointer.current = null;
		if (!start || event.pointerId !== start.id) return;
		const dx = event.clientX - start.x;
		const dy = event.clientY - start.y;
		if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
		swiped.current = true;
		if (dx < 0) go(index + 1);
		else go(index - 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "deck-shell",
		style: { "--deck-i": index },
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onPointerCancel: () => {
			pointer.current = null;
		},
		"aria-roledescription": "carousel",
		"aria-label": "FRAME",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "chrome chrome-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-lg font-extrabold tracking-tight text-fg",
					children: ["FRAME", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "meta tabular-nums text-fg",
					"aria-live": "polite",
					children: INDEX[index]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "deck-track",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "deck-slide",
						"aria-hidden": index !== 0,
						"aria-label": "01 Manifesto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "deck-slide",
						"aria-hidden": index !== 1,
						"aria-label": "02 System",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rules, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "deck-slide",
						"aria-hidden": index !== 2,
						"aria-label": "03 Blocks",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blocks, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "deck-slide",
						"aria-hidden": index !== 3,
						"aria-label": "04 Strike",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strike, {
							strikes,
							onStrike: () => {
								if (swiped.current) return;
								strike();
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "deck-slide",
						"aria-hidden": index !== 4,
						"aria-label": "05 Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, { onAgain: () => go(0) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "chrome chrome-bottom",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "sq",
						onClick: prev,
						disabled: index === 0,
						"aria-label": "Previous frame",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "caret caret-prev" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center",
						role: "tablist",
						"aria-label": "Frames",
						children: INDEX.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "pip",
							role: "tab",
							"aria-label": `${label} ${LABELS[i]}`,
							"aria-current": i === index ? "true" : void 0,
							onClick: () => go(i)
						}, label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "sq",
						onClick: next,
						disabled: index === 4,
						"aria-label": "Next frame",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "caret caret-next" })
					})
				]
			})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "slide-pad flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "meta",
			children: "Manifesto"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col justify-end pb-2 md:justify-center md:pb-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "display text-fg",
				children: [
					"No",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"soft",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"edges",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 max-w-[22ch] text-sm leading-snug text-muted md:text-base",
				children: "The viewport is a rectangle. Radius is a habit. We cut it."
			})]
		})]
	});
}
function Rules() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "slide-pad flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "meta",
				children: "System"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 font-display text-3xl font-extrabold tracking-tight text-fg md:text-5xl",
				children: "Rules of the frame."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 w-full max-w-xl md:mt-10",
				children: [
					{
						n: "01",
						title: "Square only",
						body: "Every corner is 90°."
					},
					{
						n: "02",
						title: "One idea",
						body: "One thought per frame."
					},
					{
						n: "03",
						title: "Hard cuts",
						body: "Short eases. No bounce."
					},
					{
						n: "04",
						title: "One accent",
						body: "Vermillion, used once."
					},
					{
						n: "05",
						title: "Full bleed",
						body: "Edge to edge. No scroll."
					}
				].map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rule-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "meta pt-1 tabular-nums text-accent",
						children: rule.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-rule font-bold tracking-tight text-fg",
						children: rule.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: rule.body
					})] })]
				}, rule.n))
			})
		]
	});
}
function Blocks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "slide-pad flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-baseline justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "meta",
				children: "Blocks"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "meta hidden sm:block",
				children: "Contact sheet"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 flex-1 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid aspect-square w-full max-w-[min(100%,calc(100dvh-14rem))] grid-cols-2 grid-rows-2 gap-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plates, {})
			})
		})]
	});
}
function Strike({ strikes, onStrike }) {
	const locked = strikes >= STRIKE_MAX;
	const word = STRIKE_WORDS[strikes];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "slide-pad flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "meta",
			children: "Strike"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col items-center justify-center gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "strike",
				onClick: onStrike,
				"aria-label": locked ? "Reset the plate" : "Strike the plate",
				children: [Array.from({ length: STRIKE_MAX }, (_, i) => {
					const filled = strikes > i;
					const top = (7 - i) / STRIKE_MAX * 100;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "strike-band",
						style: {
							top: `${top}%`,
							height: `${100 / STRIKE_MAX}%`,
							display: filled ? "block" : "none"
						}
					}, i);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `relative z-10 font-display text-4xl font-extrabold tracking-tight md:text-5xl ${locked ? "text-ink" : "text-fg"}`,
					children: word
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "meta tabular-nums text-fg",
				children: [pad(strikes), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted",
					children: [
						" / ",
						pad(STRIKE_MAX),
						" strikes"
					]
				})]
			})]
		})]
	});
}
function Close({ onAgain }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "slide-pad flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "meta",
			children: "Close"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col justify-end pb-2 md:justify-center md:pb-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "display text-fg",
					children: [
						"The",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"frame",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"holds",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-accent",
							children: "."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-[28ch] text-sm leading-snug text-muted md:text-base",
					children: "Five frames. One accent. No scroll. Begin again, or leave it cut."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "cta",
						onClick: onAgain,
						children: "Begin again"
					})
				})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameDeck, {});
}
//#endregion
export { Home as component };
