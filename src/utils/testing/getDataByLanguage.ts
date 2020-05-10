import { i18n } from 'utils';
import { Translation } from 'utils/translations';

const customGetDataByLanguage = (language: string): Translation =>
    i18n.getDataByLanguage(language) as any;

export default customGetDataByLanguage;
