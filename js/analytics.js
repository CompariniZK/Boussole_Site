// ============================================================================
// analytics.js — Google Analytics 4 + suivi du tunnel de vente (boussole.it.com)
// ----------------------------------------------------------------------------
// POUR ACTIVER : remplacez GA_ID ci-dessous par votre identifiant de mesure GA4
// (format « G-XXXXXXXXXX »), disponible dans Google Analytics →
// Administration → Flux de données → votre flux Web.
// Tant que l'ID reste le placeholder, RIEN ne se charge (aucun suivi, aucune
// erreur) — le site fonctionne normalement.
// ============================================================================
(function () {
  var GA_ID = 'G-XXXXXXXXXX'; // ← remplacez par votre ID GA4 pour activer le suivi

  var enabled = /^G-[A-Z0-9]{6,}$/.test(GA_ID);

  if (enabled) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  // Suivi du tunnel : tout clic vers l'application (boutons « S'abonner ») est
  // envoyé comme un événement de conversion, pour mesurer le taux visite→essai.
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href*="boussole-app.vercel.app"]');
    if (!a) return;
    if (enabled && window.gtag) {
      window.gtag('event', 'subscribe_click', {
        event_category: 'funnel',
        event_label: (document.title || '').slice(0, 100),
        link_url: a.href
      });
    }
  }, true);
})();
