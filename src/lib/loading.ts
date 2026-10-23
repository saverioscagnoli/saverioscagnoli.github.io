const pending = new Set<Promise<unknown>>();

export function track<T>(promise: Promise<T>): Promise<T> {
  pending.add(promise);
  promise.finally(() => pending.delete(promise)).catch(() => {});

  return promise;
}

const nextFrame = () =>
  new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

export async function settled(): Promise<void> {
  await nextFrame();
  await nextFrame();

  while (pending.size > 0) {
    await Promise.allSettled([...pending]);
    await nextFrame();
  }
}

export function hideLoader(): void {
  const loader = document.getElementById("loader");

  if (!loader) {
    return;
  }

  loader.classList.add("done");
  loader.addEventListener("transitionend", () => loader.remove(), {
    once: true
  });
  setTimeout(() => loader.remove(), 1000);
}
