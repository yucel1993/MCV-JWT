"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// dateToLocaleString(date:Date):

module.exports = function (dateData) {
  return dateData.toLocaleString("de-DE", {
    hour12: false,
  });
};
