import './css/styles.css';
import { markupList, markupInfo } from './js/markups.js';
import { fetchCountries } from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
let inputValue = '';

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const onInputValue = event => {
  inputValue = event.target.value.trim();

  if (inputValue.length < 1) {
    resetCountryList();
    resetCountryInfo();
    return;
  }
  //---------------от 2 вариантов до 10 - показываем список-------
  fetchCountries(inputValue)
    .then(params => {
      if (params.length > 1 && params.length < 11) {
        refs.countryList.innerHTML = markupList(params);
        resetCountryInfo();
      }
      //---------------если вариант 1 - показываем карточку-------
      if (params.length === 1) {
        refs.countryInfo.innerHTML = markupInfo(params);
        resetCountryList();
      }
      //---------------если больше 10 - очищаем + уведомление-----
      if (params.length > 11) {
        resetCountryList();
        resetCountryInfo();
        notificationMoreTenCountries();
      }
    })
    .catch(notificationError);
};
refs.inputEl.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));

const resetCountryList = () => (refs.countryList.innerHTML = '');
const resetCountryInfo = () => (refs.countryInfo.innerHTML = '');

const notificationMoreTenCountries = () =>
  Notify.info('Too many matches found. Please enter a more specific name.');

const notificationError = () => {
  Notify.failure('Oops, there is no country with that name');
  resetCountryList();
  resetCountryInfo();
};
