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
     4b. HOMEPAGE DELIVERY DIAGRAM — connectors drawn from the
         real element positions so they line up at every width
  ========================================================= */

  const deliveryDiagram = document.querySelector(".aser3-diagram");
  const deliverySvg = deliveryDiagram?.querySelector(".aser3-lines");

  if (deliveryDiagram && deliverySvg) {
    const inputs = [...deliveryDiagram.querySelectorAll(".aser3-input")];
    const core = deliveryDiagram.querySelector(".aser3-core");
    const cards = [...deliveryDiagram.querySelectorAll(".aser3-card")];
    const inputPaths = [...deliverySvg.querySelectorAll(".aser3-l1, .aser3-l2, .aser3-l3")];
    const cardPaths = [...deliverySvg.querySelectorAll(".aser3-c1, .aser3-c2, .aser3-c3, .aser3-c4")];

    const f = (n) => Math.round(n * 10) / 10;

    const drawConnectors = () => {
      if (!core || getComputedStyle(deliverySvg).display === "none") return;

      const box = deliveryDiagram.getBoundingClientRect();
      const c = core.getBoundingClientRect();
      const coreLeft = c.left - box.left;
      const coreTop = c.top - box.top;
      const coreBottom = coreTop + c.height;
      const coreMidY = coreTop + c.height / 2;

      deliverySvg.setAttribute("viewBox", `0 0 ${f(box.width)} ${f(box.height)}`);
      deliverySvg.setAttribute("preserveAspectRatio", "none");
      deliverySvg.style.height = `${box.height}px`;

      inputs.forEach((input, i) => {
        const path = inputPaths[i];
        if (!path) return;
        const r = input.getBoundingClientRect();
        const x1 = r.right - box.left;
        const y1 = r.top - box.top + r.height / 2;
        const y2 = coreMidY + (i - 1) * 10;
        const mid = x1 + (coreLeft - x1) * 0.55;
        path.setAttribute("d", `M${f(x1)} ${f(y1)} C${f(mid)} ${f(y1)} ${f(mid)} ${f(y2)} ${f(coreLeft)} ${f(y2)}`);
      });

      cards.forEach((card, i) => {
        const path = cardPaths[i];
        if (!path) return;
        const r = card.getBoundingClientRect();
        const x1 = coreLeft + c.width * (0.2 + i * 0.2);
        const x2 = r.left - box.left + r.width / 2;
        const y2 = r.top - box.top;
        const bend = coreBottom + (y2 - coreBottom) * 0.5;
        path.setAttribute("d", `M${f(x1)} ${f(coreBottom)} C${f(x1)} ${f(bend)} ${f(x2)} ${f(bend)} ${f(x2)} ${f(y2)}`);
      });

      [...inputPaths, ...cardPaths].forEach((path) => {
        const length = Math.ceil(path.getTotalLength());
        path.style.strokeDasharray = length;
        if (!path.closest(".is-visible")) path.style.strokeDashoffset = length;
      });
    };

    drawConnectors();
    window.addEventListener("load", drawConnectors);
    /* Core and cards slide into place; measure again once settled */
    [core, ...cards, ...inputs].forEach((el) => {
      el?.addEventListener("transitionend", (event) => {
        if (event.target === el && event.propertyName === "transform") drawConnectors();
      });
    });
    document.fonts?.ready.then(drawConnectors);

    if ("ResizeObserver" in window) {
      new ResizeObserver(() => drawConnectors()).observe(deliveryDiagram);
    } else {
      window.addEventListener("resize", drawConnectors, { passive: true });
    }
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
   Wrapped in its own scope: this block previously sat outside
   any function and referenced undefined variables, which threw
   a ReferenceError and stopped every script below it.
========================================================= */

(() => {
"use strict";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;


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

})();

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

    /* Site header: dropdowns, mobile panel, keyboard, outside click.
       Sets both "menu-open" and "mobile-open" because older CSS
       rules use each name. */
    document.querySelectorAll(".site-header").forEach((header) => {
        const toggle = header.querySelector(".site-menu-toggle");
        const dropdowns = [...header.querySelectorAll(".nav-dropdown")];

        const setDropdown = (dropdown, open) => {
            dropdown.classList.toggle("is-open", open);
            dropdown.querySelector(".nav-dropdown-toggle")
                ?.setAttribute("aria-expanded", String(open));
        };

        const closeDropdowns = (except = null) => {
            dropdowns.forEach((d) => { if (d !== except) setDropdown(d, false); });
        };

        const setMenu = (open) => {
            header.classList.toggle("menu-open", open);
            header.classList.toggle("mobile-open", open);
            document.documentElement.classList.toggle("nav-locked", open);
            if (!toggle) return;
            toggle.classList.toggle("is-active", open);
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        };

        const closeAll = () => { closeDropdowns(); setMenu(false); };

        toggle?.addEventListener("click", () => {
            const open = !header.classList.contains("menu-open");
            setMenu(open);
            if (!open) closeDropdowns();
        });

        dropdowns.forEach((dropdown) => {
            const button = dropdown.querySelector(".nav-dropdown-toggle");
            if (!button) return;

            button.addEventListener("click", (event) => {
                event.stopPropagation();
                const open = !dropdown.classList.contains("is-open");
                closeDropdowns(dropdown);
                setDropdown(dropdown, open);
            });

            button.addEventListener("keydown", (event) => {
                if (event.key !== "ArrowDown") return;
                event.preventDefault();
                closeDropdowns(dropdown);
                setDropdown(dropdown, true);
                dropdown.querySelector(".nav-dropdown-menu a")?.focus();
            });

            /* Close when keyboard focus leaves the dropdown */
            dropdown.addEventListener("focusout", (event) => {
                if (!dropdown.contains(event.relatedTarget)) setDropdown(dropdown, false);
            });
        });

        header.querySelectorAll("nav a").forEach((link) => {
            link.addEventListener("click", closeAll);
        });

        document.addEventListener("pointerdown", (event) => {
            if (!header.contains(event.target)) closeAll();
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeAll();
        });

        window.matchMedia("(max-width: 1100px)")
            .addEventListener("change", closeAll);

        /* Elevate header once the page scrolls */
        const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
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








/* =========================================================
   ASER AI — INVESTORS / NEWS / CONTACT / CAREERS PAGES
========================================================= */

(() => {
    "use strict";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* 1. Split statements into words for a word-by-word reveal */
    document.querySelectorAll(".pg-statement[data-words]").forEach((statement) => {
        let index = 0;
        const wrap = (node) => {
            [...node.childNodes].forEach((child) => {
                if (child.nodeType === Node.TEXT_NODE) {
                    const frag = document.createDocumentFragment();
                    child.textContent.split(/(\s+)/).forEach((part) => {
                        if (!part) return;
                        if (/^\s+$/.test(part)) {
                            frag.appendChild(document.createTextNode(" "));
                            return;
                        }
                        const span = document.createElement("span");
                        span.className = "pg-word";
                        span.style.setProperty("--w", index++);
                        span.textContent = part;
                        frag.appendChild(span);
                    });
                    child.replaceWith(frag);
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    wrap(child);
                }
            });
        };
        wrap(statement);
    });

    /* 2. Reveal statements and CTA lines when scrolled into view */
    const revealTargets = document.querySelectorAll(".pg-statement, .pg-cta-lines");

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealTargets.forEach((el) => el.classList.add("is-visible"));
    } else {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.3 });
        revealTargets.forEach((el) => observer.observe(el));
    }

    /* 3. News category filter */
    const filterButtons = document.querySelectorAll(".pg-filter");
    const newsCards = document.querySelectorAll(".pg-news-card");
    const emptyState = document.querySelector(".pg-news-empty");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            let shown = 0;

            filterButtons.forEach((b) => {
                const active = b === button;
                b.classList.toggle("is-active", active);
                b.setAttribute("aria-pressed", String(active));
            });

            newsCards.forEach((card) => {
                const match = filter === "all" || card.dataset.category === filter;
                card.classList.toggle("is-hidden", !match);
                card.classList.remove("is-entering");
                if (match) {
                    shown++;
                    card.classList.add("is-visible");
                    if (!reduceMotion) {
                        void card.offsetWidth;
                        card.classList.add("is-entering");
                    }
                }
            });

            if (emptyState) emptyState.hidden = shown > 0;
        });
    });

    /* 4. Live local time for each office */
    const clocks = document.querySelectorAll(".pg-clock[data-tz]");

    if (clocks.length) {
        const tick = () => {
            clocks.forEach((clock) => {
                const out = clock.querySelector(".pg-clock-time");
                try {
                    out.textContent = new Intl.DateTimeFormat("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: clock.dataset.tz
                    }).format(new Date());
                } catch (e) {
                    clock.hidden = true;
                }
            });
        };
        tick();
        setInterval(tick, 30000);
    }

    /* 5. Contact form: validate, then send via FormSubmit (email to data-endpoint address). */
    document.querySelectorAll(".pg-form[data-mailto]").forEach((form) => {
        const status = form.querySelector(".pg-form-status");
        const button = form.querySelector(".pg-form-submit");
        const endpoint = (form.dataset.endpoint || "").trim();
        const hasEndpoint = /^https:\/\/formsubmit\.co\/ajax\/.+/.test(endpoint);

        const setStatus = (text, type = "") => {
            status.textContent = text;
            status.classList.toggle("is-error", type === "error");
            status.classList.toggle("is-success", type === "success");
        };

        const validate = (field) => {
            const input = field.querySelector("input, textarea");
            if (!input || !input.required) return true;
            const ok = input.value.trim() !== "" &&
                (input.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()));
            field.classList.toggle("has-error", !ok);
            return ok;
        };

        form.querySelectorAll(".pg-field").forEach((field) => {
            field.addEventListener("input", () => {
                if (field.classList.contains("has-error")) validate(field);
            });
        });

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const fields = [...form.querySelectorAll(".pg-field")];
            const valid = fields.map(validate).every(Boolean);

            if (!valid) {
                setStatus("Please complete the highlighted fields.", "error");
                form.querySelector(".has-error input, .has-error textarea")?.focus();
                return;
            }

            const data = new FormData(form);

            if (!hasEndpoint) {
                console.error("[Contact form] data-endpoint in contact.html must look like https://formsubmit.co/ajax/you@example.com");
                setStatus(`The form isn't connected yet. Please email us at ${form.dataset.mailto}.`, "error");
                return;
            }

            // Honeypot filled = bot: pretend success, send nothing
            if ((data.get("website") || "").toString().trim()) {
                form.reset();
                setStatus("Thanks! Your message has been sent. We'll get back to you shortly.", "success");
                return;
            }

            const get = (key) => (data.get(key) || "").toString().trim();
            const payload = {
                "Full name": get("name"),
                "Email": get("email"),
                "Company": get("company") || "-",
                "Topic": get("topic"),
                "Message": get("message"),
                "Page": window.location.href,
                _subject: `New website enquiry: ${get("topic")} — ${get("name")}`,
                _replyto: get("email"),
                _template: "table",
                _captcha: "false"
            };

            const originalLabel = button.innerHTML;
            button.disabled = true;
            button.innerHTML = "Sending…";
            setStatus("");

            try {
                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Accept": "application/json" },
                    body: JSON.stringify(payload)
                });
                const result = await response.json().catch(() => ({}));
                if (!response.ok || String(result.success) !== "true") throw new Error(result.message || "Request failed");

                form.reset();
                setStatus("Thanks! Your message has been sent. We'll get back to you shortly.", "success");
            } catch (error) {
                console.error("[Contact form]", error.message);
                setStatus(`Sorry, something went wrong. Please try again or email us at ${form.dataset.mailto}.`, "error");
            } finally {
                button.disabled = false;
                button.innerHTML = originalLabel;
            }
        });
    });
})();


