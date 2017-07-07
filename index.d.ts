interface Tag {
	name: string;
	attrs?: {[name: string]: any[]};
}

type Validator = string | RegExp | ((tag: Tag) => boolean);

/**
 * Регистрирует обработчик фильтра tagFilter
 *
 * @param handler — обработчик
 * @param {Validator} validator — валидатор, чтобы обработчик не вызывался на всех тегах подряд.
 * Может быть строкой (имя тега), регулярным выражением (которое будет матчиться по имени тега)
 * или функцией, возвращающей true/false
 */
export declare function tag(handler: (tag: Tag, ...rest: any[]) => void, validator: Validator): void;

/**
 * Регистрирует обработчик фильтра tagNameFilter.
 * Обработчик может вернуть строку, которая будет новым именем тега.
 *
 * @param handler — обработчик
 * @param {Validator} validator — валидатор, чтобы обработчик не вызывался на всех тегах подряд.
 * Может быть строкой (имя тега), регулярным выражением (которое будет матчиться по имени тега)
 * или функцией, возвращающей true/false
 */
export declare function tagName(handler: (name: string, ...rest: any[]) => string, validator: Validator): void;

/**
 * Регистрирует обработчик названия атрибута тега.
 * Обработчик может вернуть строку, которая будет названием атрибута.
 *
 * @param handler — обработчик
 */
export declare function attrKey(handler: (key: string, ...rest: any[]) => string): void;

/**
 * Регистрирует обработчик значение атрибута тега.
 * Обработчик может вернуть строку, которая будет новым значением атрибута.
 *
 * @param handler — обработчик атрибута
 */
export declare function attrValue(handler: (value: string, ...rest: any[]) => string): void;
