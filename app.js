const prompt = require('prompt');
const columnify = require('columnify');

const utils = require('./utils');
const dao = require('./dao');
const constants = require('./constants');

/**
 * The index of the result array
 * where to start the returned list of trucks.
 */
let offset = 0;

/**
 * Call load function to get list of trucks
 */
callLoadData = offset => {
    dao.loadData(offset)
        .then(response => {
            const data = JSON.parse(response);
            printResult(data);

            if (data.length < constants.LIMIT) {
                utils.displayMessage(constants.MESSAGE_FINISHED);
            } else {
                getUserInput();
            }
        })
        .catch(error => {
            utils.displayMessage(error);
        });
};

/**
 * Get's input from terminal
 */
getUserInput = () => {
    utils.printInstruction();

    prompt.get(['command'], (error, result) => {
        if (error) {
            return;
        }

        switch (result.command) {
            case constants.COMMAND_NEXT:
                offset = offset + constants.LIMIT;
                callLoadData(offset);
                break;
            case constants.COMMAND_EXIT:
                utils.displayMessage(constants.MESSAGE_APP_STOPPED);
                break;
            default:
                utils.displayMessage(constants.MESSAGE_INVALID_COMMAND);
                getUserInput();
        }
    });
};

/**
 * Prints list of truck information
 */
printResult = lists => {
    let result = [];
    if (Array.isArray(lists) && lists.length > 0) {
        lists.forEach((item, index) => {
            result.push({
                name: offset + (index + 1) + '. ' + item.applicant,
                location: item.location
            });
        });
    }

    console.log(columnify(result));
};

prompt.start();
callLoadData(offset);
