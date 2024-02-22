/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, f as renderSlot, g as renderComponent, h as renderHead, A as AstroError, i as UnknownContentCollectionError, j as renderUniqueStylesheet, k as renderScriptElement, l as createHeadAndContent, u as unescapeHTML } from '../astro_CRSIYrCs.mjs';
import 'kleur/colors';
import 'clsx';
import { p as prependForwardSlash } from '../astro/assets-service_BhyOb2SP.mjs';
/* empty css                           */

const $$Astro$5 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header class="fixed w-full py-5 z-10 bg-slate-800"> <div class="cust-container"> <div class="flex justify-between"> <a href="/" class="text-2xl text-white font-bold italic">MyBlog</a> <nav class="flex justify-evenly"> <a href="/" class="text-sm text-white uppercase font-bold ml-8">Home</a> <a href="/about" class="text-sm text-white uppercase font-bold ml-8">About</a> <a href="/posts" class="text-sm text-white uppercase font-bold ml-8">Posts</a> <a href="/contact" class="text-sm text-white uppercase font-bold ml-8">Contact</a> </nav> </div> </div> </header>`;
}, "/home/fke/Documents/GitHub/sample-astro-blog/src/components/header.astro", void 0);

const $$Astro$4 = createAstro();
const $$Section = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Section;
  const { className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`py-8 ${className}`, "class")}> <div class="my-container"> ${renderSlot($$result, $$slots["default"])} </div> </section>`;
}, "/home/fke/Documents/GitHub/sample-astro-blog/src/components/section.astro", void 0);

const $$Astro$3 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": "bg-slate-800" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="cust-container py-10"> <div class="flex justify-center items-center"> <div class="text-center"> <p class="text-white text-sm md:text-base">
Designed by <a href="#" class="text-primary">Francis &copy; Copyright</a> </p> </div> </div> </div> ` })}`;
}, "/home/fke/Documents/GitHub/sample-astro-blog/src/components/footer.astro", void 0);

const SITE_TITLE = "My Blog";
const SITE_DESCRIPTION = "A blog theme using astro.js and tailwindcss";
const HOMEPAGE_ARTICLE_LIMIT = 2;
const ARTICLES_PER_PAGE = 2;

