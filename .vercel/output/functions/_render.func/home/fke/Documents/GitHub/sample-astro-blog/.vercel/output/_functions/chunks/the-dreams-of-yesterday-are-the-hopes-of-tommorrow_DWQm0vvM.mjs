import { d as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_Dp4IjtIH.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman’s earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>\n<p>Science cuts two ways, of course; its products can be used for both good and evil. But there’s no turning back from science. The early warnings about technological dangers also come from science.</p>\n<p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>\n<p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That’s how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>\n<p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.\nThe Final Frontier</p>\n<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>\n<p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>\n<pre class=\"astro-code github-dark\" style=\"background-color:#24292e;color:#e1e4e8; overflow-x: auto;\" tabindex=\"0\"><code><span class=\"line\"><span>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</span></span></code></pre>\n<p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.\nReaching for the Stars</p>\n<p>As we got further and further away, it [the Earth] diminished in size. Finally it shrank to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object looked so fragile, so delicate, that if you touched it with a finger it would crumble and fall apart. Seeing this has to change a man.\nDemo Image To go places and do things that have never been done before – that’s what living is all about.</p>\n<p>Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before.</p>\n<p>As I stand out here in the wonders of the unknown at Hadley, I sort of realize there’s a fundamental truth to our nature, Man must explore, and this is exploration at its greatest.</p>";

				const frontmatter = {"heading":"The dreams of yesterday are the hopes of today and the reality of tomorrow.","sub_heading":"Live by meaning and purpose","author":"Kellin Covel","pubdate":"2024-02-20T00:00:00.000Z","img":"06.jpg","slug":"Live-by-meaning-and-purpose"};
				const file = "/home/fke/Documents/GitHub/sample-astro-blog/src/content/blog/the-dreams-of-yesterday-are-the-hopes-of-tommorrow.md";
				const url = undefined;
				function rawContent() {
					return "\nNever in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.\n\nScience cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.\n\nWhat was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.\n\nA Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.\n\nFor those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.\nThe Final Frontier\n\nThere can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.\n\nThere can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.\n\n    The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.\n\nSpaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.\nReaching for the Stars\n\nAs we got further and further away, it [the Earth] diminished in size. Finally it shrank to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object looked so fragile, so delicate, that if you touched it with a finger it would crumble and fall apart. Seeing this has to change a man.\nDemo Image To go places and do things that have never been done before – that’s what living is all about.\n\nSpace, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before.\n\nAs I stand out here in the wonders of the unknown at Hadley, I sort of realize there’s a fundamental truth to our nature, Man must explore, and this is exploration at its greatest.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
