import downloadsJson from './downloads.json';

/**
 * Fetch all download items
 * @public
 */
export async function getDownloadsApi() {
    // here you would normally make an API call
    return downloadsJson;
}
