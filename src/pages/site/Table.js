import React, {useState} from "react";
import styled from "styled-components/macro";

import {
    Card as MuiCard,
    CardHeader,
    IconButton,
    Chip as MuiChip,
    Paper as MuiPaper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Stack, Divider,
} from "@mui/material";
import {spacing} from "@mui/system";
import {Add, Delete, Edit, Menu as MenuIcon} from "@mui/icons-material";
import {coverSize} from "../../utils/PtUtils";
import {Eye, EyeOff} from "react-feather";

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) =>
          props.theme.palette[props.color ? props.color : "primary"].light};
  color: ${(props) => props.theme.palette.common.white};
`;

const Paper = styled(MuiPaper)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)});
`;
const getStatus = (status) => {
    if (status == 1) {
        return (<Chip label="可用" color="success"/>)
    } else if (status == 2) {
        return (<Chip label="异常" color="error"/>)
    } else {
        return (<Chip label="未知" color="warning"/>)
    }
}
const DashboardTable = ({data, onAddClick, onUpdateClick, onDeleteClick}) => {
    const [hideData, setHideData] = useState(false)
    const hideOnClick = () => {
        setHideData(!hideData)
    }
    return (
        <Card mb={6}>
            <CardHeader
                action={
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem/>} spacing={1}>
                        <IconButton color="info" aria-label="添加" size="large" onClick={onAddClick}>
                            <Add/>
                        </IconButton>
                        <IconButton color="info" aria-label="隐藏" size="large" onClick={hideOnClick}>
                            {hideData ? <EyeOff/> : <Eye/>}
                        </IconButton>
                    </Stack>
                }
                title="全部站点"
            />
            <Paper>
                <TableWrapper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>站点</TableCell>
                                <TableCell>用户</TableCell>
                                <TableCell>分享率</TableCell>
                                <TableCell>上传量</TableCell>
                                <TableCell>下载量</TableCell>
                                <TableCell>状态</TableCell>
                                <TableCell>Web搜索</TableCell>
                                <TableCell>智能下载</TableCell>
                                <TableCell>操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.site_name}
                                    </TableCell>
                                    <TableCell>{hideData ? "****" : row.username}</TableCell>
                                    <TableCell>{row.share_rate}</TableCell>
                                    <TableCell>{coverSize(row.upload_size)}</TableCell>
                                    <TableCell>{coverSize(row.download_size)}</TableCell>
                                    <TableCell>{getStatus(row.status)}</TableCell>
                                    <TableCell>{row.web_search === 1 ? '是' : '否'}</TableCell>
                                    <TableCell>{row.smart_download === 1 ? '是' : '否'}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="info"
                                            aria-label="编辑"
                                            size="small"
                                            onClick={() => onUpdateClick(row)}
                                        >
                                            <Edit/>
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            aria-label="删除"
                                            size="small"
                                            onClick={() => onDeleteClick(row)}
                                        >
                                            <Delete/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableWrapper>
            </Paper>
        </Card>
    )
};

export default DashboardTable;
