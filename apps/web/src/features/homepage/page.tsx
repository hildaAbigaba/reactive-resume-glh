import type { Template } from "@reactive-resume/schema/templates";
import type { SculptureTemplate } from "./resume-sculpture";
import { Trans } from "@lingui/react/macro";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@reactive-resume/utils/style";
import { wrap } from "./classes";
import { PageBackground } from "./page-background";
import { ResumeSculpture } from "./resume-sculpture";
import "./styles.css";

const _githubUrl = "https://github.com/reactive-resume/reactive-resume";
const buttonClass =
	"inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[4px] border border-[#f1f0eb] bg-[#f1f0eb] px-[19px] py-[14px] text-[14px] font-[550] text-[#151516] [transition:background-color_150ms_ease,transform_150ms_cubic-bezier(0.23,1,0.32,1)] hover:bg-[#d9d8d2] active:transform-[scale(0.97)] max-[540px]:min-h-[49px] max-[540px]:gap-[18px] max-[540px]:px-[15px] max-[540px]:py-3 max-[540px]:text-[13px]";
const brandClass = "inline-flex shrink-0 items-center gap-[11px] font-[550] tracking-[-0.04em] max-[540px]:gap-2";
const _paperLinkClass =
	"group/link flex min-h-[65px] items-center gap-[14px] border-t border-[#2d2e3038] text-[14px] [transition:background-color_160ms_ease] focus-visible:outline-[#37383a]";
const _paperArrowClass =
	"ml-auto [transition:transform_180ms_cubic-bezier(0.23,1,0.32,1)] group-hover/link:transform-[translate(2px,-2px)]";
const _contributeLinkClass =
	"inline-flex min-h-11 items-center gap-2 text-(--home-ink) underline-offset-4 hover:underline";
export function Homepage() {
	const [name, setName] = useState("Liz Busobozi");
	const [accent, setAccent] = useState("#735c9a");
	const [typeface, setTypeface] = useState<"sans" | "serif">("sans");
	const [_template, setTemplate] = useState<Template>("ditgar");
	const [heroTemplate, setHeroTemplate] = useState<SculptureTemplate>("ditgar");
	return (
		<div className="homepage scheme-dark relative isolate overflow-clip bg-(--home-bg) font-[IBM_Plex_Sans_Variable,IBM_Plex_Sans,sans-serif] text-(--home-ink) text-[16px] leading-[1.5] [--home-accent:#c4a68c] [--home-bg:#101011] [--home-ink:#f1f0eb] [--home-line:#323235] [--home-muted:#a5a5ab] [--home-panel:#19191b] selection:bg-[#d5c2df] selection:text-[#101011]">
			<PageBackground />
			<a
				href="#main-content"
				className="fixed top-3 left-5 z-100 -translate-y-[150%] rounded-[4px] bg-(--home-ink) px-[18px] py-3 text-(--home-bg) focus:translate-y-0"
			>
				<Trans>Skip to main content</Trans>
			</a>
			<header
				className={cn(
					wrap,
					"relative z-1 flex h-[104px] items-center justify-between gap-3 max-[540px]:h-20 max-[900px]:h-[88px]",
				)}
			>
				<Link
					to="/"
					className={`${brandClass} text-[17px] max-[360px]:gap-[6px] max-[360px]:text-[13px] max-[540px]:text-[15px]`}
					aria-label="GLH CV Portal"
				>
					<img src="/icon/glh-dark.png" alt="" width="34" height="34" className="block max-[540px]:size-[29px]" />
				</Link>
			</header>
			<main id="main-content" className="relative z-1">
				<section
					className={cn(
						wrap,
						"grid min-h-[710px] grid-cols-[1fr_1.12fr] items-center gap-[6px] pt-[34px] pb-[62px] max-[1100px]:min-h-[655px] max-[1100px]:grid-cols-[1fr_1.1fr] max-[900px]:grid-cols-1 max-[540px]:gap-[21px] max-[900px]:gap-[30px] max-[540px]:pt-[30px] max-[900px]:pt-10 max-[540px]:pb-8 min-[1500px]:min-h-[750px]",
					)}
					aria-labelledby="hero-title"
				>
					<div className="relative z-1 pb-[22px] max-[900px]:max-w-[590px]">
						<h1
							id="hero-title"
							className="font-[Manrope_Variable,sans-serif] font-semibold text-[clamp(52px,5.85vw,82px)] leading-[1.035] tracking-[-0.064em] max-[1100px]:text-[64px] max-[540px]:text-[clamp(48px,11.65vw,63px)] max-[900px]:text-[clamp(55px,10vw,77px)]"
						>
							<Trans>
								Welcome to the <br className="max-[540px]:block max-[900px]:hidden" />
								GLH
								<br />
								<span className="text-[#b7b6b8]">CV PORTAL.</span>
							</Trans>
						</h1>
						<p className="mt-7 max-w-[356px] text-(--home-muted) text-[17px] leading-[1.65] max-[540px]:mt-6 max-[540px]:max-w-[330px] max-[900px]:max-w-[410px] max-[540px]:text-[15px]">
							<Trans>Create and Manage professional CVs using our company Standards.</Trans>
						</p>
						<div className="mt-[30px] flex flex-wrap items-center gap-9 max-[540px]:mt-[25px] max-[1100px]:gap-7 max-[540px]:gap-7 max-[900px]:gap-9">
							<Link to="/dashboard" className={buttonClass}>
								<Trans>Get Started</Trans>
								<ArrowRightIcon size={20} aria-hidden="true" />
							</Link>
						</div>
						<p className="mt-[17px] text-[#a5a5ab] text-[12px] leading-[1.9] max-[540px]:mt-[15px] max-[540px]:text-[11px]">
							<Trans>
								<strong className="font-medium text-[#d4d3cf]">GLH Professional CVs.</strong>
								<br />
							</Trans>
						</p>
					</div>
					<ResumeSculpture
						template={heroTemplate}
						onTemplateChange={(next) => {
							setHeroTemplate(next);
							setTemplate(next);
						}}
						name={name}
						onNameChange={setName}
						accent={accent}
						onAccentChange={setAccent}
						typeface={typeface}
						onTypefaceChange={setTypeface}
					/>
				</section>
			</main>
		</div>
	);
}
