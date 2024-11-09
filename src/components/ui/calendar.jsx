import React from "react";

// components/Card.js
export const Card = ({ children, className = '' }) => {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
        {children}
      </div>
    );
  };
  
  // components/Tabs.js
  export const Tabs = ({ children, activeTab, onTabChange }) => {
    return (
      <div className="w-full">
        <div className="flex border-b border-gray-200 mb-4">
          {React.Children.map(children, (child) => {
            if (child.type === Tab) {
              return React.cloneElement(child, {
                active: activeTab === child.props.value,
                onClick: () => onTabChange(child.props.value)
              });
            }
            return child;
          })}
        </div>
      </div>
    );
  };
  
  export const Tab = ({ children, value, active, onClick }) => {
    return (
      <button
        className={`px-4 py-2 mr-2 ${
          active
            ? 'border-b-2 border-blue-500 text-blue-500'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  // components/Alert.js
  export const Alert = ({ children, type = 'info' }) => {
    const bgColors = {
      info: 'bg-blue-50 border-blue-200',
      success: 'bg-green-50 border-green-200',
      warning: 'bg-yellow-50 border-yellow-200',
      error: 'bg-red-50 border-red-200'
    };
  
    return (
      <div className={`p-4 rounded-lg border ${bgColors[type]} mb-4`}>
        {children}
      </div>
    );
  };
  
  // components/Button.js
  export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const variants = {
      primary: 'bg-blue-500 hover:bg-blue-600 text-white',
      secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
      success: 'bg-green-500 hover:bg-green-600 text-white',
      danger: 'bg-red-500 hover:bg-red-600 text-white'
    };
  
    return (
      <button
        className={`px-4 py-2 rounded-lg transition-colors ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  // components/Input.js
  export const Input = ({ label, error, ...props }) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  };
  
  // components/Select.js
  export const Select = ({ label, options, error, ...props }) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <select
          className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  };
  
  // components/Table.js
  export const Table = ({ headers, data }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  // components/SearchBar.js
  export const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
    return (
      <div className="relative mb-4">
        <input
          type="text"
          className="w-full px-10 py-2 border rounded-lg"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    );
  };
  
  // components/Badge.js
  export const Badge = ({ children, variant = 'default' }) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
    };
  
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}
      >
        {children}
      </span>
    );
  };
  
  // components/Modal.js
  export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black opacity-40" onClick={onClose}></div>
          <div className="relative bg-white rounded-lg max-w-lg w-full mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  };
  
  // components/Loading.js
  export const Loading = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  };
  
  // components/FileUpload.js
  export const FileUpload = ({ label, onChange, accept, multiple = false }) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  onChange={onChange}
                  accept={accept}
                  multiple={multiple}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              {multiple ? 'Files up to 10MB' : 'File up to 10MB'}
            </p>
          </div>
        </div>
      </div>
    );
  };