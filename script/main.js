/* =========================================================
   ASER AI — SHARED INTERACTIONS
   Vanilla JS · safe across all pages · no external libraries
========================================================= */

(() => {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finePointer = window.matchMedia(
    "(pointer: fine)"
  ).matches;

  document.documentElement.classList.add("js-ready");


  /* =========================================================
     1. SHARED SCROLL REVEAL
  ========================================================= */

  const revealSelector = [
    ".reveal",
    ".aser3-section",
    ".aser4-section",
    ".aser5-section",
    ".operational-challenge"
  ].join(",");

  const revealItems = document.querySelectorAll(revealSelector);

  if (reduceMotion || !("IntersectionObserver" in window)) {

    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });

  } else {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });

  }


  /* =========================================================
     2. HOMEPAGE HERO PARALLAX
  ========================================================= */

  const homeHero = document.querySelector(".hero");
  const homeArtwork = document.querySelector(".hero-art");

  if (homeHero && homeArtwork && finePointer && !reduceMotion) {

    let raf = 0;

    homeHero.addEventListener("pointermove", (event) => {

      const bounds = homeHero.getBoundingClientRect();

      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      if (raf) cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {

        homeArtwork.style.transform =
          `translateY(-50%) translate3d(${x * -18}px, ${y * -10}px, 0)`;

        raf = 0;

      });

    }, { passive: true });


    homeHero.addEventListener("pointerleave", () => {

      homeArtwork.style.transform = "translateY(-50%) translateX(0)";

    }, { passive: true });

  }


  /* =========================================================
     3. PANTHEON HERO PARALLAX
  ========================================================= */

  const pantheonHero = document.querySelector(".pantheon-hero");
  const pantheonVisual = document.querySelector(".hero-visual");

  if (pantheonHero && pantheonVisual && finePointer && !reduceMotion) {

    let raf = 0;

    pantheonHero.addEventListener("pointermove", (event) => {

      const bounds = pantheonHero.getBoundingClientRect();

      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      if (raf) cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {

        pantheonVisual.style.translate =
          `${x * -12}px ${y * -8}px`;

        raf = 0;

      });

    }, { passive: true });


    pantheonHero.addEventListener("pointerleave", () => {

      pantheonVisual.style.translate = "";

    }, { passive: true });

  }


  /* =========================================================
     4. DELIVERY CARDS — POINTER LIGHTING
  ========================================================= */

  if (finePointer && !reduceMotion) {

    document.querySelectorAll(".aser3-card").forEach((card) => {

      card.addEventListener("pointermove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty("--pointer-x", `${x}%`);
        card.style.setProperty("--pointer-y", `${y}%`);

      }, { passive: true });

    });

  }


  /* =========================================================
     5. IN-PAGE NAVIGATION STATE
  ========================================================= */

  const navLinks = [
    ...document.querySelectorAll(
      "header nav a, .site-header nav a"
    )
  ];

  const navSections = navLinks
    .map((link) => {

      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) return null;

      return document.querySelector(href);

    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && navSections.length) {

    const navObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {

            const isCurrent =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isCurrent);

            if (isCurrent) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }

          });

        });

      },
      {
        rootMargin: "-38% 0px -52% 0px"
      }
    );

    navSections.forEach((section) => {
      navObserver.observe(section);
    });

  }


  /* =========================================================
     6. SOLUTIONS HERO — MOUSE PARALLAX
  ========================================================= */

  const solutionHero = document.querySelector(".solution-hero");

  const solutionVisuals = [
    document.querySelector(".solution-hero-visual"),
    document.querySelector(".solution-data-panels")
  ].filter(Boolean);

  if (
    solutionHero &&
    solutionVisuals.length &&
    finePointer &&
    !reduceMotion
  ) {

    let raf = 0;

    solutionHero.addEventListener("pointermove", (event) => {

      const bounds = solutionHero.getBoundingClientRect();

      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      if (raf) cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {

        solutionVisuals.forEach((visual, index) => {

          const depth = index === 0 ? 13 : 9;

          visual.style.transform =
            `translate3d(${x * -depth}px, ${y * -10}px, 0)`;

        });

        raf = 0;

      });

    }, { passive: true });


    solutionHero.addEventListener("pointerleave", () => {

      solutionVisuals.forEach((visual) => {
        visual.style.transform = "";
      });

    }, { passive: true });

  }


  /* =========================================================
     7. SOLUTIONS CARDS — POINTER GLOW
  ========================================================= */

  if (finePointer && !reduceMotion) {

    document.querySelectorAll(
      ".solution-capability-card, .solution-audience-card"
    ).forEach((card) => {

      card.addEventListener("pointermove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty("--pointer-x", `${x}%`);
        card.style.setProperty("--pointer-y", `${y}%`);

      }, { passive: true });

    });

  }


  /* =========================================================
     8. OPERATIONAL CHALLENGE — SIGNAL ANIMATION
  ========================================================= */

  const challengeSection = document.querySelector(
    ".operational-challenge"
  );

  if (challengeSection) {

    const signalVisual = challengeSection.querySelector(
      ".signal-visual"
    );

    if (signalVisual) {

      if (
        reduceMotion ||
        !("IntersectionObserver" in window)
      ) {

        signalVisual.classList.add("is-visible");

      } else {

        const challengeObserver = new IntersectionObserver(
          ([entry], observer) => {

            if (!entry.isIntersecting) return;

            signalVisual.classList.add("is-visible");

            observer.unobserve(entry.target);

          },
          {
            threshold: 0.25
          }
        );

        challengeObserver.observe(challengeSection);

      }

    }

  }

})();




