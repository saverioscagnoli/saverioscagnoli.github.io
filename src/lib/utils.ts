import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
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

export function rng(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function rngInt(min: number, max: number): number {
  return Math.floor(rng(min, max + 1));
}

export function pick<T>(arr: T[]): T{
  return arr[Math.floor(Math.random() * arr.length)];
}
