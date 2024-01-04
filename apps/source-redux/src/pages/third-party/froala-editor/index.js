import React from "react";
import AppPage from "../../../core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const FroalaEditor = asyncComponent(() => import('../../../../src/modules/thirdParty/froalaEditor'),{ssr:false});
export default AppPage(() => <FroalaEditor />);
