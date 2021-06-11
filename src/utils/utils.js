/**
 * 
 * @param {object} dataList The datalist contain a list of CVE or Phone Model with attribute of false. Once user select a CVE or Phone Model, the attribute will be set as true.
 * @returns {array} Return the CVE or the Phone Model that is selected. In other word, the specific CVE or Phone Model that has true attribute.
 * 
 */
function getSelectedList(dataList) {
    return Object.keys(dataList).filter((key) => dataList[key] === true);
}



export { getSelectedList };
