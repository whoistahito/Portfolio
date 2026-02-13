import { ContactSection } from "../components/ContactSection";
// Use optimized small WebP artworks for page rendering (sm folder)
const Ausstellung1Img = new URL("../assets/optimized/sm/Ausstellung-Aumann.webp", import.meta.url).href;
const Ausstellung2Img = new URL("../assets/optimized/sm/Ausstellung-Giesecke.webp", import.meta.url).href;
const Ausstellung3Img = new URL("../assets/optimized/sm/Ausstellung-Offenes Atelier.webp", import.meta.url).href;
const Ausstellung4Img = new URL("../assets/optimized/lg/Ausstellung-FFH.webp", import.meta.url).href;
const Ausstellung5Img = new URL("../assets/optimized/sm/Ausstellung-Rathaus-Schwentinental.webp", import.meta.url).href;

// Navigation provided by SiteHeader
// header is provided globally
import { useEffect, useState, useRef } from "react";
import ContactSectionMobile from "../components/ContactSectionMobile";

export function Exhebitions(): JSX.Element {
	const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth <= 768 : false));

	useEffect(() => {
		if (typeof window === "undefined") return;
		const onResize = () => setIsMobile(window.innerWidth <= 768);
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	if (isMobile) {
		const stackingRef = useRef<HTMLDivElement | null>(null);
		const [stackHeight, setStackHeight] = useState<number>(1100);

		useEffect(() => {
			const el = stackingRef.current;
			if (!el) return;

			const update = () => {
				const parentRect = el.getBoundingClientRect();
				const descendants = Array.from(el.querySelectorAll('*')) as HTMLElement[];
				let max = 0;
				descendants.forEach((ch) => {
					const rect = ch.getBoundingClientRect();
					const bottom = rect.bottom - parentRect.top;
					if (bottom > max) max = bottom;
				});
				const value = Math.max(600, Math.ceil(max + 24));
				setStackHeight(value);
			};

			const ro = new (window as any).ResizeObserver(update);
			ro.observe(el);
			const imgs = el.querySelectorAll('img');
			imgs.forEach((i) => i.addEventListener('load', update));
			window.addEventListener('resize', update);
			setTimeout(update, 50);

			return () => {
				ro.disconnect();
				imgs.forEach((i) => i.removeEventListener('load', update));
				window.removeEventListener('resize', update);
			};
		}, []);

		const exhibitions = [
			{
				id: 5,
				title: "Gemeinschaftsausstellung",
				date: "Februar bis Juni 2026",
				location: "Rathaus \n Schwentinental",
				image: Ausstellung5Img,
				imageClasses: "w-[148px] h-auto top-[78px] left-[240px]",
				textClasses: "top-[132px] left-[50px] text-right",
			},
			{
				id: 4,
				title: "Ausstellung Kunstmarkt Laboe",
				date: "21. bis 23. November 2025",
				location: "Freya-Frahm-Haus \n Laboe",
				image: Ausstellung4Img,
				imageClasses: "w-[148px] h-auto top-[78px] left-[240px]",
				textClasses: "top-[132px] left-[50px] text-right",
			},
			{
				id: 3,
				title: "Offenes Atelier",
				date: "6. und 7. Dezember 2024",
				location: "Giesecke Licht + Design \n Schwentinental",
				image: Ausstellung3Img,
				imageClasses: "w-[218px] h-[145px] top-[255px] left-1",
				textClasses: "top-[330px] left-[249px]",
			},
			{
				id: 2,
				title: 'Ausstellung "Licht und Kunst -\nKunst und Licht"',
				date: "seit September 2024",
				location: "Giesecke Licht + Design\nSchwentinental",
				image: Ausstellung2Img,
				imageClasses: "w-[203px] h-[135px] top-[434px] left-[187px]",
				textClasses: "top-[461px] left-[5px] text-right",
			},
			{
				id: 1,
				title: "Ausstellung",
				date: "August 2024 bis Februar 2026",
				location: "Aumann Authentics \n Kiel",
				image: Ausstellung1Img,
				imageClasses: "w-[238px] h-[168px] top-[604px] left-[11px]",
				textClasses: "top-[600px] left-[260px]",
			},
		];

		return (
			<div className="bg-[#d4cdc4] grid justify-items-center [align-items:start] w-screen min-h-screen pt-5">
				{/* header is rendered globally */}

				<div className="bg-[#d4cdc4] w-[390px] relative">
					<div ref={stackingRef} className="relative w-full pt-6" style={{ minHeight: stackHeight }}>
						{exhibitions.map((exhibition) => (
							<div key={exhibition.id}>
								<div className={`absolute ${exhibition.textClasses} [font-family:'Antonio',Helvetica] font-normal text-black text-sm tracking-[-0.28px] leading-[16.8px]`}>
									<span className="tracking-[-0.04px]">
										{exhibition.title.split('\n').map((line, index) => (
											<span key={index}>
												{line}
												{index < exhibition.title.split('\n').length - 1 && <br />}
											</span>
										))}
										<br />
									</span>
									<span className="font-thin tracking-[-0.04px]">
										{exhibition.date}<br />
										{exhibition.location.split('\n').map((line, index) => (
											<span key={index}>
												{line}
												{index < exhibition.location.split('\n').length - 1 && <br />}
											</span>
										))}
									</span>
								</div>
								<img className={`absolute ${exhibition.imageClasses} object-cover`} alt="Exhibition image" src={exhibition.image} />
							</div>
						))}
					</div>

					<div className="w-full flex flex-col items-start">
						<ContactSectionMobile className="mt-6 w-full" />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col">
			{/* TopLanguageBar provided globally */}
			{/* header is rendered globally */}
			{/* Main content */}
			<main className="flex-1 w-full">
				{/* IMPORTANT: Give the relative container a fixed height on desktop so absolute children are visible */}
				<div className="w-full max-w-[1440px] lg:h-[3000px] relative bg-background overflow-hidden mx-auto" style={{ marginTop: 0, paddingTop: 0 }}>
					<div className="w-full lg:w-80 h-24 lg:left-[968px] lg:top-[2210px] lg:absolute justify-start mx-auto lg:mx-0">
						<span className="text-black text-base font-normal font-['Antonio'] leading-tight">Ausstellung<br /></span>
						<span className="text-black text-base font-thin font-['Antonio'] leading-tight">August 2024 bis Februar 2026<br />Aumann Authentics, Kiel<br /></span>
					</div>
					<div className="w-full lg:w-80 h-24 lg:left-[368px] lg:top-[1717px] lg:absolute text-right justify-start mx-auto lg:mx-0">
						<span className="text-black text-base font-normal font-['Antonio'] leading-tight">Ausstellung “Licht und Kunst -<br />Kunst und Licht”<br /></span>
						<span className="text-black text-base font-thin font-['Antonio'] leading-tight">seit September 2024<br />Giesecke Licht + Design<br />Schwentinental<br /></span>
					</div>
					<div className="w-full lg:w-80 h-24 lg:left-[651px] lg:top-[1320px] lg:absolute justify-start mx-auto lg:mx-0">
						<span className="text-black text-base font-normal font-['Antonio'] leading-tight">Offenes Atelier<br /></span>
						<span className="text-black text-base font-thin font-['Antonio'] leading-tight">6. und 7. Dezember 2024<br />Giesecke Licht + Design, Schwentinental<br /></span>
					</div>
					<div className="w-full lg:w-80 h-24 lg:left-[568px] lg:top-[809px] lg:absolute text-right justify-start mx-auto lg:mx-0">
						<span className="text-black text-base font-normal font-['Antonio'] leading-tight">Ausstellung Kunstmarkt Laboe<br /></span>
						<span className="text-black text-base font-thin font-['Antonio'] leading-tight">21. bis 23. November 2025<br />Freya-Frahm-Haus, Laboe<br /></span>
					</div>
					<div className="w-full lg:w-80 h-24 lg:left-[480px] lg:top-[338px] lg:absolute justify-start mx-auto lg:mx-0">
						<span className="text-black text-base font-normal font-['Antonio'] leading-tight">Gemeinschaftsausstellung<br /></span>
						<span className="text-black text-base font-thin font-['Antonio'] leading-tight">Februar bis Juni 2026<br />Rathaus, Schwentinental<br /></span>
					</div>

					<ContactSection
						className="lg:absolute relative lg:w-[560px] w-full lg:top-[2600px] lg:left-[440px] mx-auto lg:mx-0"
					/>
					<img className="w-full lg:w-[745px] h-auto lg:h-[527px] lg:left-[123px] lg:top-[1950px] lg:absolute object-cover mx-auto lg:mx-0" src={Ausstellung1Img} loading="lazy" />
					<img className="w-full lg:w-[650px] h-auto lg:h-96 lg:left-[736px] lg:top-[1500px] lg:absolute object-cover mx-auto lg:mx-0" src={Ausstellung2Img} loading="lazy" />
					<img className="w-full lg:w-[579px] h-auto lg:h-96 lg:left-[18px] lg:top-[1150px] lg:absolute object-cover mx-auto lg:mx-0" src={Ausstellung3Img} loading="lazy" />
					<img className="w-full lg:w-[900px] h-auto lg:h-[570px] lg:left-[736px] lg:top-[690px] lg:absolute object-contain mx-auto lg:mx-0" src={Ausstellung4Img} loading="lazy" />
					<img className="w-full lg:w-[579px] h-auto lg:h-[770px] lg:left-[18px] lg:top-[200px] lg:absolute object-contain mx-auto lg:mx-0" src={Ausstellung5Img} loading="lazy" />


					{/* Footer is now global */}
				</div>
			</main>
		</div>
	);
}