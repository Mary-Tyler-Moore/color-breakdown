/**
 * Revoke a url if it is an object url.
 */
export function revokeIfObjectUrl(url: string) {
    if (new URL(url).protocol === 'blob:') {
        URL.revokeObjectURL(url);
    }
}

/**
 * When used as an `onload` listener for an image, this function will
 * revoke the image's source object url if it is an object url.
 */
export function revokeObjectUrlOnLoad(evt: Event) {
    const img = evt.target as HTMLImageElement;
    revokeIfObjectUrl(img.src);
}
