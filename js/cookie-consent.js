/* Cookie Consent — CookieConsent v3 by orestbida (MIT license)
   Loaded from CDN, configured for Polish GDPR compliance
   Custom styling to match szkolapromptowania.com design */
(function() {
  // Load CSS
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css';
  link.integrity = 'sha384-9KcNFt4axT+TNOVPHpwGHOm4Kv0UcMjdVya1kl+EPBQG+Vmqtz28cnx0f5PZYcnF';
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);

  // Inject custom overrides AFTER CDN CSS loads
  link.onload = function() {
    var style = document.createElement('style');
    style.textContent = [
    '#cc-main { z-index: 10000 !important; font-family: var(--font-family, "CreatoDisplay", sans-serif) !important; }',
    '#cc-main .cm { border-radius: 24px !important; border: 1.5px solid #ececec !important; box-shadow: 0 20px 60px rgba(0,0,0,0.12) !important; padding: 28px !important; max-width: 400px !important; z-index: 10000 !important; }',
    '#cc-main .cm__title { font-size: 20px !important; font-weight: 500 !important; letter-spacing: -0.5px !important; }',
    '#cc-main .cm__desc { font-size: 14px !important; line-height: 1.5 !important; opacity: 0.75 !important; }',
    '#cc-main .cm__desc a { color: var(--primary, #FFBD59) !important; }',
    '#cc-main .cm__btn-group { gap: 8px !important; }',
    '#cc-main .cm__btn { border-radius: 100px !important; padding: 12px 24px !important; font-size: 14px !important; font-weight: 500 !important; border: none !important; cursor: pointer !important; transition: all 0.2s !important; }',
    '#cc-main .cm__btn:first-child { background: #FFBD59 !important; color: #09080e !important; }',
    '#cc-main .cm__btn:first-child:hover { filter: brightness(1.05) !important; }',
    '#cc-main .cm__btn:nth-child(2) { background: transparent !important; color: #1a1611 !important; border: 1.5px solid #ececec !important; }',
    '#cc-main .cm__btn:nth-child(2):hover { border-color: #FFBD59 !important; }',
    '#cc-main .cm__btn.cm__btn--secondary { background: transparent !important; color: #888 !important; padding: 8px 0 !important; font-size: 13px !important; border: none !important; text-decoration: underline !important; }',
    '#cc-main .cm__btn.cm__btn--secondary:hover { color: #1a1611 !important; }',
    /* Preferences modal */
    '#cc-main .pm { border-radius: 24px !important; }',
    '#cc-main .pm__btn { border-radius: 100px !important; padding: 10px 20px !important; font-size: 14px !important; }',
    '#cc-main .pm__btn--accept-all { background: var(--primary, #FFBD59) !important; color: #09080e !important; border: none !important; }',
    '#cc-main .pm__btn--accept-necessary { background: transparent !important; border: 1.5px solid #ececec !important; color: var(--text-primary, #1a1611) !important; }',
    '#cc-main .pm__btn--save { background: transparent !important; border: 1.5px solid #ececec !important; color: var(--text-primary, #1a1611) !important; }',
    '#cc-main .pm__title { font-weight: 500 !important; }',
    '#cc-main .pm__section-title { font-weight: 500 !important; }',
    /* Toggle switch */
    '#cc-main .toggle__icon { border-radius: 100px !important; }',
    '#cc-main input:checked + .toggle__icon { background: var(--primary, #FFBD59) !important; }'
    ].join('\n');
    document.head.appendChild(style);
  };

  // Load JS
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';
  script.integrity = 'sha384-rOJir5X47vJ4L28li0UMSxnlIl8p7RJ3I7C0t3vPJFmBNKm+ML654YY3uMpicukc';
  script.crossOrigin = 'anonymous';
  script.onload = function() {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: 'box',
          position: 'bottom left'
        },
        preferencesModal: {
          layout: 'box'
        }
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true
        },
        analytics: {}
      },
      language: {
        default: 'pl',
        translations: {
          pl: {
            consentModal: {
              title: 'Szanujemy Twoją prywatność',
              description: 'Używamy plików cookies, aby zapewnić prawidłowe działanie strony oraz — za Twoją zgodą — analizować ruch w serwisie. <a href="polityka-prywatnosci.html">Polityka prywatności</a>',
              acceptAllBtn: 'Akceptuję wszystkie',
              acceptNecessaryBtn: 'Tylko niezbędne',
              showPreferencesBtn: 'Ustawienia'
            },
            preferencesModal: {
              title: 'Ustawienia cookies',
              acceptAllBtn: 'Akceptuję wszystkie',
              acceptNecessaryBtn: 'Tylko niezbędne',
              savePreferencesBtn: 'Zapisz ustawienia',
              closeIconLabel: 'Zamknij',
              sections: [
                {
                  title: 'Pliki cookies',
                  description: 'Używamy plików cookies w celu zapewnienia prawidłowego działania strony i — za Twoją zgodą — analizy ruchu.'
                },
                {
                  title: 'Niezbędne',
                  description: 'Te cookies są konieczne do prawidłowego działania strony. Nie można ich wyłączyć.',
                  linkedCategory: 'necessary'
                },
                {
                  title: 'Analityczne',
                  description: 'Pomagają nam zrozumieć, jak korzystasz z serwisu, co pozwala nam go ulepszać.',
                  linkedCategory: 'analytics'
                },
                {
                  title: 'Więcej informacji',
                  description: 'W razie pytań dotyczących cookies skontaktuj się z nami: <a href="mailto:biuro@szkolapromptowania.com">biuro@szkolapromptowania.com</a>'
                }
              ]
            }
          }
        }
      }
    });
  };
  document.body.appendChild(script);
})();
