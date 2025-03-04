import React from "react";
import styled from "styled-components/macro";
import {Helmet} from "react-helmet-async";

import {Paper, Typography} from "@mui/material";

import MediaPathConfigComponent from "./components/MediaPathConfigComponent";
import {useLocation} from "react-router-dom";


const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

function MediaPath() {
    const location = useLocation();
    let isInit = false;
    if (location.pathname.startsWith('/setup')) {
        isInit = true
    }
    return (<React.Fragment>
        <Wrapper>
            <Helmet title={isInit ? "媒体文件夹设置 - 初始化" : "媒体文件夹设置"}/>

            <Typography component="h1" variant="h4" align="center" gutterBottom>
                媒体文件夹设置
            </Typography>
            <Typography component="h2" variant="body1" align="left">
                设置你存放影视文件的路径后，系统可以帮你对新下载的影视自动整理"刮削"。这个路径，也将作为你提交下载的保存路径，web下载和豆瓣下载都会使用。
            </Typography>

            <MediaPathConfigComponent isInit={isInit}/>
        </Wrapper>
    </React.Fragment>);
}

export default MediaPath;
