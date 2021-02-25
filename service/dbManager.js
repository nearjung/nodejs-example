const createOrUpdate = async function (model, newItem, where) {
	return await model
		.findOne({ where: where })
		.then(async function (foundItem) {
			if (!foundItem) {
				return await model
					.create(newItem)
					.then(function (item) {
						console.log("*dbManager create: " + item);
						return { item: item, created: true };
					}).catch(function (err) {
						console.error(err);
					});
			} else {
				console.log("*Strart dbManager update.. ");
				console.log(newItem);
				return await model
					.update(newItem, { where: where })
					.then(function (item) {
						console.log("*dbManager update: " + item);
						return { item: item, created: false }
					}).catch(function (err) {
						console.error(err);
					});
			}
		});
}

module.exports = { createOrUpdate };