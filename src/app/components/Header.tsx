import React, {useState} from 'react';
import {HeaderDataType} from "../../App";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Stack from '@mui/material/Stack';


export default function Header(HeaderData:HeaderDataType) {
    return (
        <div className='header'>
            <Stack
                className="headerstack"
                spacing={2}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{ color: 'action.active' }}
            >
            <LanguageMenu lang={HeaderData.lang}/>
            <Notifications {...HeaderData.notifications}/>
            <AvatarWithMenu image={HeaderData.image}/>
            </Stack>
        </div>
    );
}


function Notifications(info:{count: number, text: string[]}){
    return(
        <Badge color="error" badgeContent={info.count}>
            <NotificationsIcon fontSize="large"/>
        </Badge>
    )
}

function AvatarWithMenu(image:{image:string}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Avatar
                alt="Cindy Baker"
                src={image.image}
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                >
            </Avatar>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

function LanguageMenu(lang:{lang:string[]}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [language, setLanguage] = useState('EN')
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {

        setAnchorEl(event.currentTarget);
    };
    const handleClose = (l:string) => {
        if(typeof l === 'string')
        {
            setLanguage(l)
        }
        setAnchorEl(null);
    };

    return (
        <div>
            <p
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="secondary"
            >
                <b>{language}</b>
            </p>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                {lang.lang.map((l)=>(<MenuItem key={l} onClick={()=>(handleClose(l ? l : 'EN'))}>{l}</MenuItem>))}
            </Menu>
        </div>
    );
}