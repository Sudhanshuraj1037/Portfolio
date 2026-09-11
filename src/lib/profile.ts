/**
 * Centralized profile / contact configuration — single source of truth
 * for every social/professional link, the email address, and CV file
 * paths, used across Contact, Footer, and the Connect list.
 *
 * Verified real: github.
 * Placeholder, not yet real: email (see TODO — same placeholder that
 * already existed in Contact.tsx before this file, just centralized).
 * Not yet available at all: everything else below — intentionally left
 * empty rather than invented. Paste in the real URL and it renders as
 * a live link with zero other code changes.
 */

export const PROFILE_LINKS = {
  github: "https://github.com/Sudhanshuraj1037",
  // TODO(sudhanshu): replace with your real email before deploying.
  email: "your.email@example.com",
  // TODO(sudhanshu): none of these are verified yet — provide the real
  // profile URL for each.
  linkedin: "",
  geeksforgeeks: "",
  kaggle: "",
  instagram: "",
  leetcode: "",
};

// TODO(sudhanshu): place the real files at these exact paths under
// public/ (i.e. public/cv/Sudhanshu_Raj_CV.pdf) and flip CV_READY to
// true in ConnectLinks.tsx once they exist.
export const CV_FILES = {
  pdf: "/cv/Sudhanshu_Raj_CV.pdf",
  docx: "/cv/Sudhanshu_Raj_CV.docx",
};
