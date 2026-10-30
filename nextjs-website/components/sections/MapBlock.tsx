import MoreLink from "@/components/ui/MoreLink";
import type { MapData } from "@/content/types";

// .map: mappa illustrata del centro storico (disegno copiato dalla demo; i colori della mappa restano nel disegno)
export default function MapBlock({ title, lines, link }: MapData) {
  return (
    <section aria-label="Mappa" className="relative mx-gutter bg-ivory overflow-hidden h-[560px] lg:h-auto lg:aspect-panorama">
      <svg className="absolute inset-0 size-full" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMid slice" role="img" aria-labelledby="mapT">
            <title id="mapT">Mappa illustrata del centro storico di Palermo con la posizione di Palazzo Gualbes</title>
            <defs><clipPath id="land"><path d="M-20,-20 H1180 C1190,90 1160,170 1205,230 C1240,250 1260,232 1268,260 C1250,300 1262,380 1300,450 C1330,520 1350,610 1390,720 H-20Z"/></clipPath></defs>
            <path d="M1180,-20 C1190,90 1160,170 1205,230 C1240,250 1260,232 1268,260 C1250,300 1262,380 1300,450 C1330,520 1350,610 1390,720 H1420 V-20Z" fill="#E7E9DD"/>
            <g clipPath="url(#land)">
              <path d="M-283,-20 L-237,720 M-216,-20 L-235,720 M-176,-20 L-232,720 M-162,-20 L-176,720 M-59,-20 L-131,720 M-37,-20 L6,720 M-7,-20 L59,720 M62,-20 L8,720 M46,-20 L54,720 M107,-20 L142,720 M161,-20 L177,720 M166,-20 L166,720 M250,-20 L233,720 M292,-20 L272,720 M358,-20 L311,720 M382,-20 L425,720 M408,-20 L482,720 M448,-20 L485,720 M496,-20 L442,720 M571,-20 L558,720 M581,-20 L619,720 M638,-20 L627,720 M714,-20 L676,720 M682,-20 L741,720 M798,-20 L798,720 M785,-20 L814,720 M827,-20 L791,720 M839,-20 L907,720 M896,-20 L904,720 M940,-20 L967,720 M1040,-20 L1047,720 M1040,-20 L1047,720 M1120,-20 L1144,720 M1101,-20 L1095,720 M1169,-20 L1181,720 M1174,-20 L1204,720 M1263,-20 L1312,720 M1307,-20 L1320,720 M1312,-20 L1395,720 M1422,-20 L1427,720 M1418,-20 L1378,720 M1438,-20 L1421,720 M1479,-20 L1487,720 M1505,-20 L1503,720 M1577,-20 L1531,720 M1655,-20 L1603,720 M-20,-10 L1420,-12 M-20,48 L1420,64 M-20,79 L1420,55 M-20,107 L1420,100 M-20,152 L1420,137 M-20,208 L1420,186 M-20,222 L1420,242 M-20,302 L1420,299 M-20,311 L1420,296 M-20,366 L1420,381 M-20,386 L1420,416 M-20,462 L1420,466 M-20,495 L1420,469 M-20,515 L1420,492 M-20,544 L1420,538 M-20,621 L1420,600 M-20,667 L1420,674 M-20,667 L1420,661 M-20,703 L1420,723 M-20,780 L1420,765" stroke="#EDE2C8" strokeWidth="1.2" fill="none"/>
                      {/* Via Roma */}
              <path d="M760,-20 L850,300 L960,560 L1010,720" stroke="#D9C9A3" strokeWidth="7" fill="none"/>
              {/* Corso Vittorio Emanuele */}
              <path d="M90,352 L300,338 L520,326 L735,316 L1000,300 L1230,270" stroke="#C9B48A" strokeWidth="10" fill="none"/>
              {/* Via Maqueda */}
              <path d="M600,-20 L655,150 L735,316 L830,520 L885,720" stroke="#C9B48A" strokeWidth="10" fill="none"/>
              {/* Via del Celso */}
              <path d="M478,330 C484,370 470,400 488,440" stroke="#962C2C" strokeWidth="3" strokeDasharray="2 6" strokeLinecap="round" fill="none"/>
              {/* giardino Villa Bonanno */}
              <rect x="270" y="360" width="80" height="44" fill="#DCE0CB" transform="rotate(-4 310 382)"/>
            </g>
            <g fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600" fill="#1D1C1A" letterSpacing=".04em">
              <text x="120" y="335" transform="rotate(-3 120 335)" fill="#7a6a48">CORSO VITTORIO EMANUELE</text>
              <text x="612" y="90" transform="rotate(68 612 90)" fill="#7a6a48">VIA MAQUEDA</text>
              <text x="880" y="430" transform="rotate(66 880 430)" fill="#7a6a48">VIA ROMA</text>
              <g fill="#1D1C1A">
                <circle cx="215" cy="378" r="5"/><text x="150" y="410">Palazzo dei Normanni</text>
                <circle cx="250" cy="455" r="5"/><text x="264" y="460">San Giovanni degli Eremiti</text>
                <circle cx="420" cy="300" r="5"/><text x="360" y="285">Cattedrale</text>
                <circle cx="735" cy="316" r="5"/><text x="750" y="345">Quattro Canti</text>
                <circle cx="790" cy="370" r="5"/><text x="805" y="378">Martorana</text>
                <circle cx="560" cy="500" r="5"/><text x="530" y="530">Ballarò</text>
                <circle cx="640" cy="105" r="5"/><text x="660" y="110">Teatro Massimo</text>
                <circle cx="925" cy="640" r="5"/><text x="945" y="645">Stazione Centrale</text>
                <text x="1225" y="215" fontStyle="italic" fill="#6b7257">La Cala</text>
                <text x="1212" y="90" fontStyle="italic" fill="#6b7257" letterSpacing=".2em">MAR TIRRENO</text>
              </g>
            </g>
            <g transform="translate(480 345)">
              <circle className="animate-map-pulse [transform-box:fill-box] origin-center motion-reduce:animate-none motion-reduce:opacity-0" r="16" fill="#962C2C"/>
              <g className="[transform-box:fill-box] origin-bottom"><path d="M0,0 C-14,-18 -18,-26 -18,-34 A18,18 0 1 1 18,-34 C18,-26 14,-18 0,0Z" fill="#962C2C"/><circle cy="-34" r="6" fill="#FFF6E1"/></g>
            </g>
            <path d="M1340,600 v-40 m-8,10 l8,-10 l8,10" stroke="#1D1C1A" strokeWidth="1.4" fill="none"/><text x="1334" y="625" fontFamily="Bricolage Grotesque, sans-serif" fontSize="13" fontWeight="600">N</text>
          </svg>
      <div className="absolute left-[clamp(16px,2.4vw,36px)] bottom-[clamp(16px,2.4vw,36px)] right-4 lg:right-auto lg:max-w-[300px] bg-white p-[clamp(18px,2vw,28px)] grid gap-2.5 shadow-[0_1px_0_rgb(0_0_0/.04)]">
        <h3 className="font-display font-semibold text-h6 leading-none tracking-tight text-balance text-red">{title}</h3>
        <p className="text-caption">{lines.map((l, i) => <span key={i}>{i > 0 && <br />}{l}</span>)}</p>
        <MoreLink href={link.href} external>{link.label}</MoreLink>
      </div>
    </section>
  );
}
