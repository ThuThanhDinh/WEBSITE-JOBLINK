import * as React from 'react';
import blog1 from "../img/blog1.png";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions} from '@mui/material';
import { NavLink} from "react-router-dom";
const data = [
    {
        id: 1,
        img: blog1,
        title: "Backend là gì: Tổng hợp các kiến thức cần biết về Backend",
        general: "Giao diện bài viết mà bạn đang xem được tạo ra bởi frontend, và việc bạn truy cập được vào bài viết này là nhờ...",
    },
]
function cardBlog(data) {
    return (
        <>
            <CardActionArea>
                <NavLink
                    to="/detail"
                >
                    <CardMedia
                        component="img"
                        height="140"
                        image={data.img}
                        alt={data.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h1" component="div">
                        </Typography>
                        {data.title}
                        <Typography variant="body2" color="text.secondary">
                            {data.general}
                        </Typography>
                    </CardContent>
                </NavLink>
            </CardActionArea>
            <CardActions>
                <NavLink
                    to="/detail"
                    className="text-primary text-uppercase"
                >
                    Bắt đầu đọc
                </NavLink>
            </CardActions>
        </>
    )
}
export default function general() {
    const dataMap = data.map((data) => {
        return (
            <Card className='m-3' sx={{ maxWidth: 345 }} key={data.id}>
                {cardBlog(data)}
            </Card>
        );
    })
    return (
        <>
            <div className='row m-4'>
                <h1 className='m-3'>Mới nhất</h1>
                {dataMap}
            </div>
        </>
    );
}
