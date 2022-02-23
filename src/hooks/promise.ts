import { shallowRef, watchEffect, Ref } from "vue";

/**
 * Call inside component `setup()`:
 *
 * ```ts
 * const welcomeVideoSrc = usePromise(() => useFirebase().storage().ref('welcome.mp4').getDownloadURL());
 *
 * const user = useFirebaseUser();
 * const imgSrc = usePromise(() => user.value && useFirebase().ref(`avatars/${user.value.uid}.jpg`).getDownloadURL());
 * ```
 */
export function usePromise<T>(fn: () => T | Promise<T>, refreshMs?: number) {
  const result = shallowRef<T | null>();
  let done = false;
  watchEffect((onInvalidate) => {
    let handle: NodeJS.Timeout;
    const tick = async () => {
      try {
        const value = await fn();
        if (done) {
          return;
        }
        result.value = value;
        if (refreshMs) {
          handle = setTimeout(() => {
            void tick();
          }, refreshMs);
        }
      } catch (error) {
        result.value = null;
        throw error;
      }
    };
    void tick();
    onInvalidate(() => {
      done = true;
      clearTimeout(handle);
    });
  });
  return result;
}

export function refToPromise<T = { isLoading?: true }>(
  ref: Ref<T>,
  filterFn = (value: T | { isLoading?: true }) =>
    value !== undefined && !("isLoading" in value && value.isLoading)
) {
  return new Promise((resolve) => {
    watchEffect(() => {
      const value = ref.value;
      if (filterFn(value)) {
        resolve(value);
      }
    });
  });
}
