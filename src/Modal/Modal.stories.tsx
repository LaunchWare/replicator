import { Routes, Route, useLocation } from "react-router";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, useParams } from "react-router-dom";

import { useModal } from ".";
import mdx from "./Modal.mdx";
import { useRoutedModal } from "./hooks/useRoutedModal";

import "./css/modal.css";

export function DefaultModal() {
  const { modal, setVisibility } = useModal(() => <p>I am in a modal</p>);
  return (
    <>
      <button type="button" onClick={() => setVisibility(true)}>
        Do Something
      </button>
      {modal}
    </>
  );
}

DefaultModal.storyName = "Default";

function EditModal() {
  const { appName } = useParams();
  return <h1>Edit {appName}</h1>;
}

function NameListItems({ names }: { names: string[] }) {
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
}
export function RoutedModal() {
  const names = ["Engage", "Replicator"];

  return (
    <Routes>
      <Route index element={<NameListItems names={names} />} />
      <Route path="/apps" element={<NameListItems names={names} />}>
        <Route path=":appName/edit" element={<NameListItems names={names} />} />
      </Route>
    </Routes>
  );
}

RoutedModal.storyName = "Routed Modal";

export default {
  title: "Modal",
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
