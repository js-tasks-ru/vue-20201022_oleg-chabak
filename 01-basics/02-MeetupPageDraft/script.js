import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    meetup: null,
    agendaItemIcons,
    agendaItemTitles,
  },
  mounted() {
    // Требуется получить данные митапа с API
    this.getMeetup();
  },

  computed: {
    imageSrc() {
      return this.meetup ? getMeetupCoverLink(this.meetup) : '';
    },
    dateFormatted() {
      let options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(this.meetup.date).toLocaleString('ru', options);
    },
  },

  methods: {
    getMeetup() {
      fetch(`${API_URL}/meetups/${MEETUP_ID}`)
        .then((response) => response.json())
        .then((result) => (this.meetup = result));
    },
  },
});
