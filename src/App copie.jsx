import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Instagram } from "lucide-react";
import logo from "./assets/logo-jblfilmmaker.jpeg";
import { useSearchParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import contactBanner from "./assets/Preview-Julie-Renan-22.jpeg";
import { useTranslation } from "react-i18next";


// 🔽 AJOUTS : import des nouvelles images
import img1 from "./assets/Preview-Julie-Renan-37.jpeg";
import img2 from "./assets/162.jpeg";
import img3 from "./assets/EP1397.jpeg";
import img4 from "./assets/thumb.jpg";
import portraitJBL from "./assets/portrait-jbl.jpeg";

// --- CONFIG --- //
const INSTAGRAM_URL = "https://www.instagram.com/jbl.filmmaker";

// --- MODAL VIDÉO ---
const VideoModal = ({ videoUrl, onClose }) => {
  if (!videoUrl) return null;
  const embedUrl = videoUrl.replace("vimeo.com/", "player.vimeo.com/video/");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-black rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white text-2xl hover:text-gray-300"
          >
            ✕
          </button>
          <iframe
            src={embedUrl}
            width="100%"
            height="480"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Vimeo Video"
          ></iframe>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- PAGES ---
const Portfolio = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const portfolioItems = [
    {
      id: 1,
      img: img1, // ✅ nouvelle image
      vimeo: "https://vimeo.com/1125339230",
      
    },
    {
      id: 2,
      img: img2, // ✅ nouvelle image
      vimeo: "https://vimeo.com/987654321",
      
    },
    {
      id: 3,
      img: img3, // ✅ nouvelle image
      vimeo: "https://vimeo.com/567890123",
      
    },
     {
      id: 4,
      img: img4, // ✅ nouvelle image
      vimeo: "https://vimeo.com/567890123",
      
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-12">
      <h1 className="text-3xl font-light mb-8">Portfolio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center px-4 max-w-5xl mx-auto">
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer block overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => setSelectedVideo(item.vimeo)}
          >
            <img
              src={item.img}
              alt={item.alt || "Portfolio"}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <VideoModal
        videoUrl={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
      <Footer />
    </div>
  );
};

const About = () => (
  <div className="min-h-screen bg-white text-black flex flex-col items-center justify-start px-4 text-center pt-16 md:pt-20">
    <motion.img
      src={portraitJBL}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-64 md:w-80 rounded-2xl object-cover shadow-2xl mb-6" 
      alt="Portrait JBL Filmmaker"
    />
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-3xl md:text-4xl font-light mb-4"
    >
      À propos
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="max-w-2xl text-gray-700 leading-relaxed text-base md:text-lg"
    >
      Passionné par l'image et les émotions, JBL Filmmaker capture l'instant
      présent et raconte votre histoire avec authenticité et élégance. Chaque
      projet est une aventure humaine, où chaque regard, chaque mot, chaque
      détail prend vie à travers une réalisation cinématographique soignée.
    </motion.p>
    <Footer />
  </div>
);



const Prestations = () => {
  const packages = [
    {
      title: "FILM",
      duration: "3–5 mn",
      tone: "light",
      features: ["Film 4K", "1 cadreur", "Drone", "Sons / Discours • enregistrement"],
    },
    {
      title: "PRESTIGE",
      duration: "6–10 mn",
      tone: "dark",
      features: ["Film 4K", "1 cadreur", "Drone", "Sons / Discours • enregistrement"],
      featured: true,
    },
    {
      title: "INTEMPOREL",
      duration: "12–15 mn",
      tone: "black",
      features: ["Teaser 2 mn", "Film 4K", "2 cadreurs", "Drone", "Sons / Discours • enregistrement"],
    },
  ];

  const supplements = [
    {
      title: "RUSHS VIDÉO BRUTS",
      desc: "Livraison de l’intégralité des rushs bruts de la cérémonie de mariage.",
    },
    {
      title: "TRAILER VIDÉO",
      desc: "Création d’un format d’1 mn avec les meilleurs moments. Idéal pour les réseaux sociaux.",
    },
    {
      title: "DEMI-JOURNÉE SUPPLÉMENTAIRE",
      desc: "Présence sur une demi-journée supplémentaire, ajout des rushs au montage final.",
    },
    {
      title: "SECOND VIDÉASTE",
      desc: "Présence d’un second vidéaste pour une captation plus complète des différents moments.",
    },
    {
      title: "MONTAGE SPÉCIAL",
      desc: "Montage d’un moment spécial de la journée (cérémonie laïque / église, etc.).",
    },
    {
      title: "PRE-WEDDING VIDÉO",
      desc: "Séance organisée avant/après le mariage (3–4 h de présence) — souvenirs ciné.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 text-black flex flex-col items-center py-16 px-4">
      {/* TITRE FORMULES */}
      <h1 className="text-3xl tracking-[0.3em] font-light text-center mb-4">FORMULES</h1>

      {/* TEXTE INTRODUCTION */}
      <p className="max-w-2xl text-center text-gray-700 mb-10">
        Découvrez des prestations vidéo haut de gamme, adaptées aux mariages,
        événements privés ou professionnels.
      </p>

      {/* 3 FORMULES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {packages.map((pack, i) => (
          <motion.div
            key={pack.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={[
              "rounded-[2.5rem] p-8 text-center shadow-lg border transition-transform",
              pack.tone === "light" && "bg-gray-100/80 border-gray-200 text-gray-700",
              pack.tone === "dark" && "bg-neutral-800 text-white border-neutral-700",
              pack.tone === "black" && "bg-black text-white border-neutral-900",
              pack.featured && "scale-[1.02]",
            ].join(" ")}
          >
            <h3 className="text-xl tracking-widest font-light mb-2">{pack.title}</h3>
            <p className="italic tracking-wider mb-6 opacity-80">{pack.duration}</p>
            <ul className="space-y-2 text-sm leading-6">
              {pack.features.map((f) => (
                <li key={f} className="uppercase tracking-wider">{f}</li>
              ))}
            </ul>

            {/* BOUTON → PAGE CONTACT */}
            <Link
  to={`/contact?formule=${encodeURIComponent(pack.title)}`}
  className="mt-8 inline-block rounded-full px-5 py-2 text-sm border border-current hover:opacity-80 transition"
>
  Demander un devis
</Link>
          </motion.div>
        ))}
      </div>

      {/* TEXTE D’INFO SOUS LES FORMULES */}
      <p className="max-w-4xl text-center text-xs text-gray-600 mt-10 leading-relaxed">
        *Les formules incluent ma présence toute la journée (des préparatifs à l’ouverture de bal),
        le temps passé au montage, l’amortissement du matériel, les frais de déplacement
        et la livraison via une galerie vidéo personnalisée. Des suppléments peuvent être ajoutés selon vos besoins.
      </p>

      {/* SUPPLÉMENTS */}
      <h2 className="text-3xl tracking-[0.3em] font-light text-center mt-16 mb-8">SUPPLÉMENTS</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {supplements.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-neutral-800 text-white rounded-xl p-6 shadow-md"
          >
            <h3 className="text-lg tracking-widest font-light mb-2">{s.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-200">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

const Contact = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const defaultFormule = searchParams.get("formule") || "";
  const [formule, setFormule] = useState(defaultFormule);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSucceeded(true);
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setError(
          json?.errors?.[0]?.message ||
            "Une erreur est survenue. Merci de réessayer."
        );
      }
    } catch (err) {
      setError("Impossible d’envoyer le formulaire. Vérifiez votre connexion.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-start">
      {/* 🖼️ Bannière plein largeur / hauteur contrôlée */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <img
  src={contactBanner}
  alt="Bannière contact"
  className="absolute inset-0 w-full h-full object-cover object-[0%_center]"
/>
        {/* Voile pour lisibilité + texte centré */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl md:text-4xl font-light mb-4">
            Contact
          </h1>
          <p className="text-white/95 max-w-2xl text-sm md:text-base leading-relaxed">
            Pour toute demande de prestation ou d&apos;information, remplissez le
            formulaire ci-dessous. Je vous répondrai rapidement 📩
          </p>
        </div>
      </div>

      {/* 📄 Formulaire en dessous de l'image */}
      <div className="w-full max-w-xl px-4 py-12 text-center">
        {succeeded ? (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-left">
            <p className="font-medium">Merci ! Votre message a bien été envoyé ✅</p>
            <p className="text-sm mt-1">
              Je reviens vers vous au plus vite. Vous pouvez aussi m’écrire à{" "}
              <a href="mailto:contact@jblvideoproduction.fr" className="underline">
                contact@jblvideoproduction.fr
              </a>
              .
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            action="https://formspree.io/f/xwprylbk"  // 👈 garde ton endpoint
            method="POST"
            className="text-left space-y-4"
          >
            {/* Anti-spam honeypot (invisible) */}
            <input
              type="text"
              name="_gotcha"
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />
            {/* Objet de l’email */}
            <input
              type="hidden"
              name="_subject"
              value={`Nouveau message — Formule: ${formule || "non précisée"}`}
            />

            {/* Nom & Prénom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input
                  type="text"
                  name="nom"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Adresse mail</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium mb-1">Numéro de téléphone</label>
              <input
                type="tel"
                name="telephone"
                required
                placeholder="+33 6 12 34 56 78"
                pattern="^[0-9+\\s().-]{6,}$"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Formule souhaitée (pré-remplie depuis ?formule=) */}
            <div>
              <label className="block text-sm font-medium mb-1">Formule souhaitée</label>
              <input
                type="text"
                name="formule"
                value={formule}
                onChange={(e) => setFormule(e.target.value)}
                placeholder="ex : Prestige"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Comment m'avez-vous trouvé ? */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Comment m&apos;avez-vous trouvé ?
              </label>
              <select
                name="origine"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Sélectionnez une option</option>
                <option value="Bouche à oreille">Bouche à oreille</option>
                <option value="Instagram">Instagram</option>
                <option value="Réseaux sociaux">Réseaux sociaux</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium mb-1">Votre budget (€)</label>
              <input
                type="text"
                name="budget"
                placeholder="ex : 2000 €"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Date de l'événement */}
            <div>
              <label className="block text-sm font-medium mb-1">Date de l&apos;événement</label>
              <input
                type="date"
                name="date_evenement"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Lieu */}
            <div>
              <label className="block text-sm font-medium mb-1">Lieu</label>
              <input
                type="text"
                name="lieu"
                required
                placeholder="Ville / lieu de l'événement"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Ce qui plaît */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Qu&apos;est-ce qui vous plaît dans mon travail ?
              </label>
              <textarea
                name="plaisir"
                rows="4"
                placeholder="Votre réponse..."
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>

            {/* Message libre */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Parlez-moi de votre mariage
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder="Vos envies, le lieu, le style..."
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>

            {/* Erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            {/* Bouton */}
            <div className="text-center">
              <button
                type="submit"
                disabled={submitting}
                className={`bg-black text-white px-6 py-2 rounded-lg transition-colors ${
                  submitting ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-800"
                }`}
              >
                {submitting ? "Envoi en cours..." : "Envoyer"}
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
};

// --- NAVBAR ---
const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };


  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-center px-8 py-8 z-50"
    >
      {/* Logo à gauche (décalé à droite sur la home) */}
      <div className="absolute left-8 md:left-12 flex items-center space-x-3">
        <img src={logo} alt="Logo JBL Filmmaker" className="h-16 md:h-20" />
      </div>

      {/* Liens centrés */}
      <div className="flex space-x-10 text-sm uppercase tracking-widest font-light mt-4">
        <Link to="/" className="hover:text-gray-500 transition-colors">Portfolio</Link>
        <Link to="/about" className="hover:text-gray-500 transition-colors">À propos</Link>
        <Link to="/prestations" className="hover:text-gray-500 transition-colors">Prestations</Link>
        <Link to="/contact" className="hover:text-gray-500 transition-colors">Contact</Link>
      </div>
    </motion.nav>
  );
};

// --- FOOTER ---
const Footer = () => (
  <footer className="mt-16 py-8 text-center text-xs text-gray-500 border-t border-gray-200 w-full flex flex-col items-center space-y-3">
    <p>© {new Date().getFullYear()} JBL Filmmaker — Tous droits réservés.</p>
    <div className="flex items-center space-x-2">
      <Link to="/mentions-legales" className="underline hover:text-gray-700">
        Mentions légales
      </Link>
      <span>•</span>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-300 hover:rotate-6"
      >
        <Instagram size={20} strokeWidth={1.5} className="opacity-80 hover:opacity-100" />
      </a>
    </div>
  </footer>
);

// --- MENTIONS LÉGALES ---
const MentionsLegales = () => (
  <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 text-center">
    <h1 className="text-3xl font-light mb-6">Mentions légales</h1>
    <p className="max-w-2xl text-gray-700 leading-relaxed text-sm">
      Ce site est édité par JBL Filmmaker. Tous les contenus (textes, images,
      vidéos) sont la propriété exclusive de JBL Filmmaker et ne peuvent être
      utilisés sans autorisation. <br />
      Contact :{" "}
      <a href="mailto:contact@jblvideoproduction.fr" className="underline">
        contact@jblvideoproduction.fr
      </a>
    </p>
    <Footer />
  </div>
);

// --- APP ---
function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-28">
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/prestations" element={<Prestations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;