/* =========================================================
   PANTHEON INSURANCE PAGE — INTERACTIONS
   Add inside the existing shared IIFE, before its closing })();
========================================================= */


/* 1. HERO PARALLAX */

const insuranceHero = document.querySelector(".insurance-hero");
const insuranceHeroArt = document.querySelector(".insurance-hero-art");

if (
  insuranceHero &&
  insuranceHeroArt &&
  finePointer &&
  !reduceMotion
) {
  let insuranceFrame = 0;

  insuranceHero.addEventListener("pointermove", (event) => {
    const bounds = insuranceHero.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    if (insuranceFrame) {
      cancelAnimationFrame(insuranceFrame);
    }

    insuranceFrame = requestAnimationFrame(() => {
      insuranceHeroArt.style.transform =
        `translate3d(${x * -9}px, ${y * -7}px, 0)`;

      insuranceFrame = 0;
    });

  }, { passive: true });


  insuranceHero.addEventListener("pointerleave", () => {
    insuranceHeroArt.style.transform = "";
  }, { passive: true });
}


/* 2. RISK CAPABILITY CARD POINTER GLOW */

if (finePointer && !reduceMotion) {
  document.querySelectorAll(
    ".risk-capability-card, .audience-card, .risk-input-card"
  ).forEach((card) => {

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--pointer-x", `${x}%`);
      card.style.setProperty("--pointer-y", `${y}%`);
    }, { passive: true });

  });
}


/* 3. MOBILE NAVIGATION */

const insuranceMenuButton = document.querySelector(
  ".insurance-header .mobile-menu-toggle"
);

const insuranceHeader = document.querySelector(".insurance-header");

if (insuranceMenuButton && insuranceHeader) {

  insuranceMenuButton.addEventListener("click", () => {

    const isOpen = insuranceHeader.classList.toggle("menu-open");

    insuranceMenuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    insuranceMenuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

  });


  insuranceHeader.querySelectorAll(".main-navigation a").forEach((link) => {

    link.addEventListener("click", () => {

      insuranceHeader.classList.remove("menu-open");

      insuranceMenuButton.setAttribute("aria-expanded", "false");
      insuranceMenuButton.setAttribute("aria-label", "Open navigation");

    });

  });

}


/* 4. STAGGERED REVEAL FOR INSURANCE SECTIONS */

const insuranceRevealItems = document.querySelectorAll(
  ".pantheon-insurance-page .reveal"
);

