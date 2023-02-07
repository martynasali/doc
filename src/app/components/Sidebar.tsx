import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material/SvgIcon/SvgIcon";
import React from "react";
import { SidebarDataType } from "../../App"

export default function SideBar(SidebarData:SidebarDataType):JSX.Element
{
    return (
        <div className="Sidebar">
            <SideItems sideitems={SidebarData.SideItems}/>
            <SideList listitems={SidebarData.ListItems}/>
        </div>
    );
}
function SideItems(props: {sideitems:SidebarDataType['SideItems'] }):JSX.Element
{
    return (
        <div className="SideItems">
            {props.sideitems.map(si=><SideItem key={si.text} si={si}/>)}
        </div>
    );
}
function SideItem(si:{si:{text:string, logo:OverridableComponent<SvgIconTypeMap> & { muiName: string } }}):JSX.Element
{
    return (
        <div className="SideItem">
            <si.si.logo className={'SideItemLogo'} fontSize="large" color="action" />
            <p>{si.si.text}</p>
        </div>
    );
}
function SideList(props:{listitems:SidebarDataType['ListItems']}):JSX.Element
{
    return (
        <div className="SideList">
            <ul>
                {props.listitems.map((sli)=>(<SideListItem key={sli.text} {...sli}/>))}
            </ul>
        </div>
    );
}
function SideListItem(sli:{text:string}):JSX.Element
{
    return (
        <li className="SideListItem">
            {sli.text}
        </li>
    );
}