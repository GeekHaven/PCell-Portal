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
      
    </Paper>
  );
}
