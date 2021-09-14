import { shallowRef, watchEffect } from 'vue';
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
export function usePromise(fn, refreshMs) {
    const result = shallowRef();
    let done = false;
    watchEffect((onInvalidate) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let handle;
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
            }
            catch (error) {
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
export function refToPromise(ref, filterFn = (value) => value !== undefined && !('isLoading' in value && value.isLoading)) {
    return new Promise((resolve) => {
        watchEffect(() => {
            const value = ref.value;
            if (filterFn(value)) {
                resolve(value);
            }
        });
    });
}
