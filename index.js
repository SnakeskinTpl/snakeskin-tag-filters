const
	Snakeskin = require('snakeskin'),
	Sugar = require('sugar'),
	$C = require('collection.js');

const filters = {
	tag: [],
	tagName: [],
	attrKey: [],
	attrValue: []
};

function run(type, ...args) {
	if (type === 'tag') {
		$C(filters[type]).forEach(({handler, validator}) => {
			if (validator(...args)) {
				handler(...args);
			}
		});

		return;
	}

	const [name, ...rest] = args;

	return $C(filters[type]).reduce(
		(res, {handler, validator}) => {
			if (Sugar.Object.isFunction(validator) && !validator(res, ...rest)) {
				return res;
			}

			return handler(res, ...rest) || res;
		},

		name
	);
}

Snakeskin.importFilters($C(filters).reduce(
	(res, v, name) => {
		res[`${name}Filter`] = (...args) => run(name, ...args);
		return res;
	},

	{}
));

function getTagValidator(validator) {
	if (Sugar.Object.isString(validator)) {
		return ({name}) => validator === name;
	}

	if (Sugar.Object.isRegExp(validator)) {
		return ({name}) => validator.test(name);
	}

	if (validator == null) {
		return () => true;
	}

	if (!Object.isFunction(validator)) {
		throw new TypeError(`Validator must be a string, function or RegExp, got ${validator}`);
	}

	return validator;
}

['tag', 'tagName'].forEach((type) => {
	module.exports[type] = (handler, validator) => {
		filters[type].push({handler, validator: getTagValidator(validator)});
	};
});

['attrKey', 'attrValue'].forEach((type) => {
	module.exports[type] = (handler) => {
		filters[type].push({handler});
	};
});
