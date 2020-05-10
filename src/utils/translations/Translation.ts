import { ResourceLanguage } from 'i18next';

interface Translation extends ResourceLanguage {
    translations: {
        'come-later': string;
        'under-construction': string;
        'page-not-found': string;
        'go-back': string;
        'go-home': string;
    };
}

export default Translation;
