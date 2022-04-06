import React, { useState } from "react";
import flagMessages from "./flagMessages";
import { Message } from "./types";

const baseMessages: Message[] = [
  { id: 1, from: "John Doe", flagged: false, subject: "Please Read Me" },
  { id: 2, from: "Marry Jane", flagged: true, subject: "Not so important..." },
  { id: 3, from: "Bill Bob", flagged: false, subject: "Spam Content" },
  { id: 4, from: "John Josherson", flagged: true, subject: "RE: Your Request" },
  { id: 5, from: "Kate Katerson", flagged: true, subject: "Just checking in" },
];

export default function Table() {
  const [messages, setMessages] = useState(baseMessages);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const onSelect = (id: number) => {
    selectedIds.includes(id) ? setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id)) : setSelectedIds([...selectedIds, id]);
  };

  const selectAll = () => {
    if (messages.length !== selectedIds.length) {
      return setSelectedIds(messages.map((message) => message.id));
    }
    setSelectedIds([]);
  };

  const onFlag = () => {
    const newMessages = flagMessages(messages, selectedIds);

    setMessages(newMessages);
  };

  return (
    <React.Fragment>
      <div className="text-right mb-3">
        <button
          className="border-2 border-orange-400 text-orange-400 px-4 py-2 rounded-md text-1xl font-medium hover:bg-orange-400 transition duration-300 hover:text-white text-right
          disabled:border-slate-300 disabled:text-slate-300 disabled:border-slate-20 disabled:bg-white"
          onClick={() => onFlag()}
          disabled={selectedIds.length === 0}
        >
          <span className="fa fa-flag mr-2"></span>
          Flag / Unflag
        </button>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                          checked={selectedIds.length === messages.length}
                          onChange={() => selectAll()}
                        />
                        <label htmlFor="checkbox-all" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th></th>
                    <th scope="col" className="py-3 pl-2 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                      From
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                      Subject
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messages.map((message) => (
                    <tr className="hover:bg-gray-100 cursor-pointer" key={message.id} onClick={() => onSelect(message.id)}>
                      <td className="p-4 w-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                            checked={selectedIds.includes(message.id)}
                            onChange={() => onSelect(message.id)}
                          />
                        </div>
                      </td>
                      <td>{message.flagged && <span className="fa fa-flag ml-4 mr-0 text-orange-400"></span>}</td>
                      <td className="py-4 pl-2 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{message.from}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">{message.subject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
