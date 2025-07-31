import React from 'react';

export const Input = (props: any) => (
  <div className="w-full">
    <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">
      {props.label} {props.required && <span className="text-red-500">*</span>}
    </label>
    <input
      {...props}
      id={props.name}
      className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
    />
  </div>
);

export const Select = (props: any) => (
    <div className="w-full">
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">
            {props.label} {props.required && <span className="text-red-500">*</span>}
        </label>
        <select
            {...props}
            id={props.name}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
        >
            {props.children}
        </select>
    </div>
);