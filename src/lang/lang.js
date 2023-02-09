import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

const DEFAULT_LANG = "en-GB";

const locales = {
  bn: require("./i18n/bn.json"),
  en: require("./i18n/en.json"),
  de: require("./i18n/de.json"),
  fr: require("./i18n/fr.json")
};


const numberFormats = {
    'CM': {
        currency: {
            style: 'currency', currency: 'XAF'
        },
        currencyNoCents: {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0, // set fraction digits to 0 to remove cents
            maximumFractionDigits: 0
        }
    },
    'en-US': {
        currency: {
            style: 'currency',
            currency: 'USD'
        }
    },
    'ja-JP': {
        currency: {
            style: 'currency',
            currency: 'JPY',
            currencyDisplay: 'symbol'
        }
    }

}

const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales,
    numberFormats
});

export default i18n;
