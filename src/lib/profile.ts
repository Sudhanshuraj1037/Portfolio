/**
 * Centralized profile / contact configuration — single source of truth
 * for every social/professional link, the email address, and CV file
 * paths, used across Contact, Footer, and the Connect list.
 *
 * All values below are real and verified as of Phase C Step 0 Final
 * Correction. Instagram deliberately uses the clean canonical profile
 * URL, not the tracking-parameter version (?stkn=...) it was provided
 * with.
 */

export const PROFILE_LINKS = {
  github: "https://github.com/Sudhanshuraj1037",
  email: "sudhanshuraj1037@gmail.com",
  linkedin: "https://www.linkedin.com/in/sudhanshuraj1037",
  geeksforgeeks: "https://www.geeksforgeeks.org/profile/sudhanshuraj1037",
  kaggle: "https://www.kaggle.com/sudhanshuraj1037",
  instagram: "https://www.instagram.com/s_raj78___",
  leetcode: "https://leetcode.com/u/sudhanshuraj1037/",
};

export const CV_FILES = {
  pdf: "/cv/Sudhanshu_Raj_CV.pdf",
  docx: "/cv/Sudhanshu_Raj_CV.docx",
};
