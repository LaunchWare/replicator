import React, { FC, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import { useModal } from "../Modal";
import mdx from "./Modal.mdx";

import "./css/modal.css";
import { useRoutedModal } from "./hooks/useRoutedModal";

export const DefaultModal = () => {
  const { modal, isVisible, setVisibility } = useModal(() => <p>I'm in a modal</p>);
  return (
    <>
      <button type="button" onClick={() => setVisibility(true)}>
        Do Something
      </button>
      {modal}
    </>
  );
};

DefaultModal.storyName = "Default";

export const RoutedModal = () => {
  const names = ["Engage", "Replicator"];
  const EditModal: FC = () => {
    const { appName } = useParams();
    return <h1>Edit {appName}</h1>;
  };
  const NameListItems: FC = () => {
    const { modal } = useRoutedModal(EditModal, { path: "/apps/:appName/edit" });
    const { pathname } = useLocation();
    const nameListItems = names.map((name) => (
      <p key={name}>
        {name} <Link to={`/apps/${name}/edit`}>Edit</Link>
      </p>
    ));

    return (
      <>
        {nameListItems}
        <p>Current Path: {pathname}</p>
        {modal}
      </>
    );
  };

  return (
    <Routes>
      <Route index element={<NameListItems />} />
      <Route path="/apps" element={<NameListItems />}>
        <Route path=":appName/edit" element={<NameListItems />} />
      </Route>
    </Routes>
  );
};

RoutedModal.storyName = "Routed Modal";

export default {
  title: "Modal",
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
