//

import { ContactSection } from "../components/ContactSection";
import { useEffect, useState} from "react";
import ContactSectionMobile from "../components/ContactSectionMobile";
import News3 from "../assets/optimized/sm/News3.webp";
import News3Mobile from "../assets/optimized/sm/News3-mobile.webp";
import Calendar2026 from "../assets/optimized/lg/calendar_big.webp";
import NachtderKunst from "../assets/optimized/sm/Updates-Nacht-der-Kultur.webp";

export function Updates(): JSX.Element {
    const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth <= 768 : false));

    useEffect(() => {
        if (typeof window === "undefined") return;
        const onResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Desktop layout
    if (!isMobile) {
        return (
            <main className="relative w-full min-h-screen bg-[#D3CCC3] font-[Antonio] text-black overflow-x-hidden">
                {/* Language bar */}
                <div className="absolute top-2 right-16 flex gap-2 text-[16px] font-light tracking-tight">
                    <span className="cursor-pointer">de</span>
                    <span>|</span>
                    <span className="cursor-pointer">en</span>
                </div>

                {/* Header bar (assumed global, not duplicated) */}

                {/* Main content */}
                <div className="relative w-full max-w-[1440px] mx-auto" style={{ minHeight: 2474 }}>
                    {/* News 1 */}
                    <div className="absolute left-[74px] top-[225px] w-[600px]">
                        <h2 className="font-normal text-[40px] leading-[150%] mb-8">AUSSTELLUNG<br/>»VOM WERDEN UND WACHSEN«</h2>
                        <p className="font-thin text-[28px] leading-[160%] text-justify mb-8" style={{height: 300}}>Die Ausstellung zeigt meinen künstlerischen Entwicklungs-prozess als lebendige Momentaufnahme eines fortlaufenden Wandels.<br/>Am 4. März 2026 findet ab 18 Uhr in der Förde Sparkasse in Lütjenburg meine Vernissage statt. Einlass ist ab 17:30 Uhr am Seiteneingang beim Bürgerbrunnen.</p>
                        <div className="absolute left-[0px] top-[490px] w-[600px]">
                        <p className="font-normal text-[24px] leading-[150%] text-justify" style={{height: 161}}>Markt 15<br/>24321 Lütjenburg</p>
                        </div>
                        <div className="absolute left-[260px] top-[503px] w-[350px] h-[62px] flex items-center justify-center border-2 border-[#854686] rounded-[36px]">
                            <span className="font-semibold text-[32px] tracking-[0.1em]">04.03. – 14.04.2026</span>
                        </div>
                    </div>
                    {/* Image News 1 */}
                    <img
                        src={News3}
                        alt="News 3"
                        className="absolute left-[711px] top-[240px] w-[633px] h-[550px] bg-[#7476BC] rounded-[8px] object-cover"
                    />

                    {/* Line 4 */}
                    <div className="absolute left-[36px] top-[890px] w-[1367px] border-t border-[#636263]" />

                    {/* Image News 2 */}
                    <img src={NachtderKunst} alt="Nacht der Kunst" className="absolute left-[72px] top-[970px] w-[837px] h-[485px] rounded-[8px]" />

                    {/* News 2 */}
                    <div className="absolute left-[72px] top-[1470px] right-[531px]">
                        <h2 className="font-normal text-[40px] leading-[150%] mb-2">NACHT DER KUNST- UND KULTURORTE <br/></h2>
                    </div>
                    <div className="absolute left-[72px] top-[1555px] right-[531px]">
                        <p className="font-thin text-[24px] leading-[150%] text-justify" style={{height: 161}}>Am Samstag, den 28. Februar 2026, öffne ich mein Zuhause für die Öffentlichkeit von 18 bis 22 Uhr im Rahmen der Schwentinentaler Nacht der Kunst- und Kulturorte.<br/></p>
                    </div>
                    <div className="absolute left-[72px] top-[1690px] w-[600px]">
                        <p className="font-normal text-[24px] leading-[150%] text-justify" style={{height: 161}}>Elsa-Brandström-Straße 7<br/>24223 Schwentinental</p>
                        </div>
                    {/* Date 2 */}
                    <div className="absolute left-[665px] top-[1698px] w-[244px] h-[62px] flex items-center justify-center border-2 border-[#854686] rounded-[36px]">
                        <span className="font-semibold text-[32px] tracking-[0.1em]">28.02.2026</span>
                    </div>

                    {/* Image News 3 */}
                    <img
                        src={Calendar2026}
                        alt="News 1"
                        className="absolute left-[980px] top-[970px] w-[396px] h-[370px] bg-[#E99348] rounded-[8px] object-cover"> 
                    </img>

                    {/* Title News 3 */}
                    <div className="absolute left-[980px] top-[1355px] w-[396px]">
                        <h3 className="font-normal text-[39px] leading-[150%] mb-2">KUNSTKALENDER 2026 ERHÄLTLICH</h3>
                    </div>
                    {/* Text News 3 */}
                    <div className="absolute left-[980px] top-[1500px] w-[396px]">
                        <p className="font-thin text-[24px] leading-[150%] text-justify" style={{height: 314}}>Mein Kunstkalender 2026 ist ab sofort an verschiedenen Verkaufsstellen in Schleswig-Holstein sowie online erhältlich.</p>
                    </div>
                     <a
                        href="/updates/calendar-2026"
                        className="absolute text-[#854686] underline cursor-pointer"
                        style={{
                            top: 1640,
                            left: 980,
                            fontSize: 20,
                        }}
                        >
                        Mehr Infos
                     </a>
   

                    {/* Contact block (global) */}
                    <ContactSection className="absolute left-1/2 top-[2000px] w-full max-w-[560px] h-[311px] -translate-x-1/2 flex flex-col items-center justify-center" />
                </div>
            </main>
        );
    }

    // Mobile layout
    return (
        <main className="w-full min-h-screen bg-[#D3CCC3] font-[Antonio] text-black overflow-x-hidden">
            {/* Language bar */}
            <div className="fixed top-2 right-4 flex gap-2 text-[12px] font-light tracking-tight z-10 bg-[#D3CCC3] px-2 py-1 rounded">
                <span className="cursor-pointer">de</span>
                <span>|</span>
                <span className="cursor-pointer">en</span>
            </div>

            {/* Main content */}
               <div className="translate-y-[90px] pb-8 px-4 gap-8">
                    <h2 className="font-normal text-[18px] leading-[150%] mb-4">AUSSTELLUNG »VOM WERDEN UND WACHSEN«</h2>
                </div>          
                  <div className="w-full max-w-[430px] mx-auto pt-12 pb-8 px-4 flex flex-col gap-8">
                {/* News 1 */}
                <div className="flex gap-4">
                    <div className="flex-1">                        
                        <p className="translate-y-[10px] font-thin text-[14px] leading-[150%] text-justify mb-4">Die Ausstellung zeigt meinen künstlerischen Entwicklungsprozess als lebendige Momentaufnahme eines fortlaufenden Wandels.<br/>Am 4. März 2026 findet ab 18 Uhr in der Förde Sparkasse in Lütjenburg meine Vernissage statt. Einlass ist ab 17:30 Uhr am Seiteneingang beim Bürgerbrunnen.</p>
                        <p className="translate-y-[35px] font-normal text-[14px] leading-[150%] text-justify" >Markt 15<br/>24321 Lütjenburg</p>
                        <div className="translate-y-[-8px] translate-x-[215px] w-[180px] h-[32px] flex items-center justify-center border-2 border-[#854686] rounded-[18px] mt-2">
                            <span className="font-semibold text-[16px] tracking-[0.1em]">04.03. – 14.04.2026</span>
                        </div>
                    </div>
                {/* NEWS 1 Image */} 
                    <img 
                        src={News3}
                        className="translate-y-[15px] w-[180px] h-[160px] rounded-[4px] shrink-0" />
                </div>

                {/* Line 4 */}
                <div className="translate-y-[0px] w-full border-t border-[#636263]" style={{}} />

                {/* NEWS 2 Image */} 
                <div className="flex gap-4">
                    <div className="translate-y-[10px] w-[220px] h-[120px] bg-[#C6A4CC] rounded-[4px] flex items-center justify-center">
                        {/* Placeholder for image or content */}
                    </div>

                {/* NEWS 3 Image */} 
                    <div className="translate-y-[10px] w-[140px] h-[130px] bg-[#E99348] rounded-[4px] flex items-center justify-center">
                    </div>
                </div>

                {/* NEWS 3 */}
                <div>
                    <h3 className="translate-y-[0px] translate-x-[240px] font-normal text-[18px] leading-[150%] mb-1">KUNSTKALENDER VERFÜGBAR</h3>
                    <p className="translate-y-[40px] translate-x-[240px] font-thin text-[12px] leading-[150%] text-justify mb-2">lalal</p>
                    <span className="translate-y-[40px] translate-x-[240px] text-[#854686] underline cursor-pointer text-xs">Mehr Infos</span>
                </div>

                {/* News 2 */}
                <div>
                    <h2 className="translate-y-[-120px] font-normal text-[18px] leading-[150%] mb-1">AUSSTELLUNG XX</h2>
                    <p className="font-thin text-[12px] leading-[150%] text-justify mb-2">lalal</p>
                    <div className="w-[90px] h-[32px] flex items-center justify-center border-2 border-[#854686] rounded-[18px] mt-2">
                        <span className="font-semibold text-[16px] tracking-[0.1em]">04.03.2026</span>
                    </div>
                </div>

                {/* Contact block (global) */}
                <div className="flex justify-center mt-4">
                    <ContactSectionMobile className="w-full max-w-[250px] h-[100px] flex flex-col items-center justify-center" />
                </div>
            </div>
        </main>
    );
}