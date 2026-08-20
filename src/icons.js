/* Monoline icon set, shared with roniam.dev and the other dojos.
   Streams keep declaring an emoji in `icon:` because that is the authoring
   shorthand; ico() maps it to a symbol at render time. Anything unmapped falls
   through to the emoji, so a new stream is never iconless. */
const ICON_MAP = {
  // ML Dojo streams
  '\u{1F9ED}':'i-layers',    // compass, orientation
  '\u{1F40D}':'i-code',      // snake, Python
  '\u{1F9EE}':'i-cpu',       // abacus, numerics
  '\u{1F4D0}':'i-layers',    // set square, linear algebra
  '\u{1F4C8}':'i-cycle',     // rising chart, calculus
  '\u{1F4C9}':'i-cycle',     // falling chart, logarithms
  '\u{1F3B2}':'i-atom',      // die, probability
  '\u{1F9F0}':'i-flask',     // toolbox
  '\u{1F916}':'i-cpu',       // robot, classic ML
  '✍':'i-book',         // writing hand, notation
  // shared with the other dojos, so a stream can move between them
  '\u{1F511}':'i-key','\u{1F512}':'i-lock','\u{1F513}':'i-lock','\u{1F6E1}':'i-shield',
  '\u{1F310}':'i-globe','\u{1F41E}':'i-bug','\u{1F50D}':'i-search','\u{1F4DA}':'i-book',
  '\u{1F4D6}':'i-book','\u{1F4BB}':'i-terminal','⚡':'i-cpu','\u{1F3E0}':'i-columns',
  '\u{1F5C4}':'i-database','\u{1F680}':'i-rocket','\u{1F4E6}':'i-package','⚙':'i-gear',
  '\u{1F527}':'i-wrench','\u{1F6E0}':'i-wrench','\u{1F9F0}':'i-flask','\u{1F9EA}':'i-flask','\u{1F3AF}':'i-flask','\u{1F9E0}':'i-cpu',
};
function ico(e, cls) {
  if (!e) return '';
  const id = ICON_MAP[e] || ICON_MAP[e.replace(/️/g, '')];
  if (!id) return e;                       // unmapped: keep the emoji rather than nothing
  return `<svg class="ic ${cls || ''}" aria-hidden="true" focusable="false"><use href="#${id}"/></svg>`;
}
