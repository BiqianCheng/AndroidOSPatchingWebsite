/* ---

    THIS IS A HELPER FUNCTION SET FILE THAT PROVIDE CLEAR CODEBASE AND USAGE FOR THE COMPONENTS

---*/

import data from "../json/data.json";

String.prototype.hashCode = function () {
    var hash = 0,
        i,
        chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

/**
 *
 * @param {object} dataList
 * The datalist contain a object that has CVE or Phone Model as key, and boolean as their associated value .
 * If the user select the CVE or Phone Model, the associated value will be set as true.
 * The incoming datatype should look something like this
 * ```
 * {...
 *  CVE-xxxx-xxx1: false
 *  CVE-xxxx-xxx2: true
 * }
 * ```
 * @returns {array}
 * Return the CVE or the Phone Model that is selected.
 * In other word, the specific CVE or Phone Model that has true value.
 *
 */
function getSelectedList(dataList) {
    return Object.keys(dataList).filter((key) => dataList[key] === true);
}

/**
 * Return the Phone model which has been patched by the specified CVE
 * @param {string} cveID The CVE specified by the user.
 * @returns {array} Return the phone models that has already been patched with cveID
 */

function getPhoneModelByCVE(cveID) {
    var cveItem = data.find((item) => item.CVEID === cveID);
    // console.log(cveItem.phoneModels.map((item) => item.phoneModel));
    return cveItem.phoneModels.map((item) => item.phoneModel);
}

/**
 *
 * @returns The whole dataset that contains the cve and phone model
 */

function getData() {
    return data;
}

/**
 *
 * @param {string[][]} patchdates A patchdates array for certain cve and phone model
 * @returns {Date} Return a data object that is the earliest date the CVE has been patched for the phone model
 */
function getMinDate(patchdates) {
    return new Date(
        Math.min.apply(
            null,
            patchdates
                .map((patchdate) => {
                    if (patchdate[1] === "notpatched" || patchdate[1] === "None") return undefined;
                    else return new Date(patchdate[1]);
                })
                .filter((item) => item !== undefined)
        )
    );
}

/**
 *
 * @param {string[][]} patchdates A patchdates array for certain cve and phone model
 * @returns {Date} Return a data object that is the lastest date the CVE has been patched for the phone model
 */
function getMaxDate(patchdates) {
    return new Date(
        Math.max.apply(
            null,
            patchdates
                .map((patchdate) => {
                    if (patchdate[1] === "notpatched" || patchdate[1] === "None") return undefined;
                    else return new Date(patchdate[1]);
                })
                .filter((item) => item !== undefined)
        )
    );
}
/**
 *
 * @param {Date} date A date object
 * @param {number} months The number that need to be increment or decrement on given date
 * @returns {Date} Return the result date object that has been incremented or decremented
 */
function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() !== d) {
        date.setDate(0);
    }
    console.log(date);
    return date;
}

function convertDataPoint(cveID, selectedPhone) {
    var firstFlag = true;

    var tempHashCode = "";

    var resultData = data.find((item) => cveID[0] === item.CVEID);

    var selectedPhonePatchInfo = resultData.phoneModels.find((item) => item.phoneModel === selectedPhone[0]);

    var sideLists = selectedPhonePatchInfo.patchdates.map((patchdate) => patchdate[0]);

    var maxDate = addMonths(getMaxDate(selectedPhonePatchInfo.patchdates), 2);

    var minDate = addMonths(getMinDate(selectedPhonePatchInfo.patchdates), -2);

    var dataPoints = selectedPhonePatchInfo.patchdates
        .map((dates) => {
            if (dates[1] === "notpatched" || dates[1] === "None") {
                return undefined;
            }

            if (firstFlag) {
                let result = {
                    eventId: String(resultData.CVEID.concat(dates[0])).hashCode(),
                    row: sideLists.indexOf(dates[0]) + 1,
                    start: new Date(dates[1]),
                    type: "point",
                    content: resultData.CVEID,
                };
                tempHashCode = String(resultData.CVEID.concat(dates[0])).hashCode();
                firstFlag = false;
                return result;
            } else {
                let result = {
                    eventId: String(resultData.CVEID.concat(dates[0])).hashCode(),
                    row: sideLists.indexOf(dates[0]) + 1,
                    start: new Date(dates[1]),
                    type: "point",
                    relation: {
                        before: tempHashCode,
                        curve: true,
                    },
                    content: resultData.CVEID,
                };
                tempHashCode = String(resultData.CVEID.concat(dates[0])).hashCode();
                return result;
            }
        })
        .filter((item) => item !== undefined);

    return { minDate, maxDate, sideLists, dataPoints };
}

export { getSelectedList, getPhoneModelByCVE, convertDataPoint, getData };
