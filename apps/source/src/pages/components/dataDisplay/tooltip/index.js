import React from "react";
import AppPage from "../../../../core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const Tooltip = asyncComponent(() => import('../../../../modules/components/dataDisplay/Tooltip'));
export default AppPage(() => <Tooltip />);
