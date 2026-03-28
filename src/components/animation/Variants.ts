import { type Variants } from "motion/react";

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

export const scaleOut: Variants = {
  hidden: { opacity: 1, scale: 1 },
  show: { opacity: 1, scale: 1 },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.5 },
  },
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -8 },
  show: { opacity: 1, rotate: 0, transition: { duration: 0.6 } },
};

export const rotateOut: Variants = {
  hidden: { opacity: 1, rotate: 0 },
  show: { opacity: 1, rotate: 0 },
  exit: {
    opacity: 0,
    rotate: 10,
    transition: { duration: 0.5 },
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8 } },
};

export const combo: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8 },
  },
};