const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="description"${addAttribute(SITE_DESCRIPTION, "content")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${SITE_TITLE}</title>${renderHead()}</head> <body class="min-h-screen"> ${renderComponent($$result, "Header", $$Header, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/fke/Documents/GitHub/sample-astro-blog/src/layouts/layout.astro", void 0);

function formatDate(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Date(date).toLocaleDateString(void 0, options);
}

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return;
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
function createGetEntry({
  getEntryImport,
  getRenderEntryImport
}) {
  return async function getEntry(collectionOrLookupObject, _lookupId) {
    let collection, lookupId;
    if (typeof collectionOrLookupObject === "string") {
      collection = collectionOrLookupObject;
      if (!_lookupId)
        throw new AstroError({
          ...UnknownContentCollectionError,
          message: "`getEntry()` requires an entry identifier as the second argument."
        });
      lookupId = _lookupId;
    } else {
      collection = collectionOrLookupObject.collection;
      lookupId = "id" in collectionOrLookupObject ? collectionOrLookupObject.id : collectionOrLookupObject.slug;
    }
    const entryImport = await getEntryImport(collection, lookupId);
    if (typeof entryImport !== "function")
      return void 0;
    const entry = await entryImport();
    if (entry._internal.type === "content") {
      return {
        id: entry.id,
        slug: entry.slug,
        body: entry.body,
        collection: entry.collection,
        data: entry.data,
        async render() {
          return render({
            collection: entry.collection,
            id: entry.id,
            renderEntryImport: await getRenderEntryImport(collection, lookupId)
          });
        }
      };
    } else if (entry._internal.type === "data") {
      return {
        id: entry.id,
        collection: entry.collection,
        data: entry.data
      };
    }
    return void 0;
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/dinosaurs-are-extinct-today.md": () => import('../dinosaurs-are-extinct-today_B8GNDvXp.mjs'),"/src/content/blog/failure-is-not-an-option.md": () => import('../failure-is-not-an-option_D-hR5Eju.mjs'),"/src/content/blog/i-believe-human-has-a-finite-number.md": () => import('../i-believe-human-has-a-finite-number_D6Bec8Wm.mjs'),"/src/content/blog/man-must-explore.md": () => import('../man-must-explore_BEnROMkU.mjs'),"/src/content/blog/science-has-not-yet-mastered-prophecy.md": () => import('../science-has-not-yet-mastered-prophecy_D4rgjhL6.mjs'),"/src/content/blog/the-dreams-of-yesterday-are-the-hopes-of-tommorrow.md": () => import('../the-dreams-of-yesterday-are-the-hopes-of-tommorrow_BTDxwvKq.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"blog":{"type":"content","entries":{"Failure-is-not-an-option":"/src/content/blog/failure-is-not-an-option.md","Dinosaurs-are-extinct-today":"/src/content/blog/dinosaurs-are-extinct-today.md","I-believe-every-human-has-a-finite-number":"/src/content/blog/i-believe-human-has-a-finite-number.md","Problems-look-mighty-small-from-150-miles-up":"/src/content/blog/man-must-explore.md","Science-has-not-yet-mastered-prophecy":"/src/content/blog/science-has-not-yet-mastered-prophecy.md","Live-by-meaning-and-purpose":"/src/content/blog/the-dreams-of-yesterday-are-the-hopes-of-tommorrow.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/dinosaurs-are-extinct-today.md": () => import('../dinosaurs-are-extinct-today_C97bzto0.mjs'),"/src/content/blog/failure-is-not-an-option.md": () => import('../failure-is-not-an-option_CF_E5cUl.mjs'),"/src/content/blog/i-believe-human-has-a-finite-number.md": () => import('../i-believe-human-has-a-finite-number_CYs3Twxf.mjs'),"/src/content/blog/man-must-explore.md": () => import('../man-must-explore_BzFTggpm.mjs'),"/src/content/blog/science-has-not-yet-mastered-prophecy.md": () => import('../science-has-not-yet-mastered-prophecy_DUmIhcI5.mjs'),"/src/content/blog/the-dreams-of-yesterday-are-the-hopes-of-tommorrow.md": () => import('../the-dreams-of-yesterday-are-the-hopes-of-tommorrow_DSM3C5-Y.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const getEntry = createGetEntry({
	getEntryImport: createGlobLookup(collectionToEntryMap),
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$Astro$1 = createAstro();
const $$BlogHeroContent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogHeroContent;
  const { heading, sub_heading, author, pubdate } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`bg-[url('/img/bg-index.jpg')] hero-main-div`, "class")}> <div class="cust-container relative z-[2]"> <div class="text-center text-white"> <h1 class="text-5xl font-bold mb-3">${heading}</h1> <p class="text-3xl mb-5">${sub_heading}</p> <p class="text-md mb-5">Posted by: ${author} on ${formatDate(pubdate)}</p> </div> </div> </div>`;
}, "/home/fke/Documents/GitHub/sample-astro-blog/src/components/blogHeroContent.astro", void 0);

const $$Astro = createAstro();
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { slug } = Astro2.params;
  if (slug === void 0) {
    throw new Error("Slug is required");
  }
  const entry = await getEntry("blog", slug);
  if (entry == void 0) {
    return Astro2.redirect("/404");
  }
  const { Content } = await entry.render();
  const { heading, sub_heading, author, pubdate, img } = entry.data;
  console.log(img);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BlogHeroContent", $$BlogHeroContent, { "heading": heading, "sub_heading": sub_heading, "author": author, "pubdate": pubdate, "bgImg": img })} ${renderComponent($$result2, "Section", $$Section, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="cust-container"> <div class="w-4/6 mx-auto"> ${renderComponent($$result3, "Content", Content, {})} </div> </div> ` })} ` })} `;
}, "/home/fke/Documents/GitHub/sample-astro-blog/src/pages/posts/[...slug].astro", void 0);

const $$file = "/home/fke/Documents/GitHub/sample-astro-blog/src/pages/posts/[...slug].astro";
const $$url = "/posts/[...slug]";

const ____slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Section as $, ARTICLES_PER_PAGE as A, HOMEPAGE_ARTICLE_LIMIT as H, ____slug_ as _, $$Layout as a, formatDate as f, getCollection as g };
