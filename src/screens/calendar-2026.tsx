//
import {ContactSection} from "../components/ContactSection";
import {useEffect, useState} from "react";
import ContactSectionMobile from "../components/ContactSectionMobile";
import CalendarBig from "../assets/optimized/lg/calendar_big.webp";
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Address {
    name: string;
    street: string;
    city: string;
    zipCode: string;
    googleMapsUrl: string;
    lat?: number;
    lng?: number;
}

const addresses: Address[] = [
    {
        name: "Giesecke Licht+Design",
        street: "Zum See 4-6",
        city: "Schwentinental-Raisdorf",
        zipCode: "24223",
        googleMapsUrl: "https://maps.google.com/?q=Giesecke+Licht+Design,Zum+See+1-3,24223+Schwentinental-Raisdorf",
        lat: 54.283,
        lng: 10.225,
    },
    {
        name: "auroraprint",
        street: "Preetzer Chaussee 144",
        city: "Kiel-Elmschenhagen",
        zipCode: "24146",
        googleMapsUrl: "https://maps.google.com/?q=auroraprint,Preetzer+Chaussee+144,24146+Kiel-Elmschenhagen",
        lat: 54.290,
        lng: 10.180,
    },
    {
        name: "Hafensinne",
        street: "Kleiner Kuhberg 36",
        city: "Kiel (Exerzierplatz)",
        zipCode: "24103",
        googleMapsUrl: "https://maps.google.com/?q=Hafensinne,Kleiner+Kuhberg+36,24103+Kiel",
        lat: 54.320,
        lng: 10.130,
    },
    {
        name: "Mercedes-Autohaus Klenk",
        street: "Suchskrug 6",
        city: "Kiel",
        zipCode: "24107",
        googleMapsUrl: "https://maps.google.com/?q=Mercedes-Autohaus+Klenk,Suchskrug+6,24107+Kiel",
        lat: 54.340,
        lng: 10.080,
    },
    {
        name: "Buchhandlung am Markt",
        street: "Lange Brückstr. 1a",
        city: "Preetz",
        zipCode: "24211",
        googleMapsUrl: "https://maps.google.com/?q=Buchhandlung+am+Markt,Lange+Brückstr.+1a,24211+Preetz",
        lat: 54.235,
        lng: 10.285,
    },
    {
        name: "Sparkasse Lütjenburg",
        street: "Markt 15",
        city: "Lütjenburg",
        zipCode: "24321",
        googleMapsUrl: "https://maps.google.com/?q=Sparkasse+Lütjenburg,Markt+15,24321+Lütjenburg",
        lat: 54.295,
        lng: 10.585,
    },
    {
        name: "KitiPrints",
        street: "Online" ,
        city: "Etsy-Shop",
        zipCode: "",
        googleMapsUrl: "https://www.etsy.com/de-en/shop/KitiPrints?ref=shop_profile&listing_id=4397423814&section_id=56484241",

    },
];


