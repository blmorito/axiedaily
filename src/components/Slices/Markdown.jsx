import React from "react";

export const Bold = ({ children }) => (
  <strong className="text-text-main">{children}</strong>
);

export const Text = ({ children }) => (
  <p className="mb-8 text-text-main">{children}</p>
);

export const Heading1 = ({ children }) => (
  <h1 className="mb-3 text-text-main">{children}</h1>
);
