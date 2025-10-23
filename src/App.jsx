import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "./assets/logo-jblfilmmaker.jpeg";
import CONFIG from "./config"; // ✅ chemin corrigé

// Images
import img1 from "./assets/Preview-Julie-Renan-37.jpeg";
import img2 from "./assets/162.jpeg";
import img3 from "./assets/EP1397.jpeg";
import img4 from "./assets/thumb.jpg";
import portraitJBL from "./assets/portrait-jbl.jpeg";
import contactBanner from "./assets/contact-banner-1600x600.jpeg";

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

// --- NAVBAR ---
const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur shadow-md z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Conteneur principal */}
        <div className="flex flex-col md:flex-row items-center justify-between py-3">
          {/* Ligne supérieure : burger + logo */}
          <div className="flex items-center justify-center w-full md:w-auto relative">
            {/* Burger mobile à gauche */}
            <button
              className="absolute left-0 inline-flex items-center justify-center p-2 rounded-md border border-gray-200 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? "✕" : "☰"}
            </button>

            {/* Logo centré */}
            <Link to="/" className="flex flex-col items-center mx-auto">
              <motion.img
                src={logo}
                alt="Logo JBL Filmmaker"
                className="h-12 md:h-16 mb-2 md:mb-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              {/* Nom animé — uniquement visible sur mobile */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="block md:hidden text-sm font-semibold text-gray-900 tracking-widest uppercase text-center"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                JEAN-BAPTISTE LARRUCHON
              </motion.span>
            </Link>
          </div>

          {/* Liens desktop */}
          <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-[0.2em]">
            <Link to="/" className="hover:text-gray-600">
              {t("nav.portfolio")}
            </Link>
            <Link to="/about" className="hover:text-gray-600">
              {t("nav.about")}
            </Link>
            <Link to="/prestations" className="hover:text-gray-600">
              {t("nav.services")}
            </Link>
            <Link to="/contact" className="hover:text-gray-600">
              {t("nav.contact")}
            </Link>

            <span className="h-5 w-px bg-gray-200" />

            {/* Langues */}
            <button
              onClick={() => changeLanguage("fr")}
              className={`hover:underline ${
                i18n.language === "fr" ? "font-semibold underline" : ""
              }`}
            >
              FR
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`hover:underline ${
                i18n.language === "en" ? "font-semibold underline" : ""
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Drawer mobile */}
        {open && (
          <div className="md:hidden border-t border-gray-200 py-3 space-y-2 text-sm uppercase tracking-[0.2em] text-center">
            <Link
              onClick={() => setOpen(false)}
              to="/"
              className="block py-2 hover:text-gray-600"
            >
              {t("nav.portfolio")}
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/about"
              className="block py-2 hover:text-gray-600"
            >
              {t("nav.about")}
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/prestations"
              className="block py-2 hover:text-gray-600"
            >
              {t("nav.services")}
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/contact"
              className="block py-2 hover:text-gray-600"
            >
              {t("nav.contact")}
            </Link>
            <div className="flex items-center justify-center space-x-4 pt-2">
              <button
                onClick={() => changeLanguage("fr")}
                className={`hover:underline ${
                  i18n.language === "fr" ? "font-semibold underline" : ""
                }`}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`hover:underline ${
                  i18n.language === "en" ? "font-semibold underline" : ""
                }`}
              >
                EN
              </button>
              <a
                href={CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
                aria-label="Instagram"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

// --- FOOTER ---
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="mt-16 py-8 text-center text-xs text-gray-500 border-t border-gray-200 w-full flex flex-col items-center space-y-3">
      <p>© {new Date().getFullYear()} JBL Filmmaker — {t("footer.rights")}</p>
      <div className="flex items-center space-x-2">
        <Link to="/mentions-legales" className="underline hover:text-gray-700">
          {t("footer.legal")}
        </Link>
        <span>•</span>
        <a
          href={CONFIG.instagram} // ✅ Instagram centralisé
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:rotate-6"
        >
          <Instagram size={20} strokeWidth={1.5} className="opacity-80 hover:opacity-100" />
        </a>
      </div>
    </footer>
  );
};

// --- Carte image réutilisable avec titre en surimpression ---
// Carte image avec overlay titre/sous-titre + hover élégant
// --- ImageCard avec hover élégant et titre ---
const ImageCard = ({ item, onClick, aspect = "aspect-[16/9]" }) => (
  <button
    type="button"
    onClick={() => onClick(item.vimeo)}
    className="group relative overflow-hidden rounded-2xl w-full"
    aria-label={item.title || "Ouvrir la vidéo"}
  >
    <div className={`w-full ${aspect}`}>
      <img
        src={item.img}
        alt={item.title || "Portfolio"}
        className="w-full h-full object-cover transform transition-all duration-700 ease-[cubic-bezier(.25,.1,.25,1)] group-hover:scale-[1.03] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
      />
    </div>

    {/* Overlay titre */}
    {item.title && (
      <div
        className="absolute inset-0 flex items-center justify-center text-center px-4"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        <span className="text-white text-sm md:text-lg tracking-[0.15em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform">
          {item.title}
        </span>
      </div>
    )}
  </button>
);

// --- Portfolio ---
const Portfolio = () => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const portfolioItems = [
    { id: 1, img: img1, vimeo: "https://vimeo.com/1125339230", title: "SO ROMANTIC" },
    { id: 2, img: img2, vimeo: "https://vimeo.com/1095070627", title: "LOVE" },
    { id: 3, img: img3, vimeo: "https://vimeo.com/1112924585", title: "CLOSE TO YOU" },
    { id: 4, img: img4, vimeo: "https://vimeo.com/1084270881", title: "SUMMER GARDEN" },
  ];

  const chunk = (arr, size) =>
    arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center pt-24 md:pt-28">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TITRE & INTRO */}
        <h1 className="text-2xl md:text-3xl font-light mb-4 text-center">
          {t("home.title")}
        </h1>
        <p className="max-w-2xl mx-auto text-center text-gray-700 mb-8 md:mb-12">
          {t("home.intro")}
        </p>

        {/* GALERIE */}
        <div className="space-y-10 md:space-y-16">
          {chunk(portfolioItems, 3).map((group, gi) => {
            const [big, top, bottom] = group;
            const isEven = gi % 2 === 1;

            return (
              <div
                key={gi}
                className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-stretch"
              >
                {/* Colonne principale (image large) */}
                {big && (
                  <div
                    className={`${isEven ? "md:order-2" : "md:order-1"} flex`}
                    style={{ height: "100%" }}
                  >
                    <ImageCard
                      item={big}
                      onClick={setSelectedVideo}
                      aspect="aspect-[3/4]" // 👈 ratio plus vertical pour l’équilibre
                    />
                  </div>
                )}

                {/* Colonne secondaire (deux images empilées, hauteur 50% chacune) */}
                <div
                  className={`${
                    isEven ? "md:order-1" : "md:order-2"
                  } flex flex-col justify-between h-full space-y-5 md:space-y-6`}
                >
                  {top && (
                    <div className="flex-1">
                      <ImageCard
                        item={top}
                        onClick={setSelectedVideo}
                        aspect="aspect-[16/10]"
                      />
                    </div>
                  )}
                  {bottom && (
                    <div className="flex-1">
                      <ImageCard
                        item={bottom}
                        onClick={setSelectedVideo}
                        aspect="aspect-[16/10]"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <VideoModal videoUrl={selectedVideo} onClose={() => setSelectedVideo(null)} />
      <Footer />
    </div>
  );
};

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-start px-4 text-center pt-16 md:pt-20">
      <motion.img
        src={portraitJBL}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-64 md:w-80 rounded-2xl object-cover shadow-2xl mb-6"
        alt="Portrait JBL Filmmaker"
      />
      <motion.h1 className="text-3xl md:text-4xl font-light mb-4">{t("about.title")}</motion.h1>
      <motion.p className="max-w-2xl text-gray-700 leading-relaxed text-base md:text-lg">
        {t("about.text")}
      </motion.p>
      <Footer />
    </div>
  );
};

const Prestations = () => {
  const { t } = useTranslation();

  const packages = [
    { key: "film",      durationKey: "duration_short",  tone: "light", features: ["feature_film4k","feature_1cam","feature_drone","feature_audio"] },
    { key: "prestige",  durationKey: "duration_medium", tone: "dark",  features: ["feature_film4k","feature_1cam","feature_drone","feature_audio"], featured: true },
    { key: "timeless",  durationKey: "duration_long",   tone: "black", features: ["feature_teaser","feature_film4k","feature_2cam","feature_drone","feature_audio"] },
  ];

  const supplements = [
    { key: "raw", descKey: "raw_desc" },
    { key: "trailer", descKey: "trailer_desc" },
    { key: "halfday", descKey: "halfday_desc" },
    { key: "second", descKey: "second_desc" },
    { key: "special", descKey: "special_desc" },
    { key: "prewedding", descKey: "prewedding_desc" },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 text-black flex flex-col items-center pt-24 md:pt-28">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <h1 className="text-2xl md:text-3xl tracking-[0.25em] font-light text-center mb-6 md:mb-10">
          {t("services.title")}
        </h1>

        {/* Cartes formules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pack, i) => (
            <motion.div
              key={pack.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={[
                "rounded-3xl p-6 md:p-8 text-center shadow-lg border transition-transform",
                pack.tone === "light" && "bg-gray-100/80 border-gray-200 text-gray-700",
                pack.tone === "dark" && "bg-neutral-800 text-white border-neutral-700",
                pack.tone === "black" && "bg-black text-white border-neutral-900",
                pack.featured && "md:scale-[1.02]",
              ].join(" ")}
            >
              <h3 className="text-lg md:text-xl tracking-widest font-light mb-2">
                {t(`services.packages.${pack.key}`)}
              </h3>
              <p className="italic tracking-wider mb-6 opacity-80">
                {t(`services.packages.${pack.durationKey}`)}
              </p>

              <ul className="space-y-2 text-sm md:text-base leading-6">
                {pack.features.map((f) => (
                  <li key={f} className="uppercase tracking-wider">{t(`services.packages.${f}`)}</li>
                ))}
              </ul>

              <Link
                to={`/contact?formule=${encodeURIComponent(t(`services.packages.${pack.key}`))}`}
                className="mt-6 md:mt-8 inline-block rounded-full px-5 py-2 text-sm border border-current hover:opacity-80 transition"
              >
                {t("services.packages.cta_quote")}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <p className="max-w-4xl mx-auto text-center text-xs text-gray-600 mt-8 md:mt-10 leading-relaxed">
          {t("services.packages.note")}
        </p>

        {/* Suppléments */}
        <h2 className="text-2xl md:text-3xl tracking-[0.25em] font-light text-center mt-12 md:mt-16 mb-6 md:mb-8">
          {t("services.packages.addons_title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {supplements.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-neutral-800 text-white rounded-xl p-5 md:p-6 shadow-md"
            >
              <h3 className="text-base md:text-lg tracking-widest font-light mb-2">
                {t(`services.packages.${s.key}`)}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-neutral-200">
                {t(`services.packages.${s.descKey}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  const [succeeded, setSucceeded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const defaultFormule = searchParams.get("formule") || "";
  const [formule, setFormule] = useState(defaultFormule);

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
        setError(json?.errors?.[0]?.message || t("contact.form.error_generic"));
      }
    } catch {
      setError(t("contact.form.error_network"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-start pt-28">
      {/* ─── Bannière plein écran horizontal en haut ─── */}
      {/* ─── Bannière ajustée (texte descendu) ─── */}
<section className="w-full -mt-10">
  <div
    className="relative w-full h-64 md:h-80 lg:h-[28rem] bg-center bg-cover"
    style={{
      backgroundImage: `url(${contactBanner})`,
      backgroundPosition: "40% center", // ajuste le cadrage du visage ici
    }}
  >
    <div
      className="absolute inset-0 bg-black/40 flex flex-col items-center text-center px-4"
      style={{
        fontFamily: '"Playfair Display", serif',
        justifyContent: "flex-end", // 🔽 descend le contenu
        paddingBottom: "5%",       // espace depuis le bas
      }}
    >
      <h1 className="text-3xl md:text-4xl text-white font-light mb-3 drop-shadow-lg">
        {t("contact.title")}
      </h1>
      <p className="max-w-2xl text-white text-sm md:text-base drop-shadow">
        {t("contact.intro")}
      </p>
    </div>
  </div>
</section>

      {/* ─── Formulaire juste après la bannière ─── */}
      <div className="w-full max-w-xl px-4 mt-10 mb-16">
        {succeeded ? (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-left mb-6">
            <p className="font-medium" style={{ fontFamily: '"Playfair Display", serif' }}>
              {t("contact.form.success_title")}
            </p>
            <p className="text-sm mt-1">
              {t("contact.form.success_detail")}{" "}
              <a href={`mailto:${CONFIG.email}`} className="underline">
                {CONFIG.email}
              </a>
              .
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            action="https://formspree.io/f/xwprylbk"
            method="POST"
            className="text-left space-y-4"
          >
            {/* anti-spam */}
            <input type="text" name="_gotcha" className="hidden" tabIndex="-1" autoComplete="off" />
            <input type="hidden" name="_subject" value="Nouveau message depuis le site JBL Filmmaker" />

            {/* Nom & Prénom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {t("contact.form.last_name")}
                </label>
                <input
                  type="text"
                  name="nom"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {t("contact.form.first_name")}
                </label>
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
              <label className="block text-sm font-medium mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                {t("contact.form.email")}
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                {t("contact.form.phone")}
              </label>
              <input
                type="tel"
                name="telephone"
                required
                placeholder="+33 6 12 34 56 78"
                pattern="^[0-9+\\s().-]{6,}$"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Formule souhaitée */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                {t("contact.form.wish_package")}
              </label>
              <input
                type="text"
                name="formule"
                value={formule}
                onChange={(e) => setFormule(e.target.value)}
                placeholder="ex : Prestige"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Comment m'avez-vous trouvé */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                {t("contact.form.where")}
              </label>
              <select
                name="origine"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">{t("contact.form.where")}</option>
                <option value="Bouche à oreille">{t("contact.form.where_options.word")}</option>
                <option value="Instagram">{t("contact.form.where_options.instagram")}</option>
                <option value="Réseaux sociaux">{t("contact.form.where_options.social")}</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                {t("contact.form.budget")}
              </label>
              <input
                type="text"
                name="budget"
                placeholder="ex : 2000 €"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                {t("contact.form.date")}
              </label>
              <input
                type="date"
                name="date_evenement"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Lieu */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                {t("contact.form.place")}
              </label>
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
              <label className="block text-sm font-medium mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                {t("contact.form.what_like")}
              </label>
              <textarea
                name="plaisir"
                rows="4"
                placeholder={t("contact.form.what_like")}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                {t("contact.form.message")}
              </label>
              <textarea
                name="message"
                rows="4"
                placeholder={t("contact.form.message")}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>

            {/* Erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            {/* Bouton d'envoi */}
            <div className="text-center">
              <button
                type="submit"
                disabled={submitting}
                className={`bg-black text-white px-6 py-2 rounded-lg transition-colors ${
                  submitting ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-800"
                }`}
              >
                {submitting ? t("contact.form.sending") : t("contact.form.send")}
              </button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
};

const MentionsLegales = () => {
  const { t } = useTranslation();
  const email = CONFIG.email;
  const legalText = t("legal.text", { email });
  const [before, after] = legalText.split(email);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-light mb-6">{t("legal.title")}</h1>
      <p className="max-w-2xl text-gray-700 leading-relaxed text-sm">
        {before}
        <a href={`mailto:${email}`} className="underline text-blue-600 hover:text-blue-800 transition-colors">
          {email}
        </a>
        {after}
      </p>
      <Footer />
    </div>
  );
};

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