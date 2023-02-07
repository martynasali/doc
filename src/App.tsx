import React from 'react';
import './App.css';
import SideBar from "./app/components/Sidebar";
import HomeIcon from '@mui/icons-material/Home';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material/SvgIcon/SvgIcon";
import Page from "./app/components/Page";

export interface SidebarDataType {
    SideItems: {
        text: string,
        logo: OverridableComponent<SvgIconTypeMap> & { muiName: string }
    }[],
    ListItems:{
        text: string
    }[]
}

interface LangState {id: number, lang: string, selected: boolean};



export interface HeaderDataType{
    lang:string[],
    notifications:{
        count:number,
        text:string[]
    },
    image:string
}

let HeaderData:HeaderDataType = {
    lang:['LT', 'GB', 'LV'],
    notifications:{
        count:1,
        text:['you have a new message']
    },
    image:'https://mui.com/static/images/avatar/3.jpg'
}

let SidebarData:SidebarDataType = {
    SideItems:
    [
        {text: 'Upload', logo: NoteAddIcon},
        {text: 'Documents', logo: HomeIcon}
    ],
    ListItems:
    [
        {text: 'inbox'},
        {text: 'Sent'},
        {text: 'Drafts'}
    ]
}

function App() {
  return (
      <>
        <Container/>
      </>
  );
}


function Container() {
  return (
      <div className="Page">
        <SideBar {...SidebarData}/>
        <Page {...HeaderData}/>
      </div>
  );
}


// sidebar
//    side items
//      side item
//      side item
//    side list
//      side list item
//      side list item
//      side list item




// page
//  sidebar
//    side items
//      side item
//      side item
//    side list
//      side list item
//      side list item
//      side list item
//  main page container
//    main page block


export default App;
