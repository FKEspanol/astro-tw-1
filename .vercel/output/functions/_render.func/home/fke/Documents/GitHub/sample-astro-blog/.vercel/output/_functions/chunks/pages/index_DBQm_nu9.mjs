/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead, e as addAttribute } from '../astro_CRSIYrCs.mjs';
import 'kleur/colors';
import { H as HOMEPAGE_ARTICLE_LIMIT, f as formatDate, $ as $$Section, g as getCollection, A as ARTICLES_PER_PAGE, a as $$Layout } from './__CfuxT51H.mjs';
import { $ as $$HeroContent } from './about_ZQjs0T-K.mjs';
import 'clsx';

const $$Astro$3 = createAstro();
const $$Posts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Posts;
  const { allBlogArticles } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="cust-container"> <div class="w-2/3 mx-auto"> ${allBlogArticles.slice(0, HOMEPAGE_ARTICLE_LIMIT).map((article) => renderTemplate`<div class="mb-8"> <a${addAttribute(`/posts/${article.slug}`, "href")}> <h2 class="text-4xl font-bold leading-[1.2]">${article.data.heading}</h2> <h3 class="text-2xl">${article.data.sub_heading}</h3> </a> <p class="text-md text-slate-700 mb-5">Posted by: ${article.data.author} on ${formatDate(article.data.pubdate)}</p> <hr> </div>`)} </div> </div> ` })}`;
}, "/home/fke/Documents/GitHub/sample-astro-blog/src/components/posts.astro", void 0);

const $$Astro$2 = createAstro();
const $$Pagination = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { currentPage, disablePrevious, disableNext } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="cust-container mb-5"> <div class="w-2/3 mx-auto"> <div class="flex justify-between"> <a${addAttribute(`/posts?page=${currentPage - 1}`, "href")}${addAttribute(`${disablePrevious ? "inline-block bg-gray-100 px-3 py-2 text-gray-400 rounded-lg pointer-events-none" : ""} px-7 py-2 text-white bg-slate-800 rounded-md`, "class")}>Prev</a> <a${addAttribute(`/posts?page=${currentPage + 1}`, "href")}${addAttribute(`${disableNext ? "inline-block bg-gray-100 px-3 py-2 text-gray-400 rounded-lg pointer-events-none" : ""} px-7 py-2 text-white bg-slate-800 rounded-md`, "class")}>Next</a> </div> </div> </div>`;
}, "/home/fke/Documents/GitHub/sample-astro-blog/src/components/pagination.astro", void 0);

const $$Astro$1 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const currentPage = +Astro2.url.searchParams.get("page") || 1;
  const allBlogArticles = (await getCollection("blog")).sort((a, b) => b.data.pubdate.valueOf() - a.data.pubdate.valueOf());
  const totalPages = Math.ceil(allBlogArticles.length / ARTICLES_PER_PAGE);
  const articlesForPage = allBlogArticles.slice((currentPage - 1) * ARTICLES_PER_PAGE);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div${addAttribute(`bg-[url('/img/bg-post.jpg')] hero-main-div`, "class")}> ${renderComponent($$result2, "HeroContent", $$HeroContent, { "hero_heading": "Posts", "hero_sub_heading": "My posts" })} </div> ${renderComponent($$result2, "Posts", $$Posts, { "allBlogArticles": articlesForPage })} ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "disablePrevious": currentPage === 1, "disableNext": currentPage === totalPages })} ` })}`;
}, "/home/fke/Documents/GitHub/sample-astro-blog/src/pages/posts/index.astro", void 0);

const $$file$1 = "/home/fke/Documents/GitHub/sample-astro-blog/src/pages/posts/index.astro";
const $$url$1 = "/posts";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const allBlogArticles = (await getCollection("blog")).sort((a, b) => b.data.pubdate.valueOf() - a.data.pubdate.valueOf());
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div${addAttribute(`bg-[url('/img/bg-index.jpg')] hero-main-div`, "class")}> ${renderComponent($$result2, "HeroContent", $$HeroContent, { "hero_heading": "My Blog", "hero_sub_heading": "A Blog Theme by Karlo Espanol" })} </div> ${renderComponent($$result2, "Posts", $$Posts, { "allBlogArticles": allBlogArticles })} <div class="cust-container mb-5"> <div class="w-2/3 mx-auto"> <a href="/posts" class="px-7 py-3 text-white bg-slate-800 rounded-md">See all Posts</a> </div> </div> ` })}`;
}, "/home/fke/Documents/GitHub/sample-astro-blog/src/pages/index.astro", void 0);

const $$file = "/home/fke/Documents/GitHub/sample-astro-blog/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