if (reduceMotion || !("IntersectionObserver" in window)) {

  insuranceRevealItems.forEach((item) => {
    item.classList.add("is-visible");
  });

} else {

  const insuranceRevealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  insuranceRevealItems.forEach((item) => {
    insuranceRevealObserver.observe(item);
  });

}

/* =========================================================
   ASER AI — RESEARCH PAGE INTERACTIONS
   Safe to use alongside existing shared interactions
========================================================= */

(() => {
  "use strict";

  const page = document.querySelector(".research-page");

  if (!page) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const finePointer = window.matchMedia(
    "(pointer: fine)"
  ).matches;


  /* =====================================================
     1. HERO PARALLAX
  ===================================================== */

  const hero = page.querySelector(".research-hero");
  const heroVisual = page.querySelector(".research-hero-visual");

  if (hero && heroVisual && finePointer && !reduceMotion) {

    let frame = 0;

    hero.addEventListener("pointermove", (event) => {

      const bounds = hero.getBoundingClientRect();

      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      if (frame) cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {

        heroVisual.style.translate =
          `${x * -12}px ${y * -9}px`;

        frame = 0;

      });

    }, { passive: true });


    hero.addEventListener("pointerleave", () => {
      heroVisual.style.translate = "";
    }, { passive: true });

  }


  /* =====================================================
     2. FLOATING IMAGE CARD POINTER EFFECT
  ===================================================== */

  if (finePointer && !reduceMotion) {

    page.querySelectorAll(".research-visual-card").forEach((card) => {

      card.addEventListener("pointermove", (event) => {

        const bounds = card.getBoundingClientRect();

        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        card.style.setProperty("--card-pointer-x", `${x * 8}deg`);
        card.style.setProperty("--card-pointer-y", `${y * -6}deg`);

      }, { passive: true });

      card.addEventListener("pointerleave", () => {

        card.style.removeProperty("--card-pointer-x");
        card.style.removeProperty("--card-pointer-y");

      }, { passive: true });

    });

  }


  /* =====================================================
     3. RESEARCH CARD POINTER GLOW
  ===================================================== */

  if (finePointer && !reduceMotion) {

    page.querySelectorAll(
      ".research-case-content, .research-step"
    ).forEach((element) => {

      element.addEventListener("pointermove", (event) => {

        const bounds = element.getBoundingClientRect();

        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;

        element.style.setProperty("--pointer-x", `${x}%`);
        element.style.setProperty("--pointer-y", `${y}%`);

      }, { passive: true });

    });

  }


  /* =====================================================
     4. MOBILE NAVIGATION
  ===================================================== */

  const header = page.querySelector(".research-header");
  const menuButton = page.querySelector(".research-menu-toggle");

  if (header && menuButton) {

    menuButton.addEventListener("click", () => {

      const isOpen = header.classList.toggle("menu-open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

    });


    header.querySelectorAll(".research-nav a").forEach((link) => {

      link.addEventListener("click", () => {

        header.classList.remove("menu-open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");

      });

    });


    document.addEventListener("pointerdown", (event) => {

      if (!header.contains(event.target)) {

        header.classList.remove("menu-open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");

      }

    });

  }


  /* =====================================================
     5. RESEARCH PAGE SCROLL REVEAL
  ===================================================== */

  const revealItems = page.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {

    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });

  } else {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });

  }


  /* =====================================================
     6. IMAGE LOADING FALLBACK
  ===================================================== */

  page.querySelectorAll("img").forEach((img) => {

    img.addEventListener("error", () => {

      img.classList.add("image-unavailable");

      const parent = img.parentElement;

      if (parent) {
        parent.classList.add("image-fallback");
      }

    }, { once: true });

  });

})();


/* =========================================================
   ASER AI — SHARED MOBILE NAVIGATION + MICRO-INTERACTIONS
========================================================= */

