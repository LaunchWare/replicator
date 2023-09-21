import React from "react"
import { Decorator, Preview } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router";

export const reactRouterDecorator: Decorator = (Story) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};
