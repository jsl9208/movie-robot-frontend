import {
    Button,
    Card,
    CardActions,
    CardContent, FormControl, FormHelperText,
    Grid,
    Link,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "../../../utils/request";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const DownloadPathConfigComponent = ({ruleData, data, setData}) => {
    const [errors, setErrors] = useState({})
    const [tag, setTags] = useState({cate: [], area: []})
    const [downloadPaths, setDownloadPaths] = useState([])
    const handleOnChange = (index, e) => {
        let tmp = [...data];
        let item = {...tmp[index]};
        item[e.target.name] = e.target.value;
        tmp[index] = item;
        setData(tmp);
    };
    const helperText = (i, name) => {
        let key = name + i;
        return errors[key] !== undefined && errors[key]
    };
    const error = (i, name) => {
        let key = name + i;
        return errors[key] !== undefined && errors[key] !== ''
    };
    const handleOnBlur = async (index, e) => {
        if (e.target.name === 'tag_name' || e.target.name === 'score_rule') {
            if (e.target.value === '') {
                let tmpErrors = {...errors}
                tmpErrors[e.target.name + index] = '值不能为空'
                setErrors(tmpErrors)
            } else {
                let tmpErrors = {...errors}
                delete tmpErrors[e.target.name + index]
                setErrors(tmpErrors)
            }
        }
    }
    useEffect(async () => {
        let res = await axios.get('/api/common/douban_tag');
        setTags(res.data)
        let res_path = await axios.get('/api/config/get_media_path');
        setDownloadPaths(res_path.data)
    }, [])
    return (
        <React.Fragment>
            <Card>
                {data.map((item, i) => (
                    <Card mb={6} key={i}>
                        <Typography gutterBottom variant="h5" component="h2">
                            下载保存规则 {i + 1}
                            <Button
                                onClick={() => {
                                    const temp = [...data];
                                    temp.splice(i, 1);
                                    setData(temp);
                                }}
                            >
                                删除
                            </Button>
                        </Typography>
                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item md={4}>
                                    <FormControl m={4} fullWidth>
                                        <Select
                                            name="type"
                                            value={item.type}
                                            onChange={(e) => handleOnChange(i, e)}
                                            MenuProps={MenuProps}
                                        >
                                            <MenuItem value="movie">电影</MenuItem>
                                            <MenuItem value="tv">剧集</MenuItem>
                                        </Select>
                                        <FormHelperText>
                                                <span>
                                                    {helperText(i, 'type') || "当豆瓣影视资源为此类型时"}
                                                </span>
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item md={4}>
                                    <FormControl m={4} fullWidth>
                                        <Select
                                            name="cate"
                                            value={item.cate}
                                            multiple
                                            onChange={(e) => handleOnChange(i, e)}
                                            MenuProps={MenuProps}
                                        >
                                            {tag.cate.map((value, i) => (
                                                <MenuItem key={value} value={value}>{value}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>
                                                <span>
                                                    {helperText(i, 'cate') || "当豆瓣影视类型包含所选分类时"}
                                                </span>
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item md={4}>
                                    <FormControl m={4} fullWidth>
                                        <Select
                                            name="area"
                                            value={item.area}
                                            multiple
                                            onChange={(e) => handleOnChange(i, e)}
                                            MenuProps={MenuProps}
                                        >
                                            {tag.area.map((value, i) => (
                                                <MenuItem key={value} value={value}>{value}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>
                                                <span>
                                                    {helperText(i, 'area') || "当豆瓣影视类型包含所选区域时"}
                                                </span>
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item md={12}>
                                    <FormControl m={4} fullWidth>
                                        <Select
                                            name="download_path"
                                            value={item.download_path}
                                            onChange={(e) => handleOnChange(i, e)}
                                            MenuProps={MenuProps}
                                        >
                                            {downloadPaths.filter(({type}) => {
                                                return item.type === type;
                                            }).map((value, i) => (
                                                <MenuItem key={value.download_path}
                                                          value={value.download_path}>{(value.type === "movie" ? "电影路径：" : "剧集路径：") + value.download_path}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>
                                                <span>
                                                    当符合分类和区域条件时，提交到此下载路径
                                                    <Link target="_blank"
                                                          href="/config/media-path">
                                                        去添加更多路径
                                                    </Link>
                                                </span>
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}
                <CardActions>
                    <Button size="small" color="primary" onClick={() => {
                        setData([...data, {type: "movie", cate: [], area: [], score_rule: 'compress'}]);
                    }}>
                        加一个下载保存规则
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    )
}
export default DownloadPathConfigComponent;