/* =========================================================
   LEGAL PAGES — active table-of-contents link + back to top
========================================================= */

(() => {
    "use strict";

    const tocLinks = [...document.querySelectorAll(".lg-toc a")];
    const topButton = document.querySelector(".lg-top");
    if (!tocLinks.length && !topButton) return;

    const sections = tocLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    const update = () => {
        const line = window.innerHeight * 0.3;
        let current = sections[0];
        sections.forEach((section) => {
            if (section.getBoundingClientRect().top <= line) current = section;
        });
        tocLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${current?.id}`);
        });
        topButton?.classList.toggle("is-shown", window.scrollY > 600);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    topButton?.addEventListener("click", () => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
})();


/* =========================================================
   AI LOADER — progress, status text, exit
========================================================= */

(() => {
    "use strict";

    const loader = document.getElementById("aiLoader");
    if (!loader) return;

    const root = document.documentElement;
    if (root.classList.contains("al-skip")) {
        loader.remove();
        return;
    }

    root.classList.add("al-lock");

    const bar = loader.querySelector(".al-bar span");
    const pct = loader.querySelector(".al-pct");
    const text = loader.querySelector(".al-text");
    const steps = (text?.dataset.steps || "").split("|").filter(Boolean);

    const MIN_TIME = 1900;
    const MAX_TIME = 6000;
    const start = performance.now();
    let progress = 0;
    let loaded = document.readyState === "complete";
    let finished = false;
    let stepIndex = 0;

    const setProgress = (value) => {
        progress = Math.max(progress, Math.min(100, value));
        bar?.style.setProperty("--p", (progress / 100).toFixed(3));
        if (pct) pct.textContent = `${Math.round(progress)}%`;

        const next = Math.min(steps.length - 1, Math.floor(progress / (100 / steps.length)));
        if (text && next !== stepIndex) {
            stepIndex = next;
            text.textContent = steps[stepIndex];
            text.classList.remove("is-swapping");
            void text.offsetWidth;
            text.classList.add("is-swapping");
        }
    };

    const finish = () => {
        if (finished) return;
        finished = true;
        setProgress(100);
        try { sessionStorage.setItem("aserLoaded", "1"); } catch (e) { /* storage blocked */ }
        setTimeout(() => {
            loader.classList.add("is-done");
            root.classList.remove("al-lock");
            setTimeout(() => loader.remove(), 1100);
        }, 280);
    };

    const tick = () => {
        if (finished) return;
        const elapsed = performance.now() - start;
        /* Ease towards 90% while loading; run to 100% once the page is ready */
        const target = loaded
            ? Math.min(100, (elapsed / MIN_TIME) * 100)
            : 90 * (1 - Math.exp(-elapsed / 1400));
        setProgress(target);

        if ((loaded && elapsed >= MIN_TIME) || elapsed >= MAX_TIME) {
            finish();
            return;
        }
        requestAnimationFrame(tick);
    };

    window.addEventListener("load", () => { loaded = true; });
    requestAnimationFrame(tick);
})();
