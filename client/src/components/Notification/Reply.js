import React from 'react'
import { Paper } from '@mui/material';

export default function Reply() {
  return (
    <Paper className="p-6 mb-6 ml-6 lg:ml-12 text-base" elevation={2}>
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="Jese Leos"
            />
            Jese Leos
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time pubdate datetime="2022-02-12" title="February 12th, 2022">
              Feb. 12, 2022
            </time>
          </p>
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">
        Much appreciated! Glad you liked it ☺️
      </p>
      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center text-sm bg-[#1e2a3a] text-gray-500 hover:underline dark:text-gray-400"
        >
          <svg
            aria-hidden="true"
            className="mr-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          Reply
        </button>
      </div>
    </Paper>
  );
}