(() => {
    "use strict";

    const headers = document.querySelectorAll(".site-header");

    headers.forEach((header) => {
        const toggle = header.querySelector(".site-menu-toggle");
        const nav = header.querySelector("nav");

        if (!toggle || !nav) return;

        const closeMenu = () => {
            header.classList.remove("menu-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open navigation");
        };

        toggle.addEventListener("click", () => {
            const open = header.classList.toggle("menu-open");

            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute(
                "aria-label",
                open ? "Close navigation" : "Open navigation"
            );
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("pointerdown", (event) => {
            if (!header.contains(event.target)) closeMenu();
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 640) closeMenu();
        }, { passive: true });
    });


    /* Smooth in-page links with fixed-header offset */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const id = link.getAttribute("href");
            if (!id || id === "#") return;

            const target = document.querySelector(id);
            if (!target) return;

            event.preventDefault();

            const header = document.querySelector(".site-header");
            const offset = header ? header.offsetHeight : 0;
            const top = target.getBoundingClientRect().top +
                window.scrollY - offset - 12;

            window.scrollTo({
                top,
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth"
            });

            history.replaceState(null, "", id);
        });
    });

})();



/* =========================================================
   ASER AI — THE ASER AI WAY
   Scroll reveals, counter, subtle interactions
========================================================= */

(() => {
    "use strict";

    const page = document.querySelector(".company-way-page");
    if (!page) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const finePointer = window.matchMedia(
        "(pointer: fine)"
    ).matches;

    /* Activate reveal system only when supported */
    if (!reducedMotion && "IntersectionObserver" in window) {

        const revealElements = page.querySelectorAll(".way-reveal");

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element, index) => {
            element.style.transitionDelay =
                `${(index % 4) * 80}ms`;

            revealObserver.observe(element);
        });

    } else {
        page.querySelectorAll(".way-reveal").forEach((element) => {
            element.classList.add("is-visible");
        });
    }


    /* Experience counter */
    const counter = page.querySelector("[data-count]");

    if (counter) {
        const target = Number(counter.dataset.count);

        const runCounter = () => {
            if (reducedMotion) {
                counter.textContent = target;
                return;
            }

            const duration = 1500;
            const startTime = performance.now();

            const update = (now) => {
                const progress = Math.min(
                    (now - startTime) / duration,
                    1
                );

                const eased = 1 - Math.pow(1 - progress, 4);

                counter.textContent = Math.floor(target * eased);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };

            requestAnimationFrame(update);
        };

        if ("IntersectionObserver" in window && !reducedMotion) {
            const counterObserver = new IntersectionObserver(
                ([entry], observer) => {
                    if (!entry.isIntersecting) return;

                    runCounter();
                    observer.unobserve(entry.target);
                },
                { threshold: 0.6 }
            );

            counterObserver.observe(counter);
        } else {
            runCounter();
        }
    }


    /* Hero parallax */
    const hero = page.querySelector(".way-hero");
    const orbits = page.querySelectorAll(".way-orbit");

    if (hero && finePointer && !reducedMotion) {
        let frame = null;

        hero.addEventListener("pointermove", (event) => {
            const rect = hero.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - .5;
            const y = (event.clientY - rect.top) / rect.height - .5;

            if (frame) cancelAnimationFrame(frame);

            frame = requestAnimationFrame(() => {
                orbits.forEach((orbit, index) => {
                    const depth = index === 0 ? 12 : 7;
                    orbit.style.translate =
                        `${x * depth}px ${y * depth}px`;
                });

                frame = null;
            });
        }, { passive: true });

        hero.addEventListener("pointerleave", () => {
            orbits.forEach((orbit) => {
                orbit.style.translate = "";
            });
        });
    }


    /* Pointer glow on values cards */
    if (finePointer && !reducedMotion) {
        page.querySelectorAll(".way-value-card").forEach((card) => {
            card.addEventListener("pointermove", (event) => {
                const rect = card.getBoundingClientRect();

                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;

                card.style.setProperty("--pointer-x", `${x}%`);
                card.style.setProperty("--pointer-y", `${y}%`);
            }, { passive: true });
        });
    }

})();