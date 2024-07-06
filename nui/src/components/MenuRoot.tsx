import React from "react";
import {Box} from "@mui/material";
import {PlayersPage} from "./PlayersPage/PlayersPage";
import {IFramePage} from "./IFramePage/IFramePage";
import {txAdminMenuPage, usePageValue} from "../state/page.state";
import {useHudListenersService} from "../hooks/useHudListenersService";
import {HelpTooltip} from "./misc/HelpTooltip";
import {useServerCtxValue} from "../state/server.state";
import {MenuRootContent} from "@nui/src/components/MenuRootContent";
import ReportsPage from "@nui/src/components/ReportsPage/ReportsPage";


const MenuRoot: React.FC = () => {
    // We need to mount this here so we can get access to
    // the translation context
    useHudListenersService();
    const curPage = usePageValue();
    const serverCtx = useServerCtxValue()

    return (
        <>
            <Box
                style={{
                    width: "fit-content",
                    alignSelf: serverCtx.alignRight ? "flex-end" : "auto",
                }}
            >
                <HelpTooltip>
                    <MenuRootContent/>
                </HelpTooltip>
            </Box>
            <PlayersPage visible={curPage === txAdminMenuPage.Players}/>
            <IFramePage visible={curPage === txAdminMenuPage.IFrame}/>
            <ReportsPage visible={curPage == txAdminMenuPage.Reports}/>
        </>
    );
};

export default MenuRoot;