export function UpdatesCalendar2026(): JSX.Element {
    const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth <= 768 : false));

    useEffect(() => {
        if (typeof window === "undefined") return;
        const onResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    if (isMobile) {
        return (
            <div className="bg-[#d4cdc4] flex flex-col items-center w-screen min-h-screen">
                {/* header is rendered globally */}

                <div className="bg-[#d4cdc4] w-full max-w-[390px] flex flex-col items-center pt-32 pb-10 px-4">

                    {/* Title */}
                    <div className="w-full mb-6">
                        <h1 className="[font-family:'Antonio',Helvetica] font-thin text-black text-2xl text-center tracking-[0] leading-8">
                            Der Kunstkalender 2026 ist da!
                        </h1>
                    </div>

                    {/* Images */}
                    <div className="flex flex-col gap-6 mb-6">
                        <img className="w-[199px] h-[257px] object-cover" alt="Kunstkalender April"
                             src={CalendarBig}/>
                    </div>

                    {/* Description Text */}
                    <div
                        className="w-full [font-family:'Antonio',Helvetica] font-thin text-black text-base text-center tracking-[0] leading-6 mb-6">
                        In zwei Varianten gibt es ihn: im A3-Format als Wandkalender (29 Euro) oder als kleinen
                            Tischkalender in einer Box (15 Euro) <br/> <br/>
                            Für jeden verkauften Kalender geht eine Spende an das Frauenhaus Kreis Plön.<br/>
                        <br/>
                    </div>

                    {/* Address List */}
                    <div className="w-full mb-6">
                        <h3 className="[font-family:'Antonio',Helvetica] font-thin text-black text-xl text-center mb-4">Verkaufsstellen</h3>
                        <div className="flex flex-col gap-3">
                            {addresses.map((addr, idx) => (
                                <a
                                    key={idx}
                                    href={addr.googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 active:shadow-md active:border-gray-300 transition-all block"
                                >
                                    <p className="font-medium text-sm text-black">{addr.name}</p>
                                    {addr.street && <p className="text-sm text-gray-700 mt-1">{addr.street}</p>}
                                    {addr.zipCode && <p className="text-sm text-gray-700">{addr.zipCode} {addr.city}</p>}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Map */}
                    <div className="w-full h-[300px] mb-6 rounded-lg overflow-hidden border border-gray-200">
                        <Map
                            initialViewState={{
                                longitude: 10.2,
                                latitude: 54.3,
                                zoom: 9
                            }}
                            style={{width: '100%', height: '100%'}}
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                        >
                            {addresses.map((addr, idx) => (
                                addr.lat && addr.lng ? (
                                    <Marker
                                        key={idx}
                                        longitude={addr.lng}
                                        latitude={addr.lat}
                                        color="red"
                                        onClick={(e) => {
                                            e.originalEvent.stopPropagation();
                                            window.open(addr.googleMapsUrl, '_blank');
                                        }}
                                        style={{cursor: 'pointer'}}
                                    />
                                ) : null
                            ))}
                        </Map>
                    </div>

                    <div className="w-full flex flex-col items-start">
                        <ContactSectionMobile className="mt-6 w-full"/>
                    </div>
                </div>
            </div>
        );
    }


    // Desktop markup preserved below
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* header is rendered globally */}
            {/* Main content */}
            <main className="flex-1 w-full">
                <div className="w-full max-w-[1440px] mx-auto" style={{marginTop: 0, paddingTop: 0}}>
                    <div className="w-full max-w-4xl mx-auto px-6 pt-52 pb-6">
                        <h1 className="text-4xl font-thin font-['Antonio'] text-black mb-6 text-center">Der
                            Kunstkalender 2026 ist da!</h1>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 mb-6">
                        <img className="w-90 h-[600px] object-contain" src={CalendarBig} alt="Kunstkalender 2026 April"
                             loading="lazy"/>
                    </div>

                    <div className="w-full max-w-4xl mx-auto px-6 pb-12">
                        <p className="text-lg font-thin text-black mb-6 text-center">
                            In zwei Varianten gibt es ihn: im A3-Format als Wandkalender (29 Euro) oder als kleinen
                            Tischkalender in einer Box (15 Euro) <br/> <br/>
                            Für jeden verkauften Kalender geht eine Spende an das Frauenhaus Kreis Plön.
                        </p>
                        <br/>

                        {/* Address List */}
                        <div className="mb-12">
                            <h3 className="text-xl font-thin font-['Antonio'] text-black mb-6 text-center"> Verkaufsstellen</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {addresses.map((addr, idx) => (
                                    <a
                                        key={idx}
                                        href={addr.googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer block w-full md:w-[calc(50%-0.5rem)]"
                                    >
                                        <p className="font-medium text-sm text-black">{addr.name}</p>
                                        <p className="text-sm text-gray-700 mt-2">{addr.street}</p>
                                        <p className="text-sm text-gray-700">{addr.zipCode} {addr.city}</p>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Map */}
                        <div className="w-full h-[400px] mb-12 rounded-lg overflow-hidden border border-gray-200">
                            <Map
                                initialViewState={{
                                    longitude: 10.2,
                                    latitude: 54.3,
                                    zoom: 9
                                }}

                                style={{width: '100%', height: '100%'}}
                                mapStyle="mapbox://styles/mapbox/streets-v11"
                                mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                            >
                                {addresses.map((addr, idx) => (
                                    addr.lat && addr.lng ? (
                                        <Marker
                                            key={idx}
                                            longitude={addr.lng}
                                            latitude={addr.lat}
                                            color="red"
                                            onClick={(e) => {
                                                e.originalEvent.stopPropagation();
                                                window.open(addr.googleMapsUrl, '_blank');
                                            }}
                                            style={{cursor: 'pointer'}}
                                        />
                                    ) : null
                                ))}
                            </Map>
                        </div>
                    </div>

                    <ContactSection className="relative w-full max-w-2xl mx-auto px-6"/>
                </div>
            </main>
        </div>
    );
}