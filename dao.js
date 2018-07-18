const request = require('request');
const utils = require('./utils');
const constants = require('./constants');

/**
 * Actual XHR to get list of open trucks.
 */
loadData = (offset = 0) => {
    const dayOfWeek = utils.getCurrentDay();
    const currentTime = utils.getCurrentTime();

    const options = {
        $$app_token: constants.APP_TOKEN,
        $limit: constants.LIMIT,
        $offset: offset,
        $order: constants.ORDER_BY,
        $where: `(start24<'${currentTime}' AND end24>'${currentTime}')`,
        dayorder: dayOfWeek
    };

    return new Promise((resolve, reject) => {
        request(
            {
                url: constants.URL,
                qs: options
            },
            (error, response, body) => {
                if (error) {
                    reject({
                        code: response.statusCode,
                        error: error
                    });
                }

                if (response && response.statusCode === constants.STATUS_OK) {
                    resolve(body);
                } else {
                    reject({
                        code: response.statusCode,
                        error: response.statusMessage
                    });
                }
            }
        );
    });
};

module.exports = {
    loadData: loadData
};
