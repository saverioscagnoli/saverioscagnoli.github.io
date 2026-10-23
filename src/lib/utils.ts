import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(birthday: Date, now = new Date()): number {
  let age = now.getFullYear() - birthday.getFullYear();
  let monthDiff = now.getMonth() - birthday.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < birthday.getDate())
  ) {
    age--;
  }

  return age;
}

export function random(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function randomInt(min: number, max: number): number {
  return Math.floor(random(min, max + 1));
}

export function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
