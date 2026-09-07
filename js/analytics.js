// ============================================================================
// analytics.js — mesure du tunnel de vente (boussole.it.com)
// ----------------------------------------------------------------------------
// POUR ACTIVER : remplacez les identifiants ci-dessous. Tant qu'ils gardent
// leur valeur par défaut, RIEN ne se charge (aucun suivi, aucune erreur) — le
// site fonctionne normalement.
//
//   GA_ID          Google Analytics 4 → Administration → Flux de données
//                  (format « G-XXXXXXXXXX »)
//   META_PIXEL_ID  Meta Events Manager → Sources de données → votre pixel
//                  (une suite de chiffres)
//
// Événement suivi : tout clic vers l'application (boutons « S'abonner »).
// C'est la dernière étape mesurable ici — le paiement lui-même se fait sur un
// autre domaine, puis chez Stripe.
// ============================================================================
(function () {
  var GA_ID = 'G-XXXXXXXXXX';   // ← votre identifiant GA4
  var META_PIXEL_ID = '';       // ← votre identifiant de pixel Meta

  var gaOn = /^G-[A-Z0-9]{6,}$/.test(GA_ID);
  var metaOn = /^[0-9]{10,20}$/.test(META_PIXEL_ID);

  // ── Google Analytics 4 ────────────────────────────────────────────────────
  if (gaOn) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  // ── Meta Pixel ────────────────────────────────────────────────────────────
  if (metaOn) {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  }

  // ── Conversion : clic vers l'application ──────────────────────────────────
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href*="boussole-app.vercel.app"]');
    if (!a) return;

    if (gaOn && window.gtag) {
      window.gtag('event', 'subscribe_click', {
        event_category: 'funnel',
        event_label: (document.title || '').slice(0, 100),
        link_url: a.href
      });
    }
    if (metaOn && window.fbq) {
      // Standard Meta : l'internaute entre dans le tunnel d'abonnement.
      window.fbq('track', 'InitiateCheckout', { content_name: 'Abonnement Boussole', currency: 'EUR', value: 1.99 });
    }
  }, true);
})();
