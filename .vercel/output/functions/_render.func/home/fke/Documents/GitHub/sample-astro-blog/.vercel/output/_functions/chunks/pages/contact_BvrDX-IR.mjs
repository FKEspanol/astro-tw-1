/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead, e as addAttribute } from '../astro_Dp4IjtIH.mjs';
import 'kleur/colors';
import { a as $$Layout } from './__DzIJWGHG.mjs';
import { $ as $$HeroContent } from './about_CsJndSKN.mjs';

const $$Astro = createAstro();
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div${addAttribute(`bg-[url('/img/bg-contact.jpg')] hero-main-div`, "class")}> ${renderComponent($$result2, "HeroContent", $$HeroContent, { "hero_heading": "Contact Me", "hero_sub_heading": "Have questions? I have answers." })} </div> ` })}`;
}, "/home/fke/Documents/GitHub/sample-astro-blog/src/pages/contact.astro", void 0);

const $$file = "/home/fke/Documents/GitHub/sample-astro-blog/src/pages/contact.astro";
const $$url = "/contact";

export { $$Contact as default, $$file as file, $$url as url };
