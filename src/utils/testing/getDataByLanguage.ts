import { i18n } from 'utils';
import { Locale } from 'utils/locales';

const customGetDataByLanguage = (language: string): Locale =>
    i18n.getDataByLanguage(language) as any;

export default customGetDataByLanguage;
