export const CHROME_WEB_STORE_URL =
    'https://chromewebstore.google.com/detail/excali-organizer/ofhbmolegnmdaoblohnojkdmijemmohe';

export const openChromeWebStore = (): void => {
    window.open(CHROME_WEB_STORE_URL, '_blank', 'noopener,noreferrer');
};
