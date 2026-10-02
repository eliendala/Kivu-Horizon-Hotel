/* =========================================================
   KIVU HORIZON HOTEL
   Script principal
   Concept de démonstration — NEXORA
   ========================================================= */

"use strict";


/* =========================================================
   01. MENU MOBILE
   ========================================================= */

const menuButton =
  document.getElementById("menuButton");

const navLinks =
  document.getElementById("navLinks");


if (menuButton && navLinks) {

  function ouvrirMenu() {

    menuButton.classList.add("is-active");

    navLinks.classList.add("is-open");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    menuButton.setAttribute(
      "aria-label",
      "Fermer le menu"
    );
  }


  function fermerMenu() {

    menuButton.classList.remove("is-active");

    navLinks.classList.remove("is-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Ouvrir le menu"
    );
  }


  menuButton.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      const menuOuvert =
        navLinks.classList.contains("is-open");

      if (menuOuvert) {

        fermerMenu();

      } else {

        ouvrirMenu();

      }

    }
  );


  navLinks
    .querySelectorAll("a")
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function () {

          fermerMenu();

        }
      );

    });


  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        navLinks.classList.contains("is-open")
      ) {

        fermerMenu();

        menuButton.focus();

      }

    }
  );


  document.addEventListener(
    "click",
    function (event) {

      if (
        navLinks.classList.contains("is-open") &&
        !navLinks.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {

        fermerMenu();

      }

    }
  );


  window.addEventListener(
    "resize",
    function () {

      if (window.innerWidth > 900) {

        fermerMenu();

      }

    }
  );

}


/* =========================================================
   02. ANCRES INTERNES
   ========================================================= */

const liensInternes =
  document.querySelectorAll(
    'a[href^="#"]'
  );


liensInternes.forEach(function (lien) {

  lien.addEventListener(
    "click",
    function (event) {

      const cibleId =
        lien.getAttribute("href");


      /*
       * Un lien "#" seul ne possède
       * aucune cible réelle.
       */

      if (
        !cibleId ||
        cibleId === "#"
      ) {

        return;

      }


      const cible =
        document.querySelector(cibleId);


      /*
       * Si la cible n'existe pas,
       * le navigateur conserve son comportement normal.
       */

      if (!cible) {

        return;

      }


      event.preventDefault();


      const header =
        document.querySelector(
          ".site-header"
        );


      const hauteurHeader =
        header
          ? header.offsetHeight
          : 0;


      const position =
        cible.getBoundingClientRect().top +
        window.scrollY -
        hauteurHeader;


      window.scrollTo({

        top: Math.max(
          0,
          position
        ),

        behavior: "smooth"

      });


      /*
       * Mise à jour de l'URL sans
       * provoquer de rechargement.
       */

      if (
        window.history &&
        typeof window.history.pushState ===
          "function"
      ) {

        window.history.pushState(
          null,
          "",
          cibleId
        );

      }

    }
  );

});


/* =========================================================
   03. FORMULAIRE CONTACT
   ========================================================= */

const contactForm =
  document.getElementById(
    "contactForm"
  );


const formMessage =
  document.getElementById(
    "formMessage"
  );


const dateArrivee =
  document.getElementById(
    "arrivee"
  );


const dateDepart =
  document.getElementById(
    "depart"
  );


/* =========================================================
   04. VALIDATION DES DATES
   ========================================================= */

function verifierDates() {

  /*
   * Les champs de dates ne sont présents
   * que sur la page contenant le formulaire.
   */

  if (
    !dateArrivee ||
    !dateDepart
  ) {

    return true;

  }


  /*
   * Si les deux champs ne sont pas
   * encore renseignés, on laisse
   * la validation HTML native agir.
   */

  if (
    !dateArrivee.value ||
    !dateDepart.value
  ) {

    dateDepart.setCustomValidity("");

    return true;

  }


  const arrivee =
    new Date(
      `${dateArrivee.value}T00:00:00`
    );


  const depart =
    new Date(
      `${dateDepart.value}T00:00:00`
    );


  /*
   * Vérification de la validité
   * des dates elles-mêmes.
   */

  if (
    Number.isNaN(arrivee.getTime()) ||
    Number.isNaN(depart.getTime())
  ) {

    dateDepart.setCustomValidity(
      "Veuillez vérifier les dates indiquées."
    );

    return false;

  }


  /*
   * Le départ ne peut pas être
   * avant l'arrivée.
   */

  if (depart < arrivee) {

    dateDepart.setCustomValidity(
      "La date de départ doit être postérieure ou égale à la date d'arrivée."
    );

    return false;

  }


  /*
   * Tout est correct.
   */

  dateDepart.setCustomValidity("");

  return true;

}


/* =========================================================
   05. SURVEILLANCE DES DATES
   ========================================================= */

if (dateArrivee) {

  dateArrivee.addEventListener(
    "change",
    verifierDates
  );

}


if (dateDepart) {

  dateDepart.addEventListener(
    "change",
    verifierDates
  );

}


/* =========================================================
   06. SOUMISSION DU FORMULAIRE
   ========================================================= */

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    function (event) {

      /*
       * Kivu Horizon est un concept.
       * Aucun formulaire réel n'est envoyé.
       */

      event.preventDefault();


      /*
       * Effacer le message précédent.
       */

      if (formMessage) {

        formMessage.textContent = "";

      }


      /* ---------------------------------------------------
         VALIDATION DES DATES
         --------------------------------------------------- */

      if (!verifierDates()) {

        if (formMessage) {

          formMessage.textContent =
            "Vérifiez les dates indiquées.";

        }


        if (dateDepart) {

          dateDepart.focus();

        }

        return;

      }


      /* ---------------------------------------------------
         VALIDATION HTML NATIVE
         --------------------------------------------------- */

      if (
        !contactForm.checkValidity()
      ) {

        contactForm.reportValidity();


        if (formMessage) {

          formMessage.textContent =
            "Veuillez vérifier les informations obligatoires.";

        }

        return;

      }


      /* ---------------------------------------------------
         DÉMONSTRATION
         --------------------------------------------------- */

      if (formMessage) {

        formMessage.textContent =
          "Votre demande a été préparée pour cette démonstration. Aucun envoi réel n'est effectué.";

      }

    }
  );

}