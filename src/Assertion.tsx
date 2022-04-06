import React from "react";
import flagMessages from "./flagMessages";
import _ from "lodash";

const scenarios = [
  {
    messages: [
      { id: 1, from: "John Doe", flagged: true, subject: "Please Read Me" },
      { id: 2, from: "Marry Jane", flagged: true, subject: "Not so important..." },
      { id: 3, from: "Bill Bob", flagged: false, subject: "Spam Content" },
    ],
    expected: [
      { id: 1, from: "John Doe", flagged: false, subject: "Please Read Me" },
      { id: 2, from: "Marry Jane", flagged: false, subject: "Not so important..." },
      { id: 3, from: "Bill Bob", flagged: false, subject: "Spam Content" },
    ],
    selectedIds: [1, 2],
    text: "If all selected messages are flagged, unflag them.",
  },
  {
    messages: [
      { id: 1, from: "John Doe", flagged: false, subject: "Please Read Me" },
      { id: 2, from: "Marry Jane", flagged: false, subject: "Not so important..." },
      { id: 3, from: "Bill Bob", flagged: false, subject: "Spam Content" },
    ],
    expected: [
      { id: 1, from: "John Doe", flagged: true, subject: "Please Read Me" },
      { id: 2, from: "Marry Jane", flagged: true, subject: "Not so important..." },
      { id: 3, from: "Bill Bob", flagged: true, subject: "Spam Content" },
    ],
    selectedIds: [1, 2, 3],
    text: "If none selected messages are flagged, flag them.",
  },
  {
    messages: [
      { id: 1, from: "John Doe", flagged: true, subject: "Please Read Me" },
      { id: 2, from: "Marry Jane", flagged: true, subject: "Not so important..." },
      { id: 3, from: "Bill Bob", flagged: false, subject: "Spam Content" },
    ],
    expected: [
      { id: 1, from: "John Doe", flagged: true, subject: "Please Read Me" },
      { id: 2, from: "Marry Jane", flagged: true, subject: "Not so important..." },
      { id: 3, from: "Bill Bob", flagged: true, subject: "Spam Content" },
    ],
    selectedIds: [2, 3],
    text: "If any selected messages are not flagged, flag them.",
  },
];

export function Assertion() {
  const results = scenarios.map((scenario) => {
    const result = flagMessages(scenario.messages, scenario.selectedIds);

    console.log(result);

    if (_.isEqual(result, scenario.expected)) {
      return (
        <React.Fragment>
          <div className="flex bg-green-100 rounded-lg p-4 mb-2 text-sm text-green-700 flex items-center" role="alert">
            <i className="fa-solid fa-circle-check mr-3 text-base"></i>
            <div>{scenario.text}</div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="flex bg-red-100 rounded-lg p-4 mb-2 text-sm text-red-700 flex items-center" role="alert">
            <i className="fa-solid fa-circle-exclamation mr-3 text-base"></i>
            <div>{scenario.text}</div>
          </div>
        </React.Fragment>
      );
    }
  });

  return <div className="mt-4">{results}</div>;
}
