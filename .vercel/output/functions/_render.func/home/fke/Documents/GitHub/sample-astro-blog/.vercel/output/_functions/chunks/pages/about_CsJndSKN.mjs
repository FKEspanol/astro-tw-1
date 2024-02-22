/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, g as renderComponent, e as addAttribute } from '../astro_Dp4IjtIH.mjs';
import 'kleur/colors';
import { $ as $$Section, a as $$Layout } from './__DzIJWGHG.mjs';
import 'clsx';

const $$Astro$1 = createAstro();
const $$HeroContent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HeroContent;
  const { hero_heading, hero_sub_heading } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="cust-container relative z-[2]"> <div class="text-center text-white"> <h1 class="text-7xl font-bold mb-3">${hero_heading}</h1> <p class="text-xl">${hero_sub_heading}</p> </div> </div>`;
}, "/home/fke/Documents/GitHub/sample-astro-blog/src/components/heroContent.astro", void 0);

const $$Astro = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div${addAttribute(`bg-[url('/img/bg-about.jpg')] hero-main-div`, "class")}> ${renderComponent($$result2, "HeroContent", $$HeroContent, { "hero_heading": "About Me", "hero_sub_heading": "This is what I do." })} </div> ${renderComponent($$result2, "Section", $$Section, { "className": "my-10" }, { "default": ($$result3) => renderTemplate` <div class="cust-container"> <div class="w-4/6 mx-auto"> <p class="text-xl font-sans">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed quisquam ut perspiciatis, repudiandae nulla animi iste vel, praesentium repellendus molestias aliquid consequatur, earum rem qui error voluptates eius enim consequuntur!
</p> <br> <p class="text-xl font-sans">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex alias, earum consectetur quia natus ducimus voluptate explicabo, hic porro reprehenderit, quasi? Tenetur ipsum distinctio laboriosam perspiciatis officiis dolore, architecto id.
</p> <br> <p class="text-xl font-sans">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam inventore aspernatur repellendus incidunt adipisci modi voluptates recusandae iste eligendi, repudiandae corporis quod aut, optio! Explicabo quaerat unde voluptatem! Itaque, eum!
</p> </div> </div> ` })} ` })}`;
}, "/home/fke/Documents/GitHub/sample-astro-blog/src/pages/about.astro", void 0);

const $$file = "/home/fke/Documents/GitHub/sample-astro-blog/src/pages/about.astro";
const $$url = "/about";

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$About,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$HeroContent as $, about as a };
