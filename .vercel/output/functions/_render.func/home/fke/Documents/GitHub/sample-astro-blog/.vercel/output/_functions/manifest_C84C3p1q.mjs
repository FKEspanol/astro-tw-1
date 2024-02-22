import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import './chunks/astro_CRSIYrCs.mjs';
import 'clsx';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.KC8_OowN.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.KC8_OowN.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.KC8_OowN.css"}],"routeData":{"route":"/posts","isIndex":true,"type":"page","pattern":"^\\/posts\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/index.astro","pathname":"/posts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.KC8_OowN.css"},{"type":"inline","content":"p{margin-top:1.25rem;margin-bottom:1.25rem;font-size:1.125rem;line-height:1.75rem}\n"}],"routeData":{"route":"/posts/[...slug]","isIndex":false,"type":"page","pattern":"^\\/posts(?:\\/(.*?))?\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/posts/[...slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.KC8_OowN.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/fke/Documents/GitHub/sample-astro-blog/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/home/fke/Documents/GitHub/sample-astro-blog/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/home/fke/Documents/GitHub/sample-astro-blog/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/home/fke/Documents/GitHub/sample-astro-blog/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/home/fke/Documents/GitHub/sample-astro-blog/src/pages/posts/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/contact.astro":"chunks/pages/contact_KfW1qCly.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_E9OvYrQ3.mjs","\u0000@astrojs-manifest":"manifest_C84C3p1q.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_68Z8BGDL.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_BE7mWE6k.mjs","\u0000@astro-page:src/pages/contact@_@astro":"chunks/contact_DaREH5pj.mjs","\u0000@astro-page:src/pages/posts/index@_@astro":"chunks/index_D3SwaKTY.mjs","\u0000@astro-page:src/pages/posts/[...slug]@_@astro":"chunks/_.._CfDEPiYo.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_C7kDb0JU.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/dinosaurs-are-extinct-today.md?astroContentCollectionEntry=true":"chunks/dinosaurs-are-extinct-today_B8GNDvXp.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/failure-is-not-an-option.md?astroContentCollectionEntry=true":"chunks/failure-is-not-an-option_D-hR5Eju.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/i-believe-human-has-a-finite-number.md?astroContentCollectionEntry=true":"chunks/i-believe-human-has-a-finite-number_D6Bec8Wm.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/man-must-explore.md?astroContentCollectionEntry=true":"chunks/man-must-explore_BEnROMkU.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/science-has-not-yet-mastered-prophecy.md?astroContentCollectionEntry=true":"chunks/science-has-not-yet-mastered-prophecy_D4rgjhL6.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/the-dreams-of-yesterday-are-the-hopes-of-tommorrow.md?astroContentCollectionEntry=true":"chunks/the-dreams-of-yesterday-are-the-hopes-of-tommorrow_BTDxwvKq.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/dinosaurs-are-extinct-today.md?astroPropagatedAssets":"chunks/dinosaurs-are-extinct-today_C97bzto0.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/failure-is-not-an-option.md?astroPropagatedAssets":"chunks/failure-is-not-an-option_CF_E5cUl.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/i-believe-human-has-a-finite-number.md?astroPropagatedAssets":"chunks/i-believe-human-has-a-finite-number_CYs3Twxf.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/man-must-explore.md?astroPropagatedAssets":"chunks/man-must-explore_BzFTggpm.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/science-has-not-yet-mastered-prophecy.md?astroPropagatedAssets":"chunks/science-has-not-yet-mastered-prophecy_DUmIhcI5.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/the-dreams-of-yesterday-are-the-hopes-of-tommorrow.md?astroPropagatedAssets":"chunks/the-dreams-of-yesterday-are-the-hopes-of-tommorrow_DSM3C5-Y.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/dinosaurs-are-extinct-today.md":"chunks/dinosaurs-are-extinct-today_BEGIdRh0.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/failure-is-not-an-option.md":"chunks/failure-is-not-an-option_Chc5CPbz.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/i-believe-human-has-a-finite-number.md":"chunks/i-believe-human-has-a-finite-number_CSYYAvsj.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/man-must-explore.md":"chunks/man-must-explore_BgIsCAzI.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/science-has-not-yet-mastered-prophecy.md":"chunks/science-has-not-yet-mastered-prophecy_D6x8cG-u.mjs","/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/the-dreams-of-yesterday-are-the-hopes-of-tommorrow.md":"chunks/the-dreams-of-yesterday-are-the-hopes-of-tommorrow_waN3JzAj.mjs","astro:scripts/before-hydration.js":""},"assets":["/_astro/about.KC8_OowN.css","/favicon.svg","/img/bg-about.jpg","/img/bg-contact.jpg","/img/bg-index.jpg","/img/bg-post.jpg","/img/posts/01.jpg","/img/posts/02.jpg","/img/posts/03.jpg","/img/posts/04.jpg","/img/posts/05.jpg","/img/posts/06.jpg"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
