function prepareStackTrace(error, structuredStackTrace) {
	var trace, fileName;
	try {
		trace = structuredStackTrace[0];
		
		fileName = trace.getFileName();
	} catch (e) {
		fileName = trace.getFileName();
	}
	const retVal = {
		// method name
		func: trace.getMethodName() || trace.getFunctionName() || '<anonymous>',
		// file name
		file: fileName,
		// line number
		lineNumber: trace.getLineNumber(),
		// column number
		column: trace.getColumnNumber()
	};
	return "at "+retVal.func+" ("+retVal.file+":"+retVal.lineNumber+":"+retVal.column+")";
}

function getTrace(caller) {
	var original = Error.prepareStackTrace,
		error = {};
	Error.captureStackTrace(error, caller || getTrace);
	Error.prepareStackTrace = prepareStackTrace;
	var stack = error.stack;
	Error.prepareStackTrace = original;
	return stack;
}

module.exports = getTrace;
