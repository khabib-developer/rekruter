function isJson(str) {
	try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function validateActive(status) {
    if(status) {
        if(!isJson(status)) {
            return true
        }
        if(isJson(status)&& Date.now() - +JSON.parse(status).date > 0) {
            return false
        }
        return true
    }
    return false
}

module.exports = {
    isJson, validateActive
}