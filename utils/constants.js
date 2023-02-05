const URL_REG_EXP = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/i;
const UNIQUE_ERROR_CODE = 11000;

const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;
const STATUS_FORBIDDEN = 403;
const STATUS_NOT_FOUND = 404;
const STATUS_CONFLICT = 409;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const MESSAGE_ABSENT_FILM_ID = 'Фильм с таким id не найден';
const MESSAGE_NOT_AN_OWNER = 'Нельзя удалить чужой фильм';
const MESSAGE_INCORRECT_FILM_ID = 'Некорректный id фильма';

const MESSAGE_ABSENT_USER_ID = 'Нет пользователя с таким id';
const MESSAGE_INCORRECT_USER_DATA = 'Переданы некорректные данные';
const MESSAGE_INCORRECT_USER_ID = 'Некорректный id пользователя';
const MESSAGE_EMAIL_IS_NOT_UNIQUE = 'При регистрации указан email, который уже существует на сервере';

const MESSAGE_UNAUTHORIZED = 'Необходима авторизация';
const MESSAGE_SERVER_ERROR = 'На сервере произошла ошибка';
const MESSAGE_INCORRECT_URL = 'Некорректный формат ссылки';
const MESSAGE_INCORRECT_EMAIL = 'Некорректный формат email';
const MESSAGE_INCORRECT_CREDENTIALS = 'Неправильные почта или пароль';

module.exports = {
  URL_REG_EXP,
  UNIQUE_ERROR_CODE,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_FORBIDDEN,
  STATUS_NOT_FOUND,
  STATUS_CONFLICT,
  STATUS_INTERNAL_SERVER_ERROR,
  MESSAGE_ABSENT_FILM_ID,
  MESSAGE_NOT_AN_OWNER,
  MESSAGE_INCORRECT_FILM_ID,
  MESSAGE_ABSENT_USER_ID,
  MESSAGE_INCORRECT_USER_DATA,
  MESSAGE_INCORRECT_USER_ID,
  MESSAGE_EMAIL_IS_NOT_UNIQUE,
  MESSAGE_UNAUTHORIZED,
  MESSAGE_SERVER_ERROR,
  MESSAGE_INCORRECT_URL,
  MESSAGE_INCORRECT_EMAIL,
  MESSAGE_INCORRECT_CREDENTIALS,
};
