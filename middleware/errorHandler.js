module.exports = (error, req, res, next) => {
	console.log(error)

	next(error);

	return res.status(500).send({
		message: `something failed:... ${error.message}`,
		success: false
	});
};
