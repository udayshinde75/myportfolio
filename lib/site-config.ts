/**
 * Site copy that isn't stored in the database.
 *
 * Everything else on the public site (bio, projects, jobs, education,
 * services, social links) comes from MongoDB via the /api routes and is
 * edited from the dashboard. Change these values to tweak the hero and
 * footer wording without touching any components.
 */
export const siteConfig = {
  /** Shown big in the hero and in the nav. */
  firstName: "Uday",
  lastName: "Shinde",

  /** Fallback role if no job is found in the database. */
  role: "Software Engineer",

  /** Italic accent line under the name in the hero. */
  tagline: "building software that works close to the hardware",

  /** Short statement at the bottom-left of the hero. */
  statement: "I'm a software engineer who turns hard problems into reliable, efficient code.",

  /** Where you are. Drives the hero location label and the live clock. */
  city: "Pune",
  country: "India",
  timeZone: "Asia/Kolkata",

  /** Availability note next to the clock. Set to "" to hide it. */
  availability: "Open to remote & freelance work",

  /** Local image used for the portrait in the about section. */
  portrait: "/assets/images/myprofile.png",
} as const;

export const fullName = `${siteConfig.firstName} ${siteConfig.lastName}`;
