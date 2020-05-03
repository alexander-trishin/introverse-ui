import { ResourceLanguage } from 'i18next';

interface Locale extends ResourceLanguage {
    translations: {
        'under-construction': string;
        'page-not-found': string;
        'go-back': string;
        'go-home': string;
    };
}

export default Locale